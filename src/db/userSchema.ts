import mongoose,{model,Schema} from "mongoose"

interface IUser {
firstname:string,
lastname:string,
username:string,
password:string
}


const userSchema= new Schema<IUser>({
    username:{type:String,required:true,unique:true},
    password:{type:String,required:true},
    firstname:{type:String,required:true},
    lastname:{type:String,required:true}
})

const User = model<IUser>('User',userSchema);

export default User;