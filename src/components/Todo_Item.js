import React from 'react'
import styles from "../todoStyles.module.css"

const TodoItem = ({task,Key,complete,deleteItem}) => {


  return (<>
    <div id={task.id} className={styles.todo_item} >
       {(task.completed)? 
       <input type='checkbox' onChange={() => complete(Key)} checked/> :
       <input type='checkbox' onChange={() => complete(Key)} />
       } 
       <p>{task.title}</p>
       <span className={styles.deleteIcon} onClick={() => deleteItem(Key)}>
         <img
           src="https://cdn-icons-png.flaticon.com/128/6711/6711573.png"
           alt="Delete-icon"
         />
       </span>
    </div>
  </>)
}

export default TodoItem