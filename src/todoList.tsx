import React, {ChangeEvent, FC, useState, KeyboardEvent} from 'react';
import {FilterValuesType} from "./App";

type  TodoListPropsType = {
    todolistId:string
    id:string;
    title: string;
    tasks: Array<TaskType>;
    removeTask: (id: string,todolistId:string)=> void;
    changeFilter:(value:FilterValuesType, todolistId: string)=>void;
    addTask:(todolistId:string, title:string )=>void;
    changeTaskStatus: (todolistId:string , taskId:string, isDone:boolean) => void;
    filter: FilterValuesType
}
export type TodolistsType = {
    id: string;
    title: string;
    filter: FilterValuesType;

};
export type TaskType={
    id:string;
    title: string;
    isDone: boolean;
}
export type TasksType={
    [id:string]:TaskType[]
}
const TodoList = (props:TodoListPropsType) => {
const [newTaskTitle, setNewTaskTitle]=useState("")
    const [error, setError]= useState<string | null>( null)

const onChangeHandler =(e: ChangeEvent<HTMLInputElement>)=>{
setNewTaskTitle(e.currentTarget.value)
}
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null);
        if (e.charCode === 13) {
            if (newTaskTitle.trim() !== "") {
                props.addTask(props.todolistId , newTaskTitle.trim());
                setNewTaskTitle("");
            } else {
                setError("Title is required");
            }
        }
    }
const onAllClickHandler=()=>{props.changeFilter("all", props.id)}
const onActiveClickHandler=()=>{props.changeFilter("active", props.id)}
const onCompletedClickHandler=()=>{props.changeFilter("completed", props.id)}

const addTask = ()=>{
    if (newTaskTitle.trim()!==""){
        props.addTask(props.todolistId , newTaskTitle.trim());
        setNewTaskTitle("")
    }
   else {
       setError("Title is required")
    }
}


    return (
        <div className="todoList">
            <h3>{props.title}</h3>
            <div>
                <input value ={newTaskTitle}
                       onChange={onChangeHandler}
                        onKeyPress={onKeyPressHandler}
                       className={error ? "error" : ""}

                />
                <button onClick={addTask}>+</button>
                {error &&<div className={"error-message"}>ERROR</div>}

            </div>
            <ul>
                {props.tasks.map((t) => {

                        const onClickHandler = () => {
                            props.removeTask(t.id, props.todolistId)
                        }
                        const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                            props.changeTaskStatus (props.todolistId , t.id , e.currentTarget.checked);

                        }

                        return (
                            <li key={t.id} className={t.isDone ? "is-done" : ""}>
                                <input type="checkbox"
                                       checked={t.isDone}
                                       onChange={onChangeHandler}

                                />
                                <span>{t.title}</span>
                                <button onClick={onClickHandler}>X</button>
                            </li>
                        )

                    }
                )
                }


            </ul>
            <div>
                <button className={props.filter === "all" ? 'active-filter': ''} onClick={onAllClickHandler}>All</button>
                <button className={props.filter === "active" ? 'active-filter': ''} onClick={onActiveClickHandler}>Active</button>
                <button className={props.filter === "completed" ? 'active-filter': ''} onClick={onCompletedClickHandler}>Completed</button>
            </div>
        </div>
    );
};
export default TodoList;