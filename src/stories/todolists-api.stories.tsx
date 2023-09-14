import React, {useEffect, useState} from 'react'

import {todolistsAPI} from "../api/todolists-api";



export default {
    title: 'API'
}
// export const  settings = {
//     withCredentials:true,
//     headers:{
//         "API-KEY":"9f3854f9-1c37-4311-8912-72c5f843df71"
//     }
// }
export const GetTodolists = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {

        todolistsAPI.getTodolists()
            .then((res)=>{

                setState(res.data)
            })

    }, [])
    return <div>{JSON.stringify(state)}</div>
}
export const CreateTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        todolistsAPI.createTodolist("HI")

            .then((res)=>{

                setState(res.data)
                }

            )
    }, [])

    return <div>{JSON.stringify(state)}</div>
}
export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId= "5647ecd3-cba1-4d67-ac10-a732198ecd54"
        todolistsAPI.deleteTodolist(todolistId)
            .then((res)=>{

                    setState(res.data)
                }

            )
    }, [])

    return <div>{JSON.stringify(state)}</div>
}
export const UpdateTodolistTitle = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId="9a8f736e-338b-4ac4-a2da-4f3c379250c1";
        const title="BIG MOM";
        todolistsAPI.updateTodolist(todolistId,title)

            .then((res)=>{

                    setState(res.data)
                }

            )
    }, [])

    return <div>{JSON.stringify(state)}</div>
}

export const GetTasks = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
const todolistId = "e10dfc6c-8683-4861-8b91-46e72362ecfb";
        todolistsAPI.getTasks(todolistId)
            .then((res)=>{

                setState(res.data)
            })

    }, [])
    return <div>{JSON.stringify(state)}</div>
}
