import React, { useEffect, useState } from 'react'
import TodoItem from './Todo_Item';
import styles from "../todoStyles.module.css";

const TodoList = () => {
  const [tasks,setTasks] = useState([]);
  const [text,setText] = useState('');
  async function addItem()
  {
      const response = await fetch('https://jsonplaceholder.typicode.com/todos',
      {
        method: 'POST',
        body: JSON.stringify({
        userId: 1,
        title: text,
        completed: false
        }),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      });
      const data = await response.json();
      setTasks([data,...tasks]);
  }

  useEffect(() => {
      async function getTasks() {
        const response = await fetch('https://jsonplaceholder.typicode.com/todos');
        const data = await response.json();
        setTasks(data);
      } 
      getTasks();
  },[]);

  async function complete(idx){
    tasks[idx].completed = !(tasks[idx].completed);
    setTasks([...tasks]);
    const task = tasks[idx];
    const response = await fetch(`https://jsonplaceholder.typicode.com/todos/${task.id}`,
    {
      method: 'PUT',
        body: JSON.stringify(tasks[idx]),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      });
      const data = await response.json();
      console.log(data);
  }

    async function deleteItem(idx){
      const task = tasks[idx];
      const remTasks = tasks.filter((val) => val.id  !== task.id);
      setTasks([...remTasks]);
      await fetch(`https://jsonplaceholder.typicode.com/posts/${task.id}`, {
            method: 'DELETE',
      });
    }

  return (<>
  <h3 className={styles.todo_heading}>TODO List</h3>

  <div className={styles.addTodo}>
    <input type='text' value={text} onInput={(e) => setText(e.target.value)} placeholder='Add Task' /> 
    <span className={styles.addIcon} onClick={addItem}>
      <img 
        src="https://cdn-icons-png.flaticon.com/128/3161/3161837.png"
        alt='Add-Icon'
    />
     </span>
  </div> 
  {tasks.map((val,idx) => <TodoItem Key={idx} task={val} deleteItem={deleteItem} complete={complete} />)}
  </>)
}

export default TodoList;