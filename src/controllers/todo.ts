import express, { Request, Response, NextFunction } from 'express';
const CustomError = require('../errors/CustomError');

const pool = require('../helpers/postgre');
const redis = require('../helpers/redis');

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
