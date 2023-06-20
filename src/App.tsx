import React, { useState } from 'react';
import { v1 } from 'uuid';
import './App.css';
import TodoList, { TaskType, TodolistsType } from "./todoList";

export type FilterValuesType = "all" | "completed" | "active";

function App() {
    const title_1: string = "what to learn";

    let tasks_1: Array<TaskType> = [
        { id: v1(), title: "HTML&CSS", isDone: true },
        { id: v1(), title: "JS", isDone: true },
        { id: v1(), title: "ReactJS", isDone: false },
        { id: v1(), title: "Redux", isDone: true },
        { id: v1(), title: "Redux", isDone: true }
    ];

    let [todolists, setTodolists] = useState<TodolistsType[]>(
        [
            { id: v1(), title: 'What to learn', filter: 'active' },
            { id: v1(), title: 'What to buy', filter: 'completed' },
        ]
    );

    let [tasks, setTasks] = useState<Array<TaskType>>(tasks_1);


    function changeFilter(value: FilterValuesType, todolistId: string) {
        setTodolists(
            todolists.map((tl) =>
                tl.id === todolistId ? { ...tl, filter: value } : tl
            )
        );
    }

    const removeTask = (id: string) => {
        let filteredTasks = tasks.filter((t) => t.id !== id);
        setTasks(filteredTasks);
    };

    const addTask = (title: string) => {
        let newTask = { id: v1(), title: title, isDone: false };
        let newTasks = [newTask, ...tasks];
        setTasks(newTasks);
    };

    function changeStatus(taskId: string, isDone: boolean) {
        setTasks(
            tasks.map((t) => {
                return t.id === taskId ? { ...t, isDone: isDone } : t;
            })
        );
    }



    return (
        <div className="App">
            {todolists.map((tl) => {
                let tasksForTodolist = tasks;
                if (tl.filter === "completed") {
                    tasksForTodolist = tasks.filter((t) => t.isDone);
                }
                if (tl.filter === "active") {
                    tasksForTodolist = tasks.filter((t) => !t.isDone);
                }

                return (
                    <TodoList
                        key={tl.id}
                        id={tl.id}
                        title={tl.title}
                        tasks={tasksForTodolist}
                        removeTask={removeTask}
                        changeFilter={changeFilter}
                        addTask={addTask}
                        changeTaskStatus={changeStatus}
                        filter={tl.filter}
                    />
                );
            })}
        </div>
    );
}

export default App;