
import {v1} from "uuid";
import {Reducer, useReducer} from "react";

import {TodolistType} from "../api/todolists-api";

export type ActionType=
    removeTodolistAcType | addTodolistAcType | changeTodolistTitleAcType |changeTodolistFilterAcType
export let todolistID1 = v1()
export let todolistID2 = v1()


const initialState: Array<TodolistDomainType>= [
    // {id: todolistID1, title: 'What to learn', filter: 'all'},
    // {id: todolistID2, title: 'What to buy', filter: 'all'}
];
export type FilterValuesType = "all" | "completed" | "active";
export  type TodolistDomainType = TodolistType & {
    filter:FilterValuesType
}

export const todolistsReducer=(state:Array<TodolistDomainType>=initialState, action:ActionType):Array<TodolistDomainType> =>{

    switch (action.type){
        case "REMOVE-TODOLIST":
            return state.filter(tl => tl.id !== action.payload.id)
        case "ADD-TODOLIST":
            let newTodolist:TodolistDomainType= {
                id:action.payload.todolistId,
                title:action.payload.title,
                filter: "all",
                addedDate:"",
                order:0
            }

            return  [ newTodolist,...state];

        case 'CHANGE-TODOLIST-TITLE' :
            return state.map(t=> t.id ===action.payload.id ? {...t, title:action.payload.title} : t)
        case 'CHANGE-TODOLIST-FILTER' :
            return state.map(t=>t.id===action.payload.id ? {...t, filter: action.payload.filter} : t)



        default:
            return state
    }
}
export type removeTodolistAcType=ReturnType<typeof removeTodolistAC>
export const removeTodolistAC=(id: string)=>{
    return {
        type:"REMOVE-TODOLIST",
        payload: {
            id
        }
    } as const
}
export type addTodolistAcType = ReturnType<typeof addTodolistAC>;
export const addTodolistAC = (title: string) => {
    return {
        type: "ADD-TODOLIST",
        payload: {
            title,
            todolistId: v1()
        }
    } as const;
};
type changeTodolistTitleAcType = ReturnType<typeof changeTodolistTitleAC>;
export const changeTodolistTitleAC = (id: string, title: string)=>{
    return{
        type: 'CHANGE-TODOLIST-TITLE',
        payload:{
            id,
            title,
        }
    }as const;

}
export type changeTodolistFilterAcType=ReturnType<typeof changeTodolistFilterAC>;
export const changeTodolistFilterAC = (id: string, filter: FilterValuesType)=>{
    return {
        type:'CHANGE-TODOLIST-FILTER',
        payload:{
            id,
            filter,
        }

    }as const;
}