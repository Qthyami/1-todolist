

import {
    AddTodolistActionType,
    RemoveTodolistActionType,

    SetTodolistsActionType
} from './todolists-reducer';
import { TasksStateType } from '../App';
import {Dispatch} from "redux";
import {TaskStatuses, TaskType, todolistAPI} from "../api/todolist-api";
import {AppRootStateType} from "./store";

export type RemoveTaskActionType = {
    type: 'REMOVE-TASK',
    todolistId: string
    taskId: string
}







type ActionsType = RemoveTaskActionType | AddTaskActionType
    | ChangeTaskStatusActionType
    | ChangeTaskTitleActionType
    | AddTodolistActionType
    | RemoveTodolistActionType
| SetTodolistsActionType | SetTasksActionType

const initialState: TasksStateType = {}

export const tasksReducer = (state: TasksStateType = initialState, action: ActionsType): TasksStateType => {
    switch (action.type) {
        case "SET-TASKS":{
            const stateCopy={...state}
            stateCopy[action.todolistId]=action.tasks
            return stateCopy
        }


        case "SET-TODOLISTS":{
            const stateCopy={...state}
            action.todolists.forEach((tl)=>{
                stateCopy[tl.id]=[]
            })
            return stateCopy
        }

        case 'REMOVE-TASK': {
            // const stateCopy = {...state}
            // const tasks = stateCopy[action.todolistId];
            // const newTasks = tasks.filter(t => t.id != action.taskId);
            // stateCopy[action.todolistId] = newTasks;
            // return stateCopy;
            return {...state,[action.todolistId]:[...state[action.todolistId].filter(t=>t.id!==action.taskId)] }

        }
        case 'ADD-TASK': {
            return {
                ...state,
                [action.task.todoListId]: [action.task, ...state[action.task.todoListId]]
            };
        }
        case 'CHANGE-TASK-STATUS': {
            return {
                ...state,
                [action.todolistId]:[...state[action.todolistId].map(t=>t.id===action.taskId? {...t, status:action.status}: t) ]
            }
            // let todolistTasks = state[action.todolistId];
            // let newTasksArray = todolistTasks
            //     .map(t => t.id === action.taskId ? {...t, isDone: action.isDone} : t);
            //
            // state[action.todolistId] = newTasksArray;
            // return ({...state});

        }
        case 'CHANGE-TASK-TITLE': {
            // let todolistTasks = state[action.todolistId];
            // // найдём нужную таску:
            // let newTasksArray = todolistTasks
            //     .map(t => t.id === action.taskId ? {...t, title: action.title} : t);
            //
            // state[action.todolistId] = newTasksArray;
            // return ({...state});
            return {...state,[action.todolistId]:[...state[action.todolistId].map(t=>t.id===action.taskId? {...t, title:action.title}: t)]}
        }
        case 'ADD-TODOLIST': {
            return {
                ...state,
                [action.todolist.id]: []
            }
        }
        case 'REMOVE-TODOLIST': {
            const copyState = {...state};
            delete copyState[action.id];
            return copyState;
        }
        default:
            return state;
    }
}

export const removeTaskAC = (taskId: string, todolistId: string): RemoveTaskActionType => {
    return {type: 'REMOVE-TASK', taskId: taskId, todolistId: todolistId}
}
export type AddTaskActionType= ReturnType<typeof addTaskAC>
export const addTaskAC = (task:TaskType)=> {
    return {type: 'ADD-TASK', task} as const
}
export type ChangeTaskStatusActionType= ReturnType<typeof changeTaskStatusAC>
export const changeTaskStatusAC = (taskId: string, status: TaskStatuses, todolistId: string)=> {
    return {type: 'CHANGE-TASK-STATUS', status, todolistId, taskId} as const
}

export type ChangeTaskTitleActionType = ReturnType<typeof changeTaskTitleAC>
export const changeTaskTitleAC = (taskId: string, title: string, todolistId: string)=> {
    return {type: 'CHANGE-TASK-TITLE', title, todolistId, taskId} as const
}

export type SetTasksActionType=ReturnType<typeof setTasksAC>
export const setTasksAC=(todolistId: string, tasks:TaskType[])=>{
    return { type: 'SET-TASKS', todolistId,tasks} as const
}





//TCs
export const fetchTasksTC = (todolistId: string) => (dispatch: Dispatch<ActionsType>) => {
    todolistAPI.getTasks(todolistId)
        .then((res) => {

            const tasks = res.data.items;
            dispatch(setTasksAC(todolistId, tasks));
        });
}
export const removeTaskTC=(taskId:string, todolistId:string)=>(dispatch: Dispatch<ActionsType>)=>{
    todolistAPI.deleteTask(todolistId,taskId)
        .then(()=>{
            dispatch(removeTaskAC(taskId,todolistId))
        })
}
export const addTaskTC=(todolistId:string, title:string)=>(dispatch: Dispatch<ActionsType>)=>{
    todolistAPI.createTask(todolistId,title)
        .then((res)=>{
            dispatch(addTaskAC(res.data.data.item))
        })
}

export const changeTaskTitleTC=(taskId: string, title:string, todolistId: string)=>(dispatch: Dispatch<ActionsType>, getState:()=>AppRootStateType)=>{
const state = getState();

const task=state.tasks[todolistId].find (t=>t.id===taskId)
    if (!task){
        throw new Error("task not found in the state")

    }
const updatedTaskModel={
    title:title,
    description:task.description,
    status:task.status,
    priority:task.priority,
    startDate: task.startDate,
    deadline: task.deadline

}
    todolistAPI.updateTask(todolistId,taskId,updatedTaskModel)
        .then((res)=>{
            dispatch(changeTaskTitleAC(taskId, res.data.data.item.title, todolistId))
        })
}
export const changeTaskStatusTC=(taskId: string, status:TaskStatuses, todolistId: string)=>(dispatch: Dispatch<ActionsType>, getState:()=>AppRootStateType)=>{
    const state = getState();

    const task=state.tasks[todolistId].find (t=>t.id===taskId)
    if (!task){
        throw new Error("task not found in the state")

    }
    const updatedTaskModel={
        title:task.title,
        description:task.description,
        status:status,
        priority:task.priority,
        startDate: task.startDate,
        deadline: task.deadline

    }
    todolistAPI.updateTask(todolistId,taskId,updatedTaskModel)
        .then((res)=>{
            dispatch(changeTaskStatusAC(taskId, res.data.data.item.status, todolistId))
        })
}