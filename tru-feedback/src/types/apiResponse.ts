import { Message } from "@/Models/User";


export interface apiResponse {
    success:boolean;
    message:string;
    isAcceptingMessages?:boolean;
    messages?:Array<Message>

}