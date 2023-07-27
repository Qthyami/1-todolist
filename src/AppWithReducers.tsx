import React, {useReducer} from 'react';
import { v1 } from 'uuid';
import './App.css';
import TodoList, {TasksStateType, TodolistsType} from "./todoList";
import {AddItemForm} from "./addItemForm";
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
export type FilterValuesType = "all" | "completed" | "active";


function AppWithReducers() {


    let todolistID1 = v1()
    let todolistID2 = v1()


    let [todolists, dispatchToTodolistsReducer] = useReducer(todolistsReducer, [
        {id: todolistID1, title: 'What to learn', filter: 'all'},
        {id: todolistID2, title: 'What to buy', filter: 'all'}
    ])

    let [tasks, dispatchToTasksReducer] = useReducer(tasksReducer, {
        [todolistID1]: [
            {id: v1(), title: 'HTML&CSS', isDone: false},
            {id: v1(), title: 'JS', isDone: false},
            {id: v1(), title: 'ReactJS', isDone: false},

        ],
        [todolistID2]: [
            {id: v1(), title: 'Rest API', isDone: false},
            {id: v1(), title: 'GraphQL', isDone: false},
        ]
    })

    function changeFilter(value: FilterValuesType, todolistId: string) {
        const action = changeTodolistFilterAC(todolistId, value)
        dispatchToTodolistsReducer(action)
        // setTodolists(
        //     todolists.map((tl) =>
        //         tl.id === todolistId ? { ...tl, filter: value } : tl
        //     )
        // );
    }

    const removeTask = (id: string, todolistId: string) => {
        const action = removeTaskAC(todolistId, id);
        dispatchToTasksReducer(action)
        // let filteredTasks = tasks[todolistId].filter((t) => t.id !== id);
        //
        // setTasks({...tasks,[todolistId]:filteredTasks });
    };


    const addTask = (todolistId: string, title: string) => {
        const action = addTaskAC(todolistId, title)
        dispatchToTasksReducer(action)
        // let newTask = { id: v1(), title: title, isDone: false };
        //
        // setTasks( {...tasks, [todolistId]:[newTask, ...tasks[todolistId]] });
        // console.log(tasks)
    };

    function changeStatus(todolistId: string, taskId: string, isDone: boolean) {
        const action = changeTaskStatusAC(todolistId, taskId, isDone)
        dispatchToTasksReducer(action)
        // const updatedTasks= tasks[todolistId].map(el=>el.id ===taskId? {...el, isDone: isDone} : el);
        // setTasks(
        //     {...tasks, [todolistId]:updatedTasks }
        // );
    }

    function changeTaskTitle(id: string, newTitle: string, todolistId: string) {
        const action = changeTaskTitleAC(id, newTitle, todolistId)
        dispatchToTasksReducer(action)
        // const updatedTasks= tasks[todolistId].map(el=>el.id ===id? {...el, title:newTitle} : el);
        // setTasks(
        //     {...tasks, [todolistId]:updatedTasks }
        // );
    }

    function addTodolist(title: string) {
        const action = addTodolistAC(title);
        dispatchToTodolistsReducer(action);
        dispatchToTasksReducer(action);
    }

// setTodolists([newTodolist, ...todolists]);
//         setTasks({...tasks,
//         [newTodolist.id]: []
//         })
// }

    const changeTodolistTitle = (id:string, newTitle:string) => {
        const action = changeTodolistTitleAC(id, newTitle)
        dispatchToTodolistsReducer(action)
    }

        function removeTodolist(todolistId: string) {
            const action = removeTodolistAC(todolistId);
            dispatchToTodolistsReducer(action);
            dispatchToTasksReducer(action)


        }

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
                            let tasksForTodolist = tasks[tl.id];
                            if (tl.filter === "completed") {
                                tasksForTodolist = tasks[tl.id].filter((t) => t.isDone);
                            }
                            if (tl.filter === "active") {
                                tasksForTodolist = tasks[tl.id].filter((t) => !t.isDone);
                            }

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

export default AppWithReducers;