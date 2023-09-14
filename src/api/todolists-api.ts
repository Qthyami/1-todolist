import axios from "axios";


const  settings = {
    withCredentials:true,
    headers:{
        "API-KEY":"9f3854f9-1c37-4311-8912-72c5f843df71"
    }
}
const instance= axios.create({
    baseURL:"https://social-network.samuraijs.com/api/1.1",
    withCredentials:true,
    headers:{
        "API-KEY":"9f3854f9-1c37-4311-8912-72c5f843df71"
    }
})
export  type TodolistType = {
    id:string,
    title:string,
    addedDate:string,
    order:number
}
export type _CreateTodolistResponseType = {

    resultCode: number,
    messages: Array<string>,
    data: {
        item: TodolistType
    }
}
export type _DeleteTodolistResponseType={
    resultCode: number
    messages: Array<string>,
        data: {}
}
export type _UpdateTodolistResponseType={
    resultCode: number
    messages: Array<string>,
    data: {}
}
export type ResponseType<D>={
    resultCode: number
    messages: Array<string>,
    data: D
}
export type TaskType={
    description: string,
    title: string,
    completed: boolean,
    status: number,
    priority: number,
    startDate: number,
    deadline: number,
    id: string,
    todoListId: string,
    order: number,
    addedDate: string
}
type GetTasksResponse = {
error: string | null,
    totalCount:number,
    items:TaskType[]
}
export const todolistsAPI = {
    getTodolists(){
        return axios.get<Array<TodolistType>>("https://social-network.samuraijs.com/api/1.1/todo-lists", settings)
    },
    createTodolist(title:string){
       return axios.post<ResponseType<{item:TodolistType}>>("https://social-network.samuraijs.com/api/1.1/todo-lists",{title:title},settings)
    },
    deleteTodolist(id:string){
       return axios.delete<ResponseType<{}>>(`https://social-network.samuraijs.com/api/1.1/todo-lists/${id}`,settings)
    },
    updateTodolist(id:string,title:string){
       return axios.put<ResponseType<{}>>(`https://social-network.samuraijs.com/api/1.1/todo-lists/${id}`,{title:title},settings)
    },
    getTasks(todolistId:string){
        const promise = axios.get<GetTasksResponse>(`https://social-network.samuraijs.com/api/1.1/todo-lists/${todolistId}/tasks`, settings);
        return promise
    }

}
