import { ITodo } from './../models/ITodo';
import {Observable, Subject} from 'rxjs';

const subject_C = new Subject();
const subject_D = new Subject();
const subject_F = new Subject();




export const loadTodos=(url:string)=>{
    return new Observable((observer:any) => {
        fetch(url)
          .then(response => response.json()) // or text() or blob() etc.
          .then(data => {
            observer.next(data);
            observer.complete();
          })
          .catch(err => observer.error(err));
      });
}

export const completedActions={
    toggleComplete:(id:string,completed:boolean):void=>subject_C.next({id:id,completed:completed}),
    getCompletedTodo:()=>subject_C.asObservable()
}

export const deletedActions={
    deleteTodo:(id:string)=>subject_D.next({id:id}),
    getDeletedTodo:()=>subject_D.asObservable()
}

export const filterActions={
    filterTodo:(opt:string)=>subject_F.next({criteria:opt}),
    getFilterTodo:()=>subject_F.asObservable()
}

   

