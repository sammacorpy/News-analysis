import { User } from './user';

export interface News{
    id: string,
    headline: string,
    content: string,
    imageURL?: string;
    tags?: Array<string>;
    region?:boolean;
    author?:string;
    timestamp?:any;
    likes?:Object;
    views?:number;
    userinfo?:User;
    url?:string;
}