import React, { useState } from 'react';
import { v1 } from 'uuid';
import './App.css';
import TodoList, {TasksType, TaskType, TodolistsType} from "./todoList";

export type FilterValuesType = "all" | "completed" | "active";

function App() {


    let todolistID1 = v1()
    let todolistID2 = v1()

    let [todolists, setTodolists] = useState<Array<TodolistsType>>([
        {id: todolistID1, title: 'What to learn', filter: 'all'},
        {id: todolistID2, title: 'What to buy', filter: 'all'},
    ])

    let [tasks, setTasks] = useState<TasksType>({
        [todolistID1]: [
            {id: v1(), title: 'HTML&CSS', isDone: true},
            {id: v1(), title: 'JS', isDone: true},
            {id: v1(), title: 'ReactJS', isDone: false},

        ],
        [todolistID2]: [
            {id: v1(), title: 'Rest API', isDone: true},
            {id: v1(), title: 'GraphQL', isDone: false},
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
        let newTask = { id: v1(), title: title, isDone: false };

        setTasks( {...tasks, [todolistId]:[newTask, ...tasks[todolistId]] });
    };

    function changeStatus(todolistId: string,taskId:string, isDone: boolean) {
        const updatedTasks= tasks[todolistId].map(el=>el.id ===taskId? {...el, isDone: isDone} : el);
        setTasks(
            {...tasks, [todolistId]:updatedTasks }
        );
    }


    return (
        <div className="App">
            {todolists.map((tl) => {
                let tasksForTodolist = tasks[tl.id];
                if (tl.filter === "completed") {
                    tasksForTodolist = tasks[tl.id].filter((t) => t.isDone);
                }
                if (tl.filter === "active") {
                    tasksForTodolist = tasks[tl.id].filter((t) => !t.isDone);
                }

                return (
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
                        filter={tl.filter}
                    />
                );
            })}
        </div>
    );
}

export default App;