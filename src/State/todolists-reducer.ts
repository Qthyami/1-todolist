import {TodolistsType} from "../todoList";
import {v1} from "uuid";
import {FilterValuesType} from "../App";


type ActionType=
    RemoveTodolistActionType |
    AddTodolistActionType |
    ChangeTodolistTitleActionType |
    ChangeTodolistFilterActionType;


export type RemoveTodolistActionType={
    type:'REMOVE-TODOLIST',
    id:string
}
export type AddTodolistActionType={
    type:'ADD-TODOLIST',
    title:string
}
export type ChangeTodolistTitleActionType={
    type:'CHANGE-TODOLIST-TITLE',
    id:string,
    title:string
}
export type ChangeTodolistFilterActionType={
    type:"CHANGE-TODOLIST-FILTER",
    id:string,
    filter:FilterValuesType
}

export const todolistsReducer=(state:Array<TodolistsType> ,action:ActionType): Array<TodolistsType>=>{
switch(action.type){
    case 'REMOVE-TODOLIST':{
return (state.filter(tl=>tl.id!==action.id))
    }

    case 'ADD-TODOLIST':{
        return (
            [...state, {
                id:v1(),
                title:action.title,
                filter:"all"
            }]
        )
        }
    case  "CHANGE-TODOLIST-TITLE" : {

        return [
            ...state.map(tl => tl.id === action.id ? { ...tl, title: action.title } : tl)
        ];
    }
    case  "CHANGE-TODOLIST-FILTER" : {

        return [
            ...state.map(tl => tl.id === action.id ? { ...tl, filter: action.filter } : tl)
        ];
    }

    default :
        throw new Error("I dont understand this action type")
}
}
export const RemoveTodolistAC = (todolistId: string):RemoveTodolistActionType=>{
    return {type: 'REMOVE-TODOLIST', id:todolistId}

}
export const AddTodolistAC = (newTodolistTitle: string):AddTodolistActionType=>{
    return {type: 'ADD-TODOLIST', title: newTodolistTitle}
}

export const ChangeTodolistTitleAC = (id:string, newTodolistTitle: string):ChangeTodolistTitleActionType=>{
    return {type: 'CHANGE-TODOLIST-TITLE', id: id, title: newTodolistTitle}
}

export const ChangeFilterTodolistAC = (todolistId: string, newFilter:FilterValuesType):ChangeTodolistFilterActionType=>{
    return {type: 'CHANGE-TODOLIST-FILTER', id:todolistId, filter: newFilter}

}