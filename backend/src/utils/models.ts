import mongoose from "mongoose";

export interface Transactions {
    type: string,
    amount: string,
    userId?: string
}

export interface User {
    email: string,
    displayName: string,
    username: String,
    password: String,
    bio: String,
    profilePic: String,
    money: number,
    friends: string[],
    transactions: Transactions[]
}

export const UserModel: mongoose.Model<User> = mongoose.model<User>('User', new mongoose.Schema({
    email: String,
    displayName: String,
    username: String,
    password: String,
    bio: { type: String, default: "Thanks for visiting my profile!" },
    profilePic: { type: String, default: "" },
    money: { type: Number, default: 1000 },
    friends: [String], 
    transactions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Transaction' }]
}));