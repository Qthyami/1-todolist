import {TodolistsType} from "../todoList";
import {v1} from "uuid";

type ActionType=
    removeTodolistAcType | addTodolistAcType | changeTodolistTitleAcType |changeTodolistFilterAcType


export const todolistsReducer=(state:Array<TodolistsType>, action:ActionType)=>{
    switch (action.type){
        case "REMOVE-TODOLIST":
            return state.filter(tl => tl.id !== action.payload.id)
        case "ADD-TODOLIST":
            let newTodolist:TodolistsType = {
                id:action.payload.todolistId,
                title:action.payload.title,
                filter: "all"
            }

            return  [...state, newTodolist];

        case 'CHANGE-TODOLIST-TITLE' :
            return state.map(t=> t.id ===action.payload.id ? {...t, title:action.payload.title} : t)
        case 'CHANGE-TODOLIST-FILTER' :
            return state.map(t=>t.id===action.payload.id ? {...t, filter: action.payload.filter} : t)



        default:
            throw new Error('I don\'t understand this type')
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
export const changeTodolistFilterAC = (id: string, filter: string)=>{
    return {
        type:'CHANGE-TODOLIST-FILTER',
        payload:{
            id,
            filter,
        }

    }as const;
}