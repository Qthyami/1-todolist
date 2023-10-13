
import React, {ChangeEvent, useEffect, useState} from 'react'

import {todolistAPI} from "../api/todolist-api";

export default {
    title: 'API'
}
const config={withCredentials: true}
export const GetTodolists = () => {
    const [state, setState] = useState<any>(null);
    useEffect(() => {

        const promise = todolistAPI.getTodolists()
        promise.then((res) => {
                setState(res.data);
            });
    }, []);

    return <div>{JSON.stringify(state)}</div>;
}
export const CreateTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const title="WATAMAN"
        todolistAPI.createTodolist(title)
            .then((res)=>{
                setState(res.data)
            })
    }, [])

    return <div>{JSON.stringify(state)}</div>
}
export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null)
    const todoId="f35b03ec-3dcf-4d69-8a0b-1822edee61b5"
    useEffect(() => {
       todolistAPI.deleteTodolist(todoId)
            .then((res)=>{
                setState(res.data)
            })
    }, [])


    return <div>{JSON.stringify(state)}</div>
}
export const UpdateTodolistTitle = () => {
    const [state, setState] = useState<any>(null)
    const todoId="ad5d13c9-1777-4c69-ba2b-5874aa978d62";
   const  title="WATAHECK"
    useEffect(() => {
        todolistAPI.updateTodolist(todoId,title)
            .then((res)=>{
                setState(res.data)
            })
    }, [])


    return <div>{JSON.stringify(state)}</div>
}

export const GetTasks = () => {
    const [state, setState] = useState<any>(null);
    const [todolistId, setTodolistId]=useState("");

    const onChangeInputToDo = (e:ChangeEvent<HTMLInputElement>)=>{
        setTodolistId(e.currentTarget.value)
    }


    const getTask = ()=>{
        todolistAPI.getTasks(todolistId)
            .then((res)=>{

                setState(res.data)
            })
    }



    return <div>{JSON.stringify(state)}
        <div>
            <div><input placeholder={"todolistId"} value={todolistId}  onChange={onChangeInputToDo}/></div>

            <button onClick={getTask}>get task</button>
        </div>

    </div>
}




export const CreateTask = () => {
    const [state, setState] = useState<any>(null);
    const [todolistId, setTodolistId] = useState<string>("");
    const [taskId , setTaskId] = useState<string>("");
    const [taskTitle, setTaskTitle]=useState("");
    const [priority, setPriority]=useState<number>(0);
    const [startDate, setStartDate]=useState<string>("");
    const [deadline, setDeadline]=useState<string>("")
    const onChangeInputToDo = (e:ChangeEvent<HTMLInputElement>)=>{
        setTodolistId(e.currentTarget.value)
    }
    const onChangeTaskTitle= (e:ChangeEvent<HTMLInputElement>)=>{
        setTaskTitle(e.currentTarget.value)
    }


    const createTaskHandler=()=> {
        todolistAPI.createTask(todolistId, taskTitle)

            .then((res) => {
                    setState(JSON.stringify(res.data));
                }
            )
    }


    return <div>{JSON.stringify(state)}
        <div><input placeholder={"todolistId"} value={todolistId}  onChange={onChangeInputToDo}/></div>
        <div><input placeholder={"taskTitle"} value={taskTitle} onChange={onChangeTaskTitle}/></div>
        <button onClick={createTaskHandler}>create task</button>
    </div>
}
export const DeleteTask = () => {
    const [state, setState] = useState<any>(null);
    const [todolistId, setTodolistId] = useState<string>("");
    const [taskId , setTaskId] = useState<string>("");

    const onChangeInputToDo =(e:ChangeEvent<HTMLInputElement>)=>{
        setTodolistId(e.currentTarget.value)
    }
    const onChangeTaskId=(e:ChangeEvent<HTMLInputElement>)=>{
        setTaskId(e.currentTarget.value)
    }

    const deleteTask = ()=> {
        todolistAPI.deleteTask(todolistId, taskId)
            .then((res) => {

                setState(res.data)
            })
    };



    return <div>{JSON.stringify(state)}
        <div><input placeholder={"todolistId"} value={todolistId}  onChange={onChangeInputToDo}/></div>
        <div><input placeholder={"taskId"} value={taskId} onChange={onChangeTaskId}/></div>
        <button onClick={deleteTask}>delete task</button>
    </div>
}
export const UpdateTask = () => {
    const [state, setState] = useState<any>(null);
    const [todolistId, setTodolistId] = useState<string>("");
    const [taskId , setTaskId] = useState<string>("");
    const [title, setTitle]=useState<string>("");
    const [description,setDescription]=useState<string>("")
    const [status, setStatus]=useState<number>(0);


    const [priority, setPriority]=useState<number>(0);
    const [startDate, setStartDate]=useState<string>("");
    const [deadline, setDeadline]=useState<string>("")
    const onChangeInputToDo =(e:ChangeEvent<HTMLInputElement>)=>{
        setTodolistId(e.currentTarget.value)
    }
    const onChangeTaskId=(e:ChangeEvent<HTMLInputElement>)=>{
        setTaskId(e.currentTarget.value)
    }

    const onChangeTaskTitle=(e:ChangeEvent<HTMLInputElement>)=> {
        setTitle(e.currentTarget.value)
    }
    const onChangeDescription=(e:ChangeEvent<HTMLInputElement>)=> {
        setDescription(e.currentTarget.value)
    }
    const onChangeStatus=(e:ChangeEvent<HTMLInputElement>)=> {
        setStatus(+(e.currentTarget.value))
    }
    const onChangePriority=(e:ChangeEvent<HTMLInputElement>)=> {
        setPriority(Number(e.currentTarget.value))
    }

    const updateTask=() => {
        todolistAPI.updateTask(todolistId,taskId,{
            title:title,
            description:description,
            status:status,
            priority:priority,
            startDate:"",
            deadline:"",


        } )

            .then((res)=>{

                    setState(res.data);
                }

            )

    }


    return  <div>{JSON.stringify(state)}
                <div>
                        <div><input placeholder={"todolistId"} value={todolistId}  onChange={onChangeInputToDo}/></div>
                        <div><input placeholder={"taskId"} value={taskId} onChange={onChangeTaskId}/></div>
                        <div><input placeholder={"Task Title"} value={title} onChange={onChangeTaskTitle}/></div>
                         <div><input placeholder={"Description"} value={description} onChange={onChangeDescription}/></div>
                        <div><input placeholder={"status"} value={status} onChange={onChangeStatus}/></div>
                         <div><input placeholder={"priority"} value={priority} onChange={onChangePriority}/></div>

                         <button onClick={updateTask}>update task</button>
                     </div>

             </div>
}
