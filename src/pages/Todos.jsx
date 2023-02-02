import React, { useEffect, useState } from 'react';
import {useSecureContext} from '@nebulr-group/nblocks-react';
import "./Todos.css";

const Todos = () => {
  const { authHttpClient } = useSecureContext();
 const [todos, setTodos] = useState([]);
 const [text, setText] = useState("");

 useEffect(() => {
   listTodos();
 }, [])


 const listTodos = async () => {
   const response = await authHttpClient.httpClient.get("http://localhost:3000/todo");
   setTodos(response.data);
 }


 const createTodo = async () => {
   const response = await authHttpClient.httpClient.post("http://localhost:3000/todo", {text});
   setTodos([...todos, response.data]);
   setText("");
 }


 return (
   <div className="todos">
     <div>
       {todos.map(todo => (
       <div key={todo.id} className={todo.done ? 'todo checked-icon' : 'todo'}>
         <p>{todo.text}</p>
       </div>
     ))}
     {!todos.length && (
      <div className={'todo'}>
        <p>There's no todos</p>
      </div>
     )}
     </div>
     <div className='new-todo'>
      <div>
      <textarea value={text} onChange={(e) => setText(e.target.value)} placeholder="Type todo"></textarea>
      </div>
       <button onClick={() => createTodo()}>Add</button>
     </div>
   </div>
 );
}

export { Todos };