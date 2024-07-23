interface IUser {
    username:string;
    email:string;
    password:string;
    chatHistory?:Array<IChat>;

}
interface IChat {
    type:string;
    message:string
}
export type { IUser,IChat}