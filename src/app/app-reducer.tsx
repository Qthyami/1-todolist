export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'
export type ErrorType = string | null
const initialState = {
    status: 'loading' as RequestStatusType,
    error: null as string | null,
    isInitialised:false
}

type InitialStateType = typeof initialState

export const appReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'APP/SET-STATUS':
            return {...state, status: action.status}
        case "APP/SET-ERROR":
            return {...state, error: action.error}
        case 'APP/SET-IS-INITIALISED':
            return {...state, isInitialised: action.value}
        default:
            return state
    }
}

export type ActionsType = SetAppStatusActionType| setAppErrorActionType | SetInitialisedActionType
export type SetAppStatusActionType=ReturnType<typeof setAppStatusAC>
export const setAppStatusAC=(status:RequestStatusType)=>{
   return  {
        type:'APP/SET-STATUS',
        status
    } as const

}
export type setAppErrorActionType=ReturnType<typeof setAppErrorAC>
export const setAppErrorAC=(error:ErrorType)=>{
   return  {
        type:'APP/SET-ERROR',
       error
    } as const

}
export type SetInitialisedActionType = ReturnType<typeof setAppInitialisedAC>
export const setAppInitialisedAC = (value: boolean) => ({type: 'APP/SET-IS-INITIALISED', value} as const)
//TCs
