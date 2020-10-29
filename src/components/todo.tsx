import React, { FC } from "react";
import { IProps, IPropsTodo } from "../models/IProps";

const Todo:FC<IPropsTodo> = ({todo,numOfTodos}:IPropsTodo | any ) => {
    const {id,name,desc,dateCreated,dateDue,importance,completed} = todo;
    return (
        <div className="todo-wrapper d-flex">
            <h5>#{numOfTodos+1}</h5>
                <div>
                    <p>Name: <br/>{name}</p>
                </div>
                <div>
                    <p>Description: <br/>{desc}</p>
                </div>
                <div className="date-wrapper">
                    <div>Date Created:<br/>{dateCreated}</div>
                    <div>Date Due:<br/>{dateDue}</div>
                </div>
                <div className="completed-wrapper">
                    <div>Importance:<br/>{importance.toUpperCase()}</div>
                    <div>Completed:<br/>{completed?"Yes":"No"}</div>
                </div>
        </div>
    );
}

export default Todo;