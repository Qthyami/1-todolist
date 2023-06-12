import React, {useState} from 'react';
import { v1 } from 'uuid';
import './App.css';
import TodoList, {TaskType} from "./todoList";
export type FilterValuesType= "all" | "completed" | "active";
function App() {
    const title_1:string ="what to learn";

    let  tasks_1 :Array<TaskType> = [
        {id:v1(), title:"HTML&CSS", isDone: true},
        {id:v1(), title:"JS", isDone: true},
        {id:v1(), title:"ReactJS", isDone: false},
        {id:v1(), title:"Redux", isDone: true},
        {id:v1(), title:"Redux", isDone: true}

    ]


let [tasks, setTasks] = useState <Array<TaskType>> (tasks_1);
let [filter, setFilter] = useState<FilterValuesType>("all")

 function changeFilter(value:FilterValuesType){
     setFilter(value)
    }
 const removeTask =(id: string)=>{

      let filteredTasks =  tasks.filter((t)=>  t.id!==id)
     setTasks(filteredTasks);

    }
const addTask=(title: string)=>{
    let newTask={id:v1(), title:title, isDone: false};
    let NewTasks = [newTask,...tasks];
      setTasks(NewTasks);
    }
    //ниже 👇👇👇 функция управляющая чекбоксами
function changeStatus(taskId:string, isDone:boolean) {
    let task = tasks.find(t=>{
        return t.id === taskId
        }
     );
    //дальше надо проверить не undefined ли task через if () то:
    if (task){
        task.isDone = isDone;
    }
    //выглядит как брэд, но юзстейт не возьмет просто таскс, ему надо что-то
    //новое, хотя бы и копия измененного массива
    setTasks([... tasks])
    }


 let tasksForTodolist = tasks;
if (filter === "completed"){
    tasksForTodolist = tasks.filter((t)=>t.isDone===true);
}
if (filter === "active"){
        tasksForTodolist = tasks.filter((t)=>t.isDone===false);
    }


    return (
        <div className="App">
            <TodoList title={title_1}
                      tasks={tasksForTodolist}
                      removeTask={removeTask}
                      changeFilter={changeFilter}
                      addTask={addTask}
                      changeTaskStatus={changeStatus}
                      filter={filter}
            />




        </div>
    );
}

export default App;