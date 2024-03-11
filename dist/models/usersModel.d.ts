/// <reference types="mongoose/types/aggregate" />
/// <reference types="mongoose/types/callback" />
/// <reference types="mongoose/types/collection" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/expressions" />
/// <reference types="mongoose/types/helpers" />
/// <reference types="mongoose/types/middlewares" />
/// <reference types="mongoose/types/indexes" />
/// <reference types="mongoose/types/models" />
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/populate" />
/// <reference types="mongoose/types/query" />
/// <reference types="mongoose/types/schemaoptions" />
/// <reference types="mongoose/types/schematypes" />
/// <reference types="mongoose/types/session" />
/// <reference types="mongoose/types/types" />
/// <reference types="mongoose/types/utility" />
/// <reference types="mongoose/types/validation" />
/// <reference types="mongoose/types/virtuals" />
/// <reference types="mongoose/types/inferschematype" />
import mongoose, { Document } from "mongoose";
import joi from 'joi';
export interface IUsers extends Document {
    FullName: string;
    email: string;
    password: string;
    picture: string;
    description: string;
    isAdmin: boolean;
}
declare const Users: mongoose.Model<IUsers, {}, {}, {}, mongoose.Document<unknown, {}, IUsers> & IUsers & {
    _id: mongoose.Types.ObjectId;
}, any>;
export declare const joiUserValidation: (userEntry: IUsers) => joi.ValidationResult<any>;
export default Users;
export declare const getUsers: () => mongoose.Query<(mongoose.Document<unknown, {}, IUsers> & IUsers & {
    _id: mongoose.Types.ObjectId;
})[], mongoose.Document<unknown, {}, IUsers> & IUsers & {
    _id: mongoose.Types.ObjectId;
}, {}, IUsers, "find">;
export declare const getUsersByEmail: (email: string) => mongoose.Query<(mongoose.Document<unknown, {}, IUsers> & IUsers & {
    _id: mongoose.Types.ObjectId;
}) | null, mongoose.Document<unknown, {}, IUsers> & IUsers & {
    _id: mongoose.Types.ObjectId;
}, {}, IUsers, "findOne">;
export declare const getUsersById: (id: String) => mongoose.Query<(mongoose.Document<unknown, {}, IUsers> & IUsers & {
    _id: mongoose.Types.ObjectId;
}) | null, mongoose.Document<unknown, {}, IUsers> & IUsers & {
    _id: mongoose.Types.ObjectId;
}, {}, IUsers, "findOne">;
export declare const createUser: (values: Record<string, any>) => Promise<(<T = IUsers & {
    _id: mongoose.Types.ObjectId;
}>(options?: mongoose.ToObjectOptions<mongoose.Document<unknown, {}, unknown> & {
    _id: mongoose.Types.ObjectId;
}> | undefined) => mongoose.Require_id<T>) & (<T_1 = any>(options?: mongoose.ToObjectOptions<mongoose.Document<unknown, {}, unknown> & {
    _id: mongoose.Types.ObjectId;
}> | undefined) => mongoose.Require_id<T_1>)>;
export declare const deleteUserById: (id: string) => mongoose.Query<(mongoose.Document<unknown, {}, IUsers> & IUsers & {
    _id: mongoose.Types.ObjectId;
}) | null, mongoose.Document<unknown, {}, IUsers> & IUsers & {
    _id: mongoose.Types.ObjectId;
}, {}, IUsers, "findOne">;
export declare const updateUserById: (id: string, values: Record<string, any>) => mongoose.Query<(mongoose.Document<unknown, {}, IUsers> & IUsers & {
    _id: mongoose.Types.ObjectId;
}) | null, mongoose.Document<unknown, {}, IUsers> & IUsers & {
    _id: mongoose.Types.ObjectId;
}, {}, IUsers, "findOneAndUpdate">;
