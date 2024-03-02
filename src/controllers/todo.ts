import express, { Request, Response, NextFunction } from 'express';
const CustomError = require('../errors/CustomError');

const pool = require('../helpers/postgre');
const redis = require('../helpers/redis');
const File = require('../helpers/fileUpload');

exports.getTodoList = async function (req: Request, res: Response, next: NextFunction) {
    const getRedisData = await redis.RedisClient.get('currentUser');
    const parseUser = JSON.parse(getRedisData);

    const user_id = parseUser.user_id;

    try {
        const todoSqlQuery = `
            SELECT
                td.todo_id,
                td.title,
                td.content,
                td.image,
                td.attachment,
                td.is_make
            FROM
                todo td
            WHERE
                td.user_id = $1
        `;
        
        const todoResults = await pool.query(todoSqlQuery, [user_id]);
        const todos = todoResults.rows;

        return res.status(200).json(todos);
    }catch (err){
        next(err)
    }
}

exports.postTodoList = async function (req: Request, res: Response, next: NextFunction) {
    const getRedisData = await redis.RedisClient.get('currentUser');
    const parseUser = JSON.parse(getRedisData);
    const {user_id, username} = parseUser;

    const {title, todo} = req.body;
    const files = req.files
    
    try {
        if (!title || title == '') {
            throw new CustomError(403, "title alanını belirtmelisiniz.");
        }
        if (!todo || todo == '') {
            throw new CustomError(403, "todo alanını belirtmelisiniz.");
        }

        const insertQuery = `
            INSERT INTO 
                todo (title, content, user_id) 
            VALUES
                ($1, $2, $3)
            RETURNING
                *
        `;

        const values = [title, todo, user_id];
        const insertResponse = await pool.query(insertQuery, values);
        const insertResult = insertResponse.rows;

        if(insertResult.length > 0 && files?.length !== 0 ){
            const todo_id = insertResult[0].todo_id;

            type todoFileProps = {
                url?: string, 
                path: string, 
                mimeType: string
            }
    
            const todoFile: todoFileProps[] = await File.uploadFiles(files, 'members/' + username  + '/' +  todo_id + '/' );
            
            const getImage = todoFile.length > 0 && todoFile.filter(file => file.mimeType.includes('image'))[0];
            const getAttachment =  todoFile.length > 0 && todoFile.filter(file => !file.mimeType.includes('image'))[0];

            const updateQuery = `
                UPDATE
                    todo
                SET
                    image = $1, 
                    attachment = $2
                WHERE
                    todo_id = $3
            `;

            const values = [
                getImage, 
                getAttachment,
                todo_id
            ]; 

            await pool.query(updateQuery, values)
        }
 
        return res.status(201).json({ sucess: true })
    }catch (err) {
        next(err)
    }
}

exports.putTodoList = async function (req: Request, res: Response, next: NextFunction) { 
    const getRedisData = await redis.RedisClient.get('currentUser');
    const parseUser = JSON.parse(getRedisData);

    const {user_id, username} = parseUser;
    const todo_id =  req.params.todo_id;

    const {title, todo, oldFiles} = req.body;

    interface deletedImageProps {
        url: string;
        pathName: string;
        mimeType: string;
    }

    const files: any[] = Array.isArray(req.files) ? req.files : [req.files];

    const deletedFiles: deletedImageProps[] = JSON.parse(oldFiles);

    try {
        if (!title || title == '') {
            throw new CustomError(403, "title alanını belirtmelisiniz.");
        }
        if (!todo || todo == '') {
            throw new CustomError(403, "todo alanını belirtmelisiniz.");
        }

        const imageFiles = files.length > 0 && files.filter(file => file.mimetype.startsWith('image'));
        const otherFiles = files.length > 0 && files.filter(file => !file.mimetype.startsWith('image'));

        const imageOldFiles = deletedFiles.length > 0 && deletedFiles.filter(file => file.mimeType.startsWith('image'))[0];
        const otherOldFiles = deletedFiles.length > 0 &&  deletedFiles.filter(file => !file.mimeType.startsWith('image'))[0];

        const oldTodoQuery = `
            SELECT
                todo_id,
                image,
                attachment
            FROM
                todo
            WHERE
                todo_id = $1
            AND
                user_id = $2
        `
        const oldTodoResponse = await pool.query(oldTodoQuery, [todo_id, user_id])
        const oldTodo = oldTodoResponse.rows[0];

        if(!oldTodo){
            throw new CustomError(204, "bulunamadı");
        }
       
        let getImage;
        if(Object.keys(imageFiles).length > 0){
            getImage =  await File.uploadFiles(imageFiles, 'members/' + username  + '/' +  oldTodo?.todo_id + '/', oldTodo?.image?.pathName);
        }
        else if (imageOldFiles){
            getImage = [];
            await File.deletedFiles(imageOldFiles.pathName)
        }
        else{
            getImage = [oldTodo?.image]
        }   

        let getAttachment
        if(Object.keys(otherFiles).length > 0){
            getAttachment = await File.uploadFiles(otherFiles, 'members/' + username  + '/' +  oldTodo?.todo_id + '/', oldTodo?.attachment?.pathName);
        }
        else if (otherOldFiles){
            getAttachment = [];
            await File.deletedFiles(otherOldFiles.pathName)
        }
        else{
            getAttachment = [oldTodo?.attachment]
        }

        const updateQuery = `
            UPDATE
                todo
            SET
                title = $1, 
                content = $2, 
                image = $3, 
                attachment = $4
            WHERE
                todo_id = $5
        `;

        const values = [
            title, 
            todo, 
            getImage[0], 
            getAttachment[0], 
            todo_id
        ]; 

        await pool.query(updateQuery, values);

        return res.status(200).json({ sucess: true })

    }catch (err){
        next(err)
    }
}

