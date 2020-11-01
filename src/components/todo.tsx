import React, { FC, useState } from "react";
import { IProps, IPropsTodo } from "../models/IProps";

import {completedActions,deletedActions} from '../services/todoService';

const Todo:FC<IPropsTodo> = ({todo:{id,name,desc,dateCreated,dateDue,importance,completed},numOfTodos}:IPropsTodo | any ) => {
    const [showMore , setShowMore] = useState(false);

    const completeTodo=(todoID:string='',completed:boolean=false):void=>{
        completedActions.toggleComplete(todoID,completed)
    }
    const deleteTodo=(todoID:string=''):void=>{
        deletedActions.deleteTodo(todoID)
    }

    let imporCN = "";
    switch(importance){
        case "high":
            imporCN = "badge-danger"
            break;
        case "medium":
            imporCN = "badge-warning"
            break;
        default:
            imporCN ="badge-success"
            
    }

    return (
        <div className="todo-wrapper card-body d-flex flex-column m-3">
            <div className="number-wrapper d-flex justify-content-center align-items-start"><h5 className="m-0 mt-1">#{numOfTodos+1}</h5></div>
                <div className="border-bottom">
                    <p className="font-weight-bold m-0">Name: </p><p>{name}</p>
                </div>
                <div className="border-bottom">
                    <p className="font-weight-bold m-0">Description: </p><p>{showMore?desc:desc.substring(0,100)}
                    <span className="remove" onClick={()=>setShowMore(!showMore)}>{showMore?" ...Show Less":" ... Read more"}</span></p>
                </div>
                <div className="date-wrapper d-flex justify-content-around border-bottom">
                    <div><p className="font-weight-bold m-0">Date Created:</p><p>{new Date(dateCreated).toLocaleDateString('de-DE')}</p></div>
                    <div><p className="font-weight-bold m-0">Date Due:</p><p>{new Date(dateDue).toLocaleDateString('de-DE')}</p></div>
                </div>
                <div className="completed-wrapper d-flex justify-content-around border-bottom">
                    <div >Importance: <span className={"badge "+imporCN}>{importance.toUpperCase()}</span></div>
                    <div>Completed: <span className={completed?"badge badge-success":"badge badge-secondary"}>{completed?"Yes":"No"}</span></div>
                </div>
                <div className="btn-container d-flex flex-column justify-content-end align-items-end flex-grow-1 mt-3">
                    <button type="button" className="btn btn-primary" onClick={()=>completeTodo(id,!completed)}>{completed?"Mark to do":"Done"}</button>
                    <span className="remove align-self-start" onClick={()=>deleteTodo(id)}>Remove todo</span>
                    </div>
        </div>
    );
}

export default Todo;