import express from 'express';
export declare const createLike: (req: express.Request, res: express.Response) => Promise<void>;
export declare const fetchAllLike: (req: express.Request, res: express.Response) => Promise<void>;
export declare const fetchLikeByUserIdByComment: (req: express.Request, res: express.Response) => Promise<express.Response<any, Record<string, any>> | undefined>;
export declare const deleteLikeByUserIdAndCommentId: (req: express.Request, res: express.Response) => Promise<express.Response<any, Record<string, any>> | undefined>;
