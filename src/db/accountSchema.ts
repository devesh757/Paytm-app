import mongoose, {model ,Schema,ObjectId, Types} from "mongoose";


interface IAccount {
     balance:number,
     userId:Types.ObjectId;

}

const accountSchema = new Schema<IAccount>({
       balance:{type:Number,required:true,default: 0},
       userId:{type:Schema.Types.ObjectId,ref:'User',required:true}
});

  const Account = model<IAccount>('Account',accountSchema);

export default Account;