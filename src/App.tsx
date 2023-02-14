import React, {FC, ChangeEvent, useState} from 'react'
import './App.css'
import TodoTask from './Components/TodoTask';
import { ITask } from './interfaces';
const App:FC =() => {
  const [task, setTask] = useState<string>("");
  const [deadline, setDeadline] = useState<number>(0);
  const [todoList, setTodoList] = useState<ITask[]>([]);


  const handleChange = (event:ChangeEvent<HTMLInputElement>): void => {
    if(event.target.name === "task"){
      setTask(event.target.value);
    }else {
      setDeadline(Number(event.target.value));
    }
  }

  const addTask = ():void =>{
    const newTask = {taskName: task, deadline: deadline};
    setTodoList([...todoList, newTask]);
    setTask("");
    setDeadline(0);
  }

  const completeTask = (taskNameToDelete: string) :void =>{
    setTodoList(todoList.filter((task) => {
      return task.taskName != taskNameToDelete
    }))
  }
  return (
    <div className="App">
      <div className="header">
        <div className="inputContainer">
    <input
     onChange={handleChange}
     type="text" name="task" 
     placeholder='Tas...' 
    value={task}
     />
      <input
       type="number"
        name="deadline" 
        placeholder='Deadline (in days)'
        onChange={handleChange}
        value={deadline}
        />
        </div>
      <button onClick={addTask}>Add task</button>
      </div>
      <div className="todoList">
      {todoList.map((task: ITask, key:number)=>{
        return <TodoTask key={key} completeTask={completeTask} task={task}/>
      })}
      </div>

     </div>
  )
}

export default App
