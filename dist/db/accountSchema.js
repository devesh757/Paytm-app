import mongoose, { model, Schema } from "mongoose";
const accountSchema = new Schema({
    balance: { type: Number, required: true, default: 0 },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
});
const Account = model('Account', accountSchema);
export default Account;
//# sourceMappingURL=accountSchema.js.map