import logo from './logo.svg';
import './App.css';
import { useState, useRef } from 'react';
import React from 'react';
  
function Header() {
  return (
    <header className='w-screen h-20 bg-blue-300 content-center'>
      <nav className='flex flex-row place-content-center content-center gap-10 place-items-center p-5'>
          <img src="/todo-cloud-hero.png" className='h-10'></img>
          <div className='underline'><a href="/">Home</a></div>
          <div className='underline'><a href="/">About Dev</a></div>
      </nav>
    </header>
  );
}
  
function Task({Title, Status, onDelete, onComplete}) {
  const buttonBackgroundColor = Status ? 'bg-green-500' : 'bg-orange-500';
  return (
    
    <div className='w-80 h-12 flex flex-row place-items-center gap-2 border-2 border-black p-2'>
       <button className={`border-2 border-black w-8 h-8 ${buttonBackgroundColor}`} onClick={()=>onComplete(Title)}>✓</button>
      <h1>{Title}</h1>
      <button className='border-2 border-black w-8 h-8 bg-red-500 ml-auto' onClick={() => onDelete(Title)}>X</button>
    </div>
  );
}

function TaskList({Key, List, view, onDelete, onComplete}) {
  const ListFiltered =
  view === "All"
    ? List
    : view === "Completed"
    ? List.filter((item) => item.completed === true) // Update filtering condition
    : view === "To-Do"
    ? List.filter((item) => item.completed === false) // Update filtering condition
    : List;

  return (
    <div className='flex flex-col gap-2'>
      {ListFiltered.map((task,index) => (
        <Task key={index} Title={task.title} Status={task.completed} onDelete={onDelete} onComplete={onComplete} />
      ))}
    </div>
    
  );
}

function MyForm({ onSubmit }) {
  const [inputValue, setInputValue] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit(inputValue);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        className="border-2 border-black mr-2"
        value={inputValue}
        onChange={(event) => setInputValue(event.target.value)}
      />
      <button className='border-2 border-black px-2' type="submit">Submit</button>
    </form>
  );
}

function FilterButton({setView, view}) {
  return (
    // ${view === 'All' || view === 'Completed' || view === 'To-Do' ? 'bg-gray-200' : ''}
    <button className={`border-2 border-black px-2`} onClick={() => setView(view)}>
      {view}
    </button>);
}

function FilterSelector({setView}) {
  return (
    <div className='flex flex-row gap-2'>
      {["All","Completed","To-Do"].map((view, index) => (<FilterButton key={index} setView={setView} view={view} />))}
    </div>
  );
}


function App() {
  const [Tasks, setTasks] = useState([
    { title: 'Task 1', completed: true },
    { title: 'Task 2', completed: false },
    { title: 'Task 3', completed: false },
  ]);
  const [View, setViews] = useState('All');
  const [taskListKey, setTaskListKey] = useState(0);
  
  function addTask(task) {
    setTasks([...Tasks, {title:task,completed:false}]);
  }

  function deleteTask(task) {
    setTasks(Tasks.filter((item) => item.title !== task));
  }

  function setComplete(task) {
    setTasks(Tasks.map((item) => item.title === task ? { ...item, completed: !item.completed } : item));
  }

  function setView(view) {
    setViews(view);
    setTaskListKey((prevKey) => prevKey + 1);
  }

  return (
    <>
    <Header />
    <div className='flex flex-col items-center justify-center gap-5 p-5'>
      <MyForm onSubmit={addTask} />
      <FilterSelector setView={setView}/>
      <TaskList key={taskListKey} List={Tasks} view={View} onDelete={deleteTask} onComplete={setComplete}/>
    </div>
    </>
  );
}

export default App;
