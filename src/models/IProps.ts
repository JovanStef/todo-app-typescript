import { Observable } from "rxjs";
import { ITodo } from "./ITodo";

export interface IProps{
todoList?:ITodo[],
todo?:ITodo,
todoFromChild?:any,
// subscription?:any
}

export interface IPropsTodo{
    numOfTodos?:number,
    todo?:ITodo,
    }