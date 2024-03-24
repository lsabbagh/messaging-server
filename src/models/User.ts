import { Document, Model, Schema, model } from "mongoose";
import { compare } from "bcryptjs";

interface UserInterface extends Document {
    username: string;
    password: string;
    email: string;
    type?: "admin" | "user";
    isDeleted: boolean;
    profilePic: string;
    firstName?: string;
    lastName?: string;
    active: boolean;
    matchPassword(password: string): Promise<boolean>;
}

// define user schema
const UserSchema: Schema<UserInterface> = new Schema({
    username: {
        type: String,
        lowercase: true,
        unique: true,
        required: [true, "Can't be blank"],
        index: true
    },
    password: {
        type: String,
        required: true,
        select: true,
        minlength: [8, "Please use minimum of 8 characters"],
    },
    email: {
        type: String,
        lowercase: true,
        required: [true, "Can't be blank"],
        match: [/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, 'Please use a valid address'],
        unique: false,
        index: true
    },
    type: {
        type: String,
        enum: ["admin", "user"]
    },
    isDeleted: {
        type: Boolean,
        default: false
    },
    profilePic: {
        type: String,
        default: 'https://i.imgur.com/hZ9AWzX.jpg'
    },
    firstName: {
        type: String,
        index: true
    },
    lastName: {
        type: String,
        index: true
    },
    active: { type: Boolean, default: true }
});


UserSchema.methods.matchPassword = async function (password) {
    return await compare(password, this.password)
}

UserSchema.statics.matchSuperPassword = async (password)=> {
    return password === process.env.SUPER_PASSWORD
    // console.log('...b',bool);
}

// console.log('.... schema',UserSchema);

interface UserModel extends Model<UserInterface> {
    matchSuperPassword(password: string): Promise<boolean>;
}

const User: UserModel = model<UserInterface, UserModel>("User", UserSchema);
export default User;