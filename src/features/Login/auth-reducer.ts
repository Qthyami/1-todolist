import { Dispatch } from 'redux'
import {
    setAppErrorActionType,
    setAppInitialisedAC,
    setAppStatusAC,
    SetAppStatusActionType,
    SetInitialisedActionType
} from '../../app/app-reducer'
import {handleServerAppError, handleServerNetworkError} from "../../utils/utils";
import {authAPI} from "../../api/todolists-api";

const initialState = {
    isLoggedIn: false
}
type InitialStateType = typeof initialState

export const authReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'login/SET-IS-LOGGED-IN':
            return {...state, isLoggedIn: action.value}
        default:
            return state
    }
}
// actions
export const setIsLoggedInAC = (value: boolean) =>
    ({type: 'login/SET-IS-LOGGED-IN', value} as const)



// types
type ActionsType = ReturnType<typeof setIsLoggedInAC> | SetAppStatusActionType | setAppErrorActionType | SetInitialisedActionType


export const loginTC = (data: any) => async (dispatch: Dispatch<ActionsType>) => {
    dispatch(setAppStatusAC('loading'))
    try{
        const res = await authAPI.login(data)
        if (res.data.resultCode===0){
            dispatch((setIsLoggedInAC(true)))
            dispatch (setAppStatusAC("succeeded"))
        } else{
            handleServerAppError(dispatch, res.data)
        }
    } catch (e){
        handleServerNetworkError((e) as {message:string}, dispatch)
    }
}

export const meTC = () => async (dispatch: Dispatch<ActionsType>) => {
    dispatch(setAppStatusAC('loading'))
    try{
        const res = await authAPI.me()
        if (res.data.resultCode===0){
            dispatch((setIsLoggedInAC(true)))
            dispatch (setAppStatusAC("succeeded"))
        } else{
            handleServerAppError(dispatch, res.data,)
        }
    } catch (e){
        handleServerNetworkError((e) as {message:string}, dispatch)
    }
    finally {
        dispatch(setAppInitialisedAC(true))
    }
}

export const logOutTC = () => (dispatch: Dispatch<ActionsType>) => {
    dispatch(setAppStatusAC('loading'))
    authAPI.logOut()
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(setIsLoggedInAC(false))
                dispatch(setAppStatusAC('succeeded'))
            } else {
                handleServerAppError( dispatch,res.data)
            }
        })
        .catch((error) => {
                handleServerNetworkError(error, dispatch)
            }
        )
        .finally(()=>{
                dispatch(setAppInitialisedAC(true))
            }


        )


}