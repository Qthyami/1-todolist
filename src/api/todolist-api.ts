import axios, {AxiosResponse} from 'axios'



const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    withCredentials: true,
})
export const todolistAPI = {
    updateTodolist(todolistId: string, title: string) {
       return instance.put<ResponseType<{}>>(
            `todo-lists/${todolistId}`,
            { title: title }
        )

    },
    getTodolists() {
       return instance.get<TodolistType[]>(
            `todo-lists/`
        )
    },
    createTodolist( title: string) {
       return instance.post<ResponseType<{item:TodolistType}>>(
            `todo-lists/`,
            { title: title }

        )
    },
    deleteTodolist(todolistId: string) {
       return instance.delete<ResponseType<{}>>(
            `todo-lists/${todolistId}`
        )

    },
    getTasks(todolistId: string) {
        return instance.get<GetTasksResponse>(`todo-lists/${todolistId}/tasks`);
    },
    deleteTask(todolistId: string, taskId: string) {
        return instance.delete<ResponseType<{}>>(`todo-lists/${todolistId}/tasks/${taskId}`);
    },
    createTask(todolistId: string, title: string) {
        return instance.post<ResponseType<{ item: TaskType }>, AxiosResponse<ResponseType<{ item: TaskType }>>, { title: string }>(`todo-lists/${todolistId}/tasks`, {title});
    },
    updateTask(todolistId: string, taskId: string, model: UpdateTaskModelType) {
        return instance.put<ResponseType<{ item: TaskType }>, AxiosResponse<ResponseType<{ item: TaskType }>>, UpdateTaskModelType>(`todo-lists/${todolistId}/tasks/${taskId}`, model);
    }

}

// type UpdateTodolistResponseType = {
//      data:{},
//     messages:string[],
//     fieldsErrors:string[],
//     resultCode:number
// }
export type TodolistType={
    id: string,
    title: string,
    addedDate: Date,
    order: number
}


// type CreateTodolistResponseType={
//     data:{
//         item:TodolistType
//     },
//     messages:string[],
//     fieldsErrors:string[],
//     resultCode:number
// }
type ResponseType<T>={
    data:T,
    messages:string[],
    fieldsErrors:string[],
    resultCode:number
}


export enum TaskStatuses {
    New = 0,
    InProgress = 1,
    Completed = 2,
    Draft = 3
}

export enum TaskPriorities {
    Low = 0,
    Middle = 1,
    Hi = 2,
    Urgently = 3,
    Later = 4
}

export type TaskType = {
    description: string
    title: string
    status: TaskStatuses
    priority: TaskPriorities
    startDate: string
    deadline: string
    id: string
    todoListId: string
    order: number
    addedDate: string
}
export type UpdateTaskModelType = {
    title: string
    description: string
    status: TaskStatuses
    priority: TaskPriorities
    startDate: string
    deadline: string
}
type GetTasksResponse = {
    error: string | null
    totalCount: number
    items: TaskType[]
}