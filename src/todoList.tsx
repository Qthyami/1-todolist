import React, {useCallback} from 'react';
import {FilterValuesType} from "./App";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import {Button, IconButton} from "@mui/material";
import {Delete} from "@mui/icons-material";
import {Task} from "./task";

type  TodoListPropsType = {
    todolistId:string;
    id:string;
    title: string;
    tasks: Array<TaskType>;

    changeFilter:(value:FilterValuesType, todolistId: string)=>void;
    addTask:(todolistId:string, title: string)=>void;
    changeTaskStatus: (todolistId: string,taskId:string, isDone: boolean) => void;
    removeTask: (id: string, todolistId:string)=> void;
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
const TodoList =React.memo( (props:TodoListPropsType) => {
console.log("TODOLISST")

    const addTask=useCallback((title:string)=>{


        props.addTask( props.id, title)

    },[ props.addTask,props.id])


    const onAllClickHandler=useCallback(()=>{props.changeFilter("all", props.id)},[props.changeFilter, props.id])
    const onActiveClickHandler=useCallback(()=>{props.changeFilter("active", props.id)},[props.changeFilter, props.id])
    const onCompletedClickHandler=useCallback(()=>{props.changeFilter("completed", props.id)},[props.changeFilter, props.id])

const changeTodolistTitle=useCallback((newTitle:string)=>{
        props.changeTodolistTitle(props.id, newTitle)

},[props.changeTodolistTitle,props.id])


    function removeTodolist() {
        props.removeTodolist(props.todolistId)
    }

    let tasksForTodolist = props.tasks;
    if (props.filter === "active") {
        tasksForTodolist = props.tasks.filter((t) => !t.isDone);
    }
    if (props.filter === "completed") {
        tasksForTodolist = props.tasks.filter((t) => t.isDone);
    }

    return (
        <div className="todoList">
            <h3> <EditableSpan title={props.title} onChange={changeTodolistTitle}/>
                <IconButton onClick={removeTodolist}><Delete/></IconButton>
            </h3>

            <AddItemForm addItem={addTask}
            />
            <ul>
                {tasksForTodolist.map((t) =>
                    <Task
                        t={t}
                        changeTaskStatus={props.changeTaskStatus}
                        changeTaskTitle={props.changeTaskTitle}
                        removeTask={props.removeTask}
                        todolistId={props.todolistId}
                        key={t.id}

                    />


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
})

export default TodoList;
