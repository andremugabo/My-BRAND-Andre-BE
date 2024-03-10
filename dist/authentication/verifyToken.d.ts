import express from 'express';
import { IUsers } from '../models/usersModel';
import { Request, Response, NextFunction } from 'express';
export declare const verifyToken: (req: Request, res: Response, next: NextFunction) => express.Response<any, Record<string, any>> | undefined;
export declare const getUser: (token: string) => Promise<IUsers | null>;
