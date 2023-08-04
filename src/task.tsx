import React, {ChangeEvent, useCallback} from "react";
import {Checkbox, IconButton} from "@mui/material";
import {EditableSpan} from "./editableSpan";
import {Delete} from "@mui/icons-material";
import {TaskType} from "./todoList";

type TaskPropsType = {
    changeTaskStatus: (todolistId: string, taskId: string, isDone: boolean) => void;
    removeTask: (id: string, todolistId: string) => void;
    changeTaskTitle: (id: string, newTitle: string, todolistId: string) => void;
    t: TaskType
    todolistId: string
}
export const Task = React.memo((props: TaskPropsType) => {
    const onClickHandler = () => {
        props.removeTask(props.t.id, props.todolistId)
    }
    const onChangeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
        props.changeTaskStatus(props.todolistId, props.t.id, e.currentTarget.checked);

    }
    const onChangeTitleHandler = useCallback((newValue: string) => {
        // props.changeTaskStatus (props.todolistId , t.id , e.currentTarget.checked);
        props.changeTaskTitle(props.t.id, newValue, props.todolistId)

    },[props.t.id,  props.changeTaskTitle,  props.todolistId ])

    return (
        <li key={props.t.id} className={props.t.isDone ? "is-done" : ""}>
            <Checkbox

                checked={props.t.isDone}
                onChange={onChangeStatusHandler}

            />

            <EditableSpan title={props.t.title}

                          onChange={onChangeTitleHandler}/>
            <IconButton onClick={onClickHandler}><Delete/></IconButton>
        </li>
    )
})