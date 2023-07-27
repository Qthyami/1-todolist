import React, {ChangeEvent} from 'react';
import {FilterValuesType} from "./App";
import {AddItemForm} from "./addItemForm";
import {EditableSpan} from "./editableSpan";
import {Button, Checkbox, IconButton} from "@mui/material";
import {Delete} from "@mui/icons-material";

type  TodoListPropsType = {
    todolistId:string;
    id:string;
    title: string;
    tasks: Array<TaskType>;
    removeTask: (id: string, todolistId:string)=> void;
    changeFilter:(value:FilterValuesType, todolistId: string)=>void;
    addTask:(todolistId:string, title: string)=>void;
    changeTaskStatus: (todolistId: string,taskId:string, isDone: boolean) => void;
    changeTaskTitle:(id:string, newTitle:string, todolistId: string )=> void;
    changeTodolistTitle:(id:string, newTitle:string)=>void;
    removeTodolist:(todolistId: string)=>void
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
export type TasksStateType={
    [id:string]:TaskType[]
}
const TodoList = (props:TodoListPropsType) => {

    const addTask=(title:string)=>{


        props.addTask( props.id, title)

    }


    const onAllClickHandler=()=>{props.changeFilter("all", props.id)}
    const onActiveClickHandler=()=>{props.changeFilter("active", props.id)}
    const onCompletedClickHandler=()=>{props.changeFilter("completed", props.id)}

const changeTodolistTitle=(newTitle:string)=>{
        props.changeTodolistTitle(props.id, newTitle)
    console.log(newTitle)
}


    function removeTodolist() {
        props.removeTodolist(props.todolistId)
    }

    return (
        <div className="todoList">
            <h3> <EditableSpan title={props.title} onChange={changeTodolistTitle}/>
                <IconButton onClick={removeTodolist}><Delete/></IconButton>
            </h3>

            <AddItemForm addItem={addTask}
            />
            <ul>
                {props.tasks.map((t) => {

                        const onClickHandler = () => {
                            props.removeTask(t.id, props.todolistId)
                        }
                        const onChangeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
                            props.changeTaskStatus (props.todolistId , t.id , e.currentTarget.checked);

                        }
                    const onChangeTitleHandler = (newValue:string) => {
                       // props.changeTaskStatus (props.todolistId , t.id , e.currentTarget.checked);
                    props.changeTaskTitle(t.id, newValue, props.id )

                    }

                        return (
                            <li key={t.id} className={t.isDone ? "is-done" : ""}>
                                <Checkbox

                                       checked={t.isDone}
                                       onChange={onChangeStatusHandler}

                                />

                                <EditableSpan title={t.title}

                                              onChange={onChangeTitleHandler}/>
                                <IconButton onClick={onClickHandler}><Delete/></IconButton>
                            </li>
                        )

                    }
                )
                }


            </ul>
            <div>
                <Button variant ={props.filter === "all" ? 'contained': 'text'} onClick={onAllClickHandler}>All</Button>
                <Button color={"primary"} variant={props.filter === "active" ? 'contained': 'text'} onClick={onActiveClickHandler}>Active</Button>
                <Button color={"secondary"} variant={props.filter === "completed" ? 'contained': 'text'} onClick={onCompletedClickHandler}>Completed</Button>
            </div>
        </div>
    );
};


export default TodoList;
