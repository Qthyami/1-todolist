import {Dispatch} from "redux";
import {ResponseType} from "../api/todolists-api";
import {setAppErrorAC, setAppErrorActionType, setAppStatusAC, SetAppStatusActionType} from "../app/app-reducer";

export const handleServerAppError=<D>(dispatch:Dispatch, data:ResponseType)=>{
    if (data.messages.length){
        dispatch(setAppErrorAC(data.messages[0]))

    } else {
        dispatch(setAppErrorAC("Some Error"))
    }
    dispatch(setAppStatusAC("failed"))
}
export const handleServerNetworkError = (error: { message: string }, dispatch: ErrorUtilsDispatchType) => {
    dispatch(setAppErrorAC(error.message))
    dispatch(setAppStatusAC('failed'))
}
type ErrorUtilsDispatchType=Dispatch<SetAppStatusActionType| setAppErrorActionType>