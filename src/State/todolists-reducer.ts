import {TodolistsType} from "../todoList";
import {v1} from "uuid";
import {Reducer, useReducer} from "react";
import {FilterValuesType} from "../App";

export type ActionType=
    removeTodolistAcType | addTodolistAcType | changeTodolistTitleAcType |changeTodolistFilterAcType
export let todolistID1 = v1()
export let todolistID2 = v1()


const initialState: Array<TodolistsType>= [
    // {id: todolistID1, title: 'What to learn', filter: 'all'},
    // {id: todolistID2, title: 'What to buy', filter: 'all'}
];

export const todolistsReducer=(state:Array<TodolistsType>=initialState, action:ActionType) =>{

    switch (action.type){
        case "REMOVE-TODOLIST":
            return state.filter(tl => tl.id !== action.payload.id)
        case "ADD-TODOLIST":
            let newTodolist:TodolistsType = {
                id:action.payload.todolistId,
                title:action.payload.title,
                filter: "all"
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