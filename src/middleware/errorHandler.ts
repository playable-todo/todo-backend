import { NextFunction, Request, Response } from 'express';

const errorHandler = (err: any, req: Response, res: Response, next: NextFunction) => {
    
    if(err.type && err.message){
        res.status(err.statusCode).json({ 'error': err.type, 'error_description': err.message })
    }
    else if(!err.type && err.message){
        res.status(err.statusCode).json({ 'error' : { message: err.message } })
    }
    else{
        res.status(err.statusCode).json({ 'error' : { message: err.statusCode } });
    }
    
}
 
module.exports = errorHandler;  