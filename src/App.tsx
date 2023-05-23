import React from 'react';
import './App.css';
import TodoList, {TaskType} from "./todoList";

function App():JSX.Element {
    const title_1:string ="what to learn"
    const title_2:string ="what to buy"
    const  tasks_1 :Array<TaskType> = [
        {id:1, title:"HTML", isDone: true},
        {id:2, title:"CSS", isDone: true},
        {id:3, title:"JS", isDone: true}

    ]
    const  tasks_2 :Array<TaskType> = [
        {id:1, title:"Ris", isDone: true},
        {id:2, title:"Grechka", isDone: true},
        {id:3, title:"Pivas", isDone: true}

    ]

    return (
        <div className="App">
            <TodoList title={title_1} tasks={tasks_1}/>
            <TodoList title={title_2} tasks={tasks_2}/>



        </div>
    );
}

export default App;
