import React, { useState } from 'react';
import { v1 } from 'uuid';
import './App.css';
import TodoList, {TasksStateType} from "./todoList";
import {AddItemForm} from "./AddItemForm";
import {AppBar, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@mui/material";
import {Menu} from "@mui/icons-material";
import {FilterValuesType, TodolistDomainType} from "./State/todolists-reducer";
import {TaskPriorities, TaskStatuses} from "./api/todolists-api";






function App() {


    let todolistID1 = v1()
    let todolistID2 = v1()

    let [todolists, setTodolists] = useState<Array<TodolistDomainType>>([
        {id: todolistID1, title: 'What to learn', filter: 'all',addedDate:"",
            order:0},
        {id: todolistID2, title: 'What to buy', filter: 'all',addedDate:"",
            order:0},
    ])

    let [tasks, setTasks] = useState<TasksStateType>({
        [todolistID1]: [
            {id: v1(), title: 'HTML&CSS', status: TaskStatuses.Completed, todoListId: todolistID1, startDate: "", description: "", deadline: "", order: 0, addedDate: "", priority: TaskPriorities.Low},
            {id: v1(), title: 'JS', status: TaskStatuses.Completed, todoListId: todolistID1, startDate: "", description: "", deadline: "", order: 0, addedDate: "", priority: TaskPriorities.Low}
        ],
        [todolistID2]: [
            {id: v1(), title: 'HTML&CSS', status: TaskStatuses.Completed, todoListId: todolistID2, startDate: "", description: "", deadline: "", order: 0, addedDate: "", priority: TaskPriorities.Low},
            {id: v1(), title: 'JS', status: TaskStatuses.Completed, todoListId: todolistID2, startDate: "", description: "", deadline: "", order: 0, addedDate: "", priority: TaskPriorities.Low}
        ]
    })


    function changeFilter(value: FilterValuesType, todolistId: string) {
        setTodolists(
            todolists.map((tl) =>
                tl.id === todolistId ? { ...tl, filter: value } : tl
            )
        );
    }

    const removeTask = (id: string, todolistId:string) => {
        let filteredTasks = tasks[todolistId].filter((t) => t.id !== id);

        setTasks({...tasks,[todolistId]:filteredTasks });
    };


    const addTask = (todolistId:string, title: string) => {

        let newTask = {id: v1(), title: title, status: TaskStatuses.New, todoListId: todolistId, startDate: "", description: "", deadline: "", order: 0, addedDate: "", priority: TaskPriorities.Low, completed: false};

        setTasks( {...tasks, [todolistId]:[newTask, ...tasks[todolistId]] });
        console.log(tasks)
    };

    function changeStatus(todolistId: string,taskId:string, isDone: boolean) {
        const updatedTasks= tasks[todolistId].map(el=>el.id ===taskId? {...el, isDone: isDone} : el);
        setTasks(
            {...tasks, [todolistId]:updatedTasks }
        );
    }
    function changeTaskTitle(id:string, newTitle:string, todolistId: string ) {
        const updatedTasks= tasks[todolistId].map(el=>el.id ===id? {...el, title:newTitle} : el);
        setTasks(
            {...tasks, [todolistId]:updatedTasks }
        );
    }

function addTodolist(title:string) {
        let newTodolist: TodolistsType={
            id: v1(),
            title: title,
            filter:"all"
        }
setTodolists([newTodolist, ...todolists]);
        setTasks({...tasks,
        [newTodolist.id]: []
        })
}

    const changeTodolistTitle=(id:string, newTitle:string)=> {
        setTodolists(todolists.map(tl=>tl.id===id? {...tl, title:newTitle} : tl))
    }

    function removeTodolist(todolistId: string) {
        setTodolists(todolists.filter(tl=>tl.id!==todolistId))
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

export default App;