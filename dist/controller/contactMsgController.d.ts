import express from 'express';
export declare const createContactMsg: (req: express.Request, res: express.Response) => Promise<express.Response<any, Record<string, any>> | undefined>;
export declare const fetchAllContactMsg: (req: express.Request, res: express.Response) => Promise<void>;
export declare const patchContactMsgById: (req: express.Request, res: express.Response) => Promise<express.Response<any, Record<string, any>> | undefined>;
