
import { action } from '@storybook/addon-actions';
import {AddItemForm} from "../AddItemForm";
import {Task} from "../task";
import React from "react";
export default  {
    title:'Task Component',
    component: Task
}

const changeTaskStatusCallback = action("Status Changed")
const changeTaskTitleCallback = action("Title Changed")
const removeTaskCallback = action("Task removed")


export const TaskBaseExample = ()=>{
    return <>
        <Task
            t={{id:"1", isDone:true, title:"CSS"}}
            changeTaskStatus={changeTaskStatusCallback}
            changeTaskTitle={changeTaskTitleCallback}
            removeTask={removeTaskCallback}
            todolistId={"todolistId1"}


        />

                <Task
                t={{id:"2", isDone:false, title:"JS"}}
                changeTaskStatus={changeTaskStatusCallback}
                changeTaskTitle={changeTaskTitleCallback}
                removeTask={removeTaskCallback}
                todolistId={"todolistId2"}


                />
    </>
}