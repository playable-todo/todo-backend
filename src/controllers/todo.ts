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

        type todoFileProps = {
            url?: string, 
            path: string, 
            mimeType: string
        }

        const todoFile: todoFileProps[] = await File.uploadFiles(files, 'members/' + username  + '/' +  title + '/' );
        
        const getImage = todoFile.length > 0 && todoFile.filter(file => file.mimeType.includes('image'))[0];
        const getAttachment =  todoFile.length > 0 && todoFile.filter(file => !file.mimeType.includes('image'))[0];

        const insertQuery = `
            INSERT INTO 
                todo (title, content, user_id, image, attachment) 
            VALUES
                ($1, $2, $3, $4, $5)
        `;

        const values = [title, todo, user_id, getImage, getAttachment];
        await pool.query(insertQuery, values);
 
        return res.status(201).json({ sucess: true })
    }catch (err) {
        next(err)
    }
}
