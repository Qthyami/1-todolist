

import {todolistAPI, TodolistType} from "../api/todolist-api";
import {Dispatch} from "redux";
 export type FilterValuesType = 'all' | 'active' | 'completed';
 export type TodolistDomainType=TodolistType & {
     filter:FilterValuesType
 }
export type RemoveTodolistActionType = {
    type: 'REMOVE-TODOLIST',
    id: string
}

export type ChangeTodolistTitleActionType = {
    type: 'CHANGE-TODOLIST-TITLE',
    id: string
    title: string
}
export type ChangeTodolistFilterActionType = {
    type: 'CHANGE-TODOLIST-FILTER',
    id: string
    filter: FilterValuesType
}

type ActionsType = RemoveTodolistActionType | AddTodolistActionType
    | ChangeTodolistTitleActionType
    | ChangeTodolistFilterActionType | SetTodolistsActionType

const initialState: Array<TodolistDomainType> = []

export const todolistsReducer = (state: Array<TodolistDomainType> = initialState, action: ActionsType): Array<TodolistDomainType> => {
    switch (action.type) {

        case 'REMOVE-TODOLIST': {
            return state.filter(tl => tl.id !== action.id)
        }
        case 'ADD-TODOLIST': {

            return [ {...action.todolist, filter:'all'},...state]
        }
        case 'CHANGE-TODOLIST-TITLE': {
            // const todolist = state.find(tl => tl.id === action.id);
            // if (todolist) {
            //     // если нашёлся - изменим ему заголовок
            //     todolist.title = action.title;
            // }
            // return [...state]
            return state.map(tl=>tl.id===action.id? {...tl, title: action.title} : tl)
        }
        case 'CHANGE-TODOLIST-FILTER': {
            const todolist = state.find(tl => tl.id === action.id);
            if (todolist) {

                todolist.filter = action.filter;
            }
            return [...state]
        }
        case "SET-TODOLISTS": {
            return action.todolists.map((tl)=>({...tl, filter:"all"}))
        }
        default:
            return state;
    }
}

export const removeTodolistAC = (todolistId: string): RemoveTodolistActionType => {
    return {type: 'REMOVE-TODOLIST', id: todolistId}
}
export type AddTodolistActionType=ReturnType<typeof addTodolistAC>
export const addTodolistAC = (todolist:TodolistType)  => {
    return {type: 'ADD-TODOLIST', todolist} as const
}
export const changeTodolistTitleAC = (id: string, title: string): ChangeTodolistTitleActionType => {
    return {type: 'CHANGE-TODOLIST-TITLE', id: id, title: title}
}
export const changeTodolistFilterAC = (id: string, filter: FilterValuesType): ChangeTodolistFilterActionType => {
    return {type: 'CHANGE-TODOLIST-FILTER', id: id, filter: filter}
}

export type SetTodolistsActionType=ReturnType<typeof setTodolistsAC>
export const setTodolistsAC =(todolists:Array<TodolistType>)=>{
return {type:'SET-TODOLISTS',todolists}as const
}

//thunks
export const fetchTodolistsTC=()=> {
    return (dispatch: Dispatch) => {
        todolistAPI.getTodolists()
            .then((res) => {
                dispatch(setTodolistsAC(res.data))

            })
    }
}
export const addTodolistsTC=(title:string)=> {
    return (dispatch: Dispatch) => {
        todolistAPI.createTodolist(title)
            .then((res) => {
                dispatch(addTodolistAC(res.data.data.item))

            })
    }
}
export const removeTodolistsTC=(todolistId:string)=> {
    return (dispatch: Dispatch) => {
        todolistAPI.deleteTodolist(todolistId)
            .then(() => {
                dispatch(removeTodolistAC(todolistId))

            })
    }
}
export const changeTodolistTitleTC=(todolistId:string,title: string)=> {
    return (dispatch: Dispatch) => {
        todolistAPI.updateTodolist(todolistId,title)
            .then(() => {
                dispatch(changeTodolistTitleAC(todolistId,title))

            })
    }
}

