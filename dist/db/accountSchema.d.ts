import mongoose, { ObjectId } from "mongoose";
interface IAccount {
    balance?: number;
    userId?: ObjectId;
}
declare const Account: mongoose.Model<IAccount, {}, {}, {}, mongoose.Document<unknown, {}, IAccount, {}, mongoose.DefaultSchemaOptions> & IAccount & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
} & {
    id: string;
}, any, IAccount>;
export default Account;
//# sourceMappingURL=accountSchema.d.ts.map