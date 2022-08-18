import { useState, useRef } from 'react';
import TodoList from '../components/TodoList';
import axios from '../api/axios'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

function TodoPage() {
  const [ input, setInput ] = useState('');
  const todoInput = useRef();
  const token = localStorage.getItem('token');
  
  const createTodo = async () => {
    const response = await axios.post('/todos', {
      todo: todoInput.current.value
    },
    {
      headers: { 
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json' 
      }
    });

    return response.data;
  }

  const addTodo = () => {
    if (todoInput.current.value) {
      createTodo().then((data) => {
        setInput(data);
      })
      todoInput.current.value = '';
    }
  }

  const forEnter = (e) => {
    if (e.key === 'Enter') addTodo();
  }


  return (
    <div className="w-screen h-screen relative">

      <p className="text-center pt-24 text-5xl font-bold select-none">TO DO LIST</p>

      <div className="absolute widthCenter top-44 todoBox border-solid border rounded-md border-gray-300 p-6">
        <div className="w-full h-1/6 py-2 flex">
          <input type="text" placeholder="할 일을 입력해 주세요" ref={ todoInput } onKeyPress={ forEnter } className="w-5/6 h-full input input-bordered focus:outline-none" />
          <button type="submit" onClick={ addTodo } className="w-1/6 h-full ml-3 bg-black text-white border-solid border rounded-md focus:outline-none">
            <FontAwesomeIcon icon={ faPlus } size="lg" /> 
          </button>
        </div>
        
        <div className="w-full h-5/6 overflow-y-auto scrollbar-hide">
          <TodoList input={ input } />
        </div>
      </div>

    </div>
  );
}

export default TodoPage;