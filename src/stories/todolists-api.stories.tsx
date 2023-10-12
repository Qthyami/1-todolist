import React, {ChangeEvent, useEffect, useState} from 'react'

import {todolistsAPI} from "../api/todolists-api";




export default {
    title: 'API'
}

export const GetTodolists = () => {
    const [state, setState] = useState<any>(null);
    useEffect(() => {

        todolistsAPI.getTodolists()
            .then((res)=>{

                setState(res.data);
            })

    }, [])
    return <div>{JSON.stringify(state)}</div>
}
export const CreateTodolist = () => {
    const [state, setState] = useState<any>(null);
    useEffect(() => {
        todolistsAPI.createTodolist("HI")

            .then((res)=>{

                setState(res.data);
                }

            )
    }, [])

    return <div>{JSON.stringify(state)}</div>
}



export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null);
    useEffect(() => {
        const todolistId= "5647ecd3-cba1-4d67-ac10-a732198ecd54";
        todolistsAPI.deleteTodolist(todolistId)
            .then((res)=>{

                    setState(res.data)
                }

            )
    }, [])

    return <div>{JSON.stringify(state)}</div>
}
export const UpdateTodolistTitle = () => {
    const [state, setState] = useState<any>(null);
    useEffect(() => {
        const todolistId="e10dfc6c-8683-4861-8b91-46e72362ecfb";
        const title="ARIGATO";
        todolistsAPI.updateTodolist(todolistId,title)

            .then((res)=>{

                    setState(res.data)
                }

            )
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
    todolistsAPI.getTasks(todolistId)
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
export const CreateTask=()=>{

    const [state, setState] = useState<string>("null");
   const [taskTitle, setTaskTitle]=useState("");
   const [todolistId, setTodolistId]=useState("");
    const onChangeInputToDo = (e:ChangeEvent<HTMLInputElement>)=>{
        setTodolistId(e.currentTarget.value)
    }
    const onChangeTaskTitle= (e:ChangeEvent<HTMLInputElement>)=>{
        setTaskTitle(e.currentTarget.value)
    }


       const createTask=()=> {
           todolistsAPI.createTask(todolistId, taskTitle)

               .then((res) => {
                       setState(res.data);
                   }
               )
       }

    return <div>{JSON.stringify(state)}
        <div><input placeholder={"todolistId"} value={todolistId}  onChange={onChangeInputToDo}/></div>
        <div><input placeholder={"taskTitle"} value={taskTitle} onChange={onChangeTaskTitle}/></div>
        <button onClick={createTask}>create task</button>
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
        todolistsAPI.deleteTask(todolistId, taskId)
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

export const UpdateTask=()=>{
    const [state, setState] = useState<any>(null);
    const [todolistId, setTodolistId] = useState<string>("");
    const [taskId , setTaskId] = useState<string>("");
    const [title, setTitle]=useState<string>("");
    const [description,setDescription]=useState<string>("")
    const [status, setStatus]=useState<number>(0);
    console.log(status)

    const [priority, setPriority]=useState<number>(0);
    const [startDate, setStartDate]=useState<string>("");
    const [deadline, setDeadline]=useState<string>("")


    // const model = {
    //     title:"JA NIGGER CHERNYI",
    //     description: "", // Может быть пустым, если вы не хотите изменять описание
    //     completed: false, // Может быть false, если вы не хотите изменять статус выполнения
    //     status: 0, // Может быть 0 или другим значением, если вы не хотите изменять статус
    //     priority: 0, // Может быть 0 или другим значением, если вы не хотите изменять приоритет
    //     startDate: new Date(), // Может быть текущей датой или другой датой, если вы не хотите изменять дату начала
    //     deadline: new Date(), // Может быть текущей датой или другой датой, если вы не хотите изменять дедлайн
    // };
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
       todolistsAPI.updateTask(todolistId,taskId,{
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