import { Request, Response, NextFunction } from 'express';

require('dotenv').config();

const redis = require('../helpers/redis');
const pool = require('../helpers/postgre');
const CustomError = require('../errors/CustomError');
const bcrypt = require("bcrypt");

exports.getMember = async function (req: Request, res: Response, next: NextFunction) {
    const getRedisData = await redis.RedisClient.get('currentUser')
    const currentUser = JSON.parse(getRedisData);

    try {
        if (!currentUser) {
            throw new CustomError(403, "Client authentication failed", 'invalid_client');
        }
        const email = currentUser.username;

        if (!email || email == '') {
            throw new CustomError(403, "Client authentication failed", 'invalid_client');
        }

        const sqlQuery = `
            SELECT 
                u.id,
                u.fullname,
                u.email
            FROM 
                users u 
            WHERE
                u.email = $1
            `;

        const data = await pool.query(sqlQuery, [email]); 
        const user = data.rows[0];

        if (!user) {
            throw new CustomError(401, "The user not found", 'access_denied');
        }

        res.status(200).json(user);

    } catch (error) {
        next(error);
    }
}

exports.postMember =  async function(req: Request, res: Response, next: NextFunction) {
    const {fullname, email, password} = req.body;

    try {
        if (!fullname || fullname == '') {
            throw new CustomError(400, "Fullname alanını belirtmelisiniz", "value_error");
        }
        if (!email || email == '') {
            throw new CustomError(400, "Email alanını belirtmelisiniz", "value_error");
        }
        if (!password || password == '') {
            throw new CustomError(400, "Email alanını belirtmelisiniz", "value_error");
        }

        const oldDataQuery = `
            SELECT 
                email
            FROM
                users
            WHERE
                email = $1
        `;

        const statusOldData = await pool.query(oldDataQuery, [email]);
        const responseOldData = statusOldData.rows[0];
        
        if(responseOldData?.email){
            throw new CustomError(409, "Email adresi kullanılmakta", 'duplicate_email');
        }

        if (!password || password == '') {
            throw new CustomError(400, "password alanını belirtmelisiniz", "value_error");
        }

        const passwordHash = await bcrypt.hashSync(password, 10);

        const insertUserQuery = `
            INSERT INTO
                users
            (fullname, email, password)
                VALUES
            ($1, $2, $3)
        `;
       
        await pool.query(insertUserQuery, [fullname, email, passwordHash])

        return res.status(200).json({'success': 'true'});
    }catch (err){
        console.log(err)
        next(err);
    }
}
