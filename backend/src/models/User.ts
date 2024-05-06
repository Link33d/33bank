import { StringAsNumber } from "fastify/types/utils";
import mongoose, { Document, ObjectId, Types } from "mongoose";

export interface Transactions {
    type: string,
    amount: string,
    userId?: string
}

export interface Sessions {
    _id: Types.ObjectId,
    location: string,
    createdAt: string,
    activated: boolean
}

export interface User extends Document {
    email: string,
    displayName: string,
    username: String,
    password: String,
    bio: String,
    profilePic: String,
    money: number,
    pixKeys: String,
    transactions: Transactions[],
    sessions: Sessions[]
}

export const UserModel: mongoose.Model<User> = mongoose.model<User>('User', new mongoose.Schema({
    email: { type: String, required: true },
    displayName: { type: String, required: true },
    username: { type: String, required: true },
    password: { type: String, required: true },
    bio: { type: String, default: "Thanks for visiting my profile!" },
    profilePic: { type: String, default: "" },
    money: { type: Number, default: 1000 },
    pixKeys: [{ type: String }], 
    transactions: [{ 
        type: { type: Number, required: true },
        createdAt: { type: Date, default: Date.now },
        amount: { type: Number, required: true },
        userId: { type: String, required: false },
    }],
    sessions: [{ 
        _id: { type: mongoose.Schema.Types.ObjectId, default: mongoose.Types.ObjectId }, // Definindo id próprio para cada sessão
        location: { type: String, required: true },
        createdAt: { type: Date, default: Date.now },
        activated: { type: Boolean, default: true }
    }]
}));