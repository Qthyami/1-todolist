import React, { useState } from 'react';
import { v1 } from 'uuid';
import './App.css';
import TodoList, {TasksType, TaskType, TodolistsType} from "./todoList";

export type FilterValuesType = "all" | "completed" | "active";

function App() {
    const title_1: string = "what to learn";


let todolistId1=v1();
    let todolistId2=v1();
    let [todolists, setTodolists] = useState<TodolistsType[]>(
        [
            { id: todolistId1, title: 'What to learn', filter: 'active' },
            { id: todolistId2, title: 'What to buy', filter: 'completed' },
        ]
    );

    let [tasks, setTasks]=useState<TasksType>({
        todolistId1: [  { id: v1(), title: "HTML&CSS", isDone: true },
            { id: v1(), title: "JS", isDone: true },
            { id: v1(), title: "ReactJS", isDone: false },
            { id: v1(), title: "Redux", isDone: true },
            { id: v1(), title: "Redux", isDone: true }],
        todolistId2:[  { id: v1(), title: "Book", isDone: true },
            { id: v1(), title: "Milf", isDone: true },
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
            {...tasks, todolistId:updatedTasks }
        );
    }



    return (
        <div className="App">
            {todolists.map((tl) => {
                let tasksForTodolist = tasks[tl.id];
                if (tl.filter === "completed") {
                    tasksForTodolist = tasks[tl.id].filter(t => t.isDone);
                }
                if (tl.filter === "active") {
                    tasksForTodolist = tasks[tl.id].filter(t => !t.isDone);
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