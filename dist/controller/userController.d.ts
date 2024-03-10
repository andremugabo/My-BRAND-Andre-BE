import express from 'express';
export declare const createUser: (req: express.Request, res: express.Response) => Promise<express.Response<any, Record<string, any>> | undefined>;
export declare const login: (req: express.Request, res: express.Response) => Promise<express.Response<any, Record<string, any>> | undefined>;
export declare const fetchUsers: (req: express.Request, res: express.Response) => Promise<void>;
export declare const fetchUserById: (req: express.Request, res: express.Response) => Promise<void>;
export declare const patchUserById: (req: express.Request, res: express.Response) => Promise<express.Response<any, Record<string, any>> | undefined>;
export declare const deleteUserById: (req: express.Request, res: express.Response) => Promise<express.Response<any, Record<string, any>> | undefined>;
