import React, {useCallback, useReducer} from 'react';
import { v1 } from 'uuid';
import './App.css';
import TodoList, {TasksStateType, TodolistsType} from "./todoList";
import {AddItemForm} from "./AddItemForm";
import {AppBar, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@mui/material";
import {Menu} from "@mui/icons-material";
import InputWithSaveButton from "./InputWithSaveButton";
import {
    addTodolistAC,
    changeTodolistFilterAC,
    changeTodolistTitleAC,
    removeTodolistAC,
    todolistsReducer
} from "./State/todolists-reducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from "./State/tasks-reducer";

import { ActionType } from "./State/todolists-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./State/store";
export type FilterValuesType = "all" | "completed" | "active";


function AppWithRedux() {
    console.log("APP")

const dispatch = useDispatch()
const todolists =useSelector<AppRootStateType, Array<TodolistsType>>(state => state.todolists)
const tasks=useSelector<AppRootStateType, TasksStateType> (state=>state.tasks)



    const changeFilter=useCallback((value: FilterValuesType, todolistId: string) => {
        const action = changeTodolistFilterAC(todolistId, value)
        dispatch(action)
        // setTodolists(
        //     todolists.map((tl) =>
        //         tl.id === todolistId ? { ...tl, filter: value } : tl
        //     )
        // );
    },[dispatch]);

    const removeTask = useCallback((id: string, todolistId: string) => {
        const action = removeTaskAC(todolistId, id);
        dispatch(action)
        // let filteredTasks = tasks[todolistId].filter((t) => t.id !== id);
        //
        // setTasks({...tasks,[todolistId]:filteredTasks });
    },[dispatch]);


    const addTask = useCallback((todolistId: string, title: string) => {
        const action = addTaskAC(todolistId, title)
        dispatch(action)
        // let newTask = { id: v1(), title: title, isDone: false };
        //
        // setTasks( {...tasks, [todolistId]:[newTask, ...tasks[todolistId]] });
        // console.log(tasks)
    },[dispatch]);

    const changeStatus=useCallback((todolistId: string, taskId: string, isDone: boolean)=> {
        const action = changeTaskStatusAC(todolistId, taskId, isDone)
        dispatch(action)
        // const updatedTasks= tasks[todolistId].map(el=>el.id ===taskId? {...el, isDone: isDone} : el);
        // setTasks(
        //     {...tasks, [todolistId]:updatedTasks }
        // );
    },[dispatch]);

    const changeTaskTitle=useCallback((id: string, newTitle: string, todolistId: string)=> {
        const action = changeTaskTitleAC(id, newTitle, todolistId)
        dispatch(action)
        // const updatedTasks= tasks[todolistId].map(el=>el.id ===id? {...el, title:newTitle} : el);
        // setTasks(
        //     {...tasks, [todolistId]:updatedTasks }
        // );
    },[dispatch]);

    const addTodolist=useCallback((title: string)=> {
        const action = addTodolistAC(title);
        dispatch(action);

    },[dispatch]
    );
// setTodolists([newTodolist, ...todolists]);
//         setTasks({...tasks,
//         [newTodolist.id]: []
//         })
// }

    const changeTodolistTitle = useCallback((id:string, newTitle:string) => {
        const action = changeTodolistTitleAC(id, newTitle)
        dispatch(action)
    },[dispatch]
    )

        const removeTodolist=useCallback((todolistId: string)=> {
            const action = removeTodolistAC(todolistId);
            dispatch(action);



        },[dispatch])

        return (
            <div className="App">
                <AppBar position="static">
                    <Toolbar variant="dense">
                        <IconButton edge="start" color="inherit" aria-label="menu" sx={{mr: 2}}>
                            <Menu/>
                        </IconButton>
                        <Typography variant="h6" color="inherit" component="div">
                            Photos
                        </Typography>
                    </Toolbar>
                </AppBar>
                <Container fixed>
                    <Grid container style={{padding: "10px"}}> <AddItemForm addItem={addTodolist}/></Grid>

                    <Grid container spacing={10}>
                        {todolists.map((tl) => {
                            let allTodolistTasks = tasks[tl.id];
                            let tasksForTodolist = allTodolistTasks;



                            return <Grid item>

                                <Paper style={{padding: "10px"}}>
                                    <TodoList
                                        todolistId={tl.id}
                                        key={tl.id}
                                        id={tl.id}
                                        title={tl.title}
                                        tasks={tasksForTodolist}
                                        removeTask={removeTask}
                                        changeFilter={changeFilter}
                                        addTask={addTask}
                                        changeTaskStatus={changeStatus}
                                        changeTaskTitle={changeTaskTitle}
                                        changeTodolistTitle={changeTodolistTitle}
                                        removeTodolist={removeTodolist}
                                        filter={tl.filter}
                                    />
                                    {/*<InputWithSaveButton/>*/}
                                </Paper>

                            </Grid>


                        })}
                    </Grid>
                </Container>
            </div>
        );
    }

export default AppWithRedux;