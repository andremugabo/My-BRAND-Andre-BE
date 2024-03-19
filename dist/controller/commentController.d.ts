import express from 'express';
export declare const createComment: (req: express.Request, res: express.Response) => Promise<express.Response<any, Record<string, any>> | undefined>;
export declare const fetchAllComments: (req: express.Request, res: express.Response) => Promise<void>;
export declare const fetchCommentByBlog: (req: express.Request, res: express.Response) => Promise<void>;
export declare const patchCommentByCommentById: (req: express.Request, res: express.Response) => Promise<express.Response<any, Record<string, any>>>;
