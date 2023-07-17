import {TasksStateType, TodolistsType} from "../todoList";
import {v1} from "uuid";
import {FilterValuesType} from "../App";
import {addTodolistAcType, removeTodolistAcType} from "./todolists-reducer"


type ActionType = removeTaskActionType | addTaskActionType| changeTaskStatusActionType | changeTaskTitleActionType |
addTodolistAcType | removeTodolistAcType




export const tasksReducer=(state:TasksStateType ,action:ActionType): TasksStateType=>{
    switch(action.type){
        case "REMOVE-TASK":{
            return {...state,
                [action.payload.todolistId]: [...state[action.payload.todolistId].filter(el=>el.id!==action.payload.id)]};
        }
        case "ADD-TASK":{
            let newTask = { id: v1(), title: action.payload.title, isDone: false };
            return {...state,
            [action.payload.todolistId]:[...state[action.payload.todolistId], newTask]
            };
        }
        case 'CHANGE-TASK-STATUS': {
            const updatedTasks=state[action.payload.todolistId].map(el=>el.id===action.payload.taskId? {...el, isDone:action.payload.isDone} : el);
            return {...state, [action.payload.todolistId]:updatedTasks}
        }
        case 'CHANGE-TASK-TITLE' : {
            const updatedTasks = state[action.payload.todolistId].map(el=>el.id=== action.payload.id? {...el, title: action.payload.newTitle} : el);
            return {...state, [action.payload.todolistId]:updatedTasks}

        }
        case 'ADD-TODOLIST':{


return {...state, [action.payload.todolistId]:[]}
        }
        case "REMOVE-TODOLIST" :{

             const stateCopy={...state}
            delete  stateCopy[action.payload.id]
            return stateCopy
            //return state.filter(el=>el.id!===action.payload.id)
        }

        default :
            throw new Error("I dont understand this action type")
    }
}
type removeTaskActionType= ReturnType<typeof removeTaskAC >
export const removeTaskAC = ( todolistId:string, id: string)=>{
    return {type: 'REMOVE-TASK',
           payload: {

               todolistId,
               id,
           }
        }as const

}
type addTaskActionType= ReturnType<typeof addTaskAC >
export const addTaskAC = (todolistId:string, title: string)=>{
    return {type: 'ADD-TASK',
            payload:{
                todolistId,
                title
            }

    } as const
}
type changeTaskStatusActionType= ReturnType<typeof changeTaskStatusAC>
export const changeTaskStatusAC = (todolistId: string,taskId:string, isDone: boolean)=>{
    return {type: 'CHANGE-TASK-STATUS',
            payload:{
                todolistId,
                taskId,
                isDone
            }

    } as const
}
type changeTaskTitleActionType = ReturnType<typeof changeTaskTitleAC >
export const changeTaskTitleAC = (id:string, newTitle:string, todolistId: string )=>{
    return {type: 'CHANGE-TASK-TITLE',
        payload:{
            id,
            newTitle,
            todolistId
        }

    } as const
}
