import axios from "axios";



const  settings = {
    withCredentials:true,
    // headers:{
    //     "API-KEY":"9f3854f9-1c37-4311-8912-72c5f843df71"
    // }
}
const instance= axios.create({
    baseURL:"https://social-network.samuraijs.com/api/1.1/",
    ...settings

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
export type ResponseType<D={}>={ //типо по умолчанию {} поэтому можем каждый раз не указывать пусто массив
    resultCode: number
    messages: Array<string>,
    "fieldsErrors": [],
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
type UpdateTaskModelType = {
    title: string
    description: string
    status: number
    priority: number
    startDate: string
    deadline: string
}
type GetTasksResponse = {
error: string | null,
    items:TaskType[],
    totalCount:number,

}
export const todolistsAPI = {
    getTodolists(){
        return instance.get<Array<TodolistType>>("todo-lists")
    },
    createTodolist(title:string){
       return instance.post<ResponseType<{item:TodolistType}>>("todo-lists",{title:title})
    },
    deleteTodolist(id:string){
       return instance.delete<ResponseType>(`todo-lists/${id}`)
    },
    updateTodolist(id:string,title:string){
       return instance.put<ResponseType>(`todo-lists/${id}`,{title:title})
    },
    getTasks(todolistId:string){
        return instance.get<GetTasksResponse>(`todo-lists/${todolistId}/tasks`, settings);
    },
    deleteTask(todolistId:string,taskId:string){
        return instance.delete<ResponseType>(`todo-lists/${todolistId}/tasks/${taskId}`)
    },
    createTask(todolistId:string, taskTitle:string){
        return instance.post(`/todo-lists/${todolistId}/tasks`,{title:taskTitle})
    },
    updateTask(todolistId:string, taskId:string, model:UpdateTaskModelType){
        return instance.put(`/todo-lists/${todolistId}/tasks/${taskId}`,{model})
    }

}
