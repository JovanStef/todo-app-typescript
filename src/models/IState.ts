import {ITodo} from './ITodo';

export interface IState{
    todoList:ITodo[],
    error:boolean,
    loading:boolean,
}