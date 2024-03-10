import express from 'express';
export declare const createCategory: (req: express.Request, res: express.Response) => Promise<express.Response<any, Record<string, any>> | undefined>;
export declare const fetchAllCategory: (req: express.Request, res: express.Response) => Promise<void>;
export declare const deleteCategory: (req: express.Request, res: express.Response) => Promise<express.Response<any, Record<string, any>> | undefined>;
