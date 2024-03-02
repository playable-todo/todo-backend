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

        if(insertResult.length > 0){
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
