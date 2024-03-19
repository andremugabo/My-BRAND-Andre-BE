import express from 'express';
export declare const createBlog: (req: express.Request, res: express.Response) => Promise<express.Response<any, Record<string, any>> | undefined>;
export declare const fetchBlog: (req: express.Request, res: express.Response) => Promise<void>;
export declare const fetchBlogById: (req: express.Request, res: express.Response) => Promise<void>;
export declare const patchBlogById: (req: express.Request, res: express.Response) => Promise<express.Response<any, Record<string, any>> | undefined>;
export declare const deleteBlog: (req: express.Request, res: express.Response) => Promise<express.Response<any, Record<string, any>> | undefined>;
