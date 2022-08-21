import { useState, useEffect, useRef } from 'react';
import { useNavigate } from "react-router-dom"
import axios from '../api/axios'
import TodoList from '../components/TodoList';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

function TodoPage() {
  const [ input, setInput ] = useState('');
  const todoInput = useRef();
  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  // Assignment3
  useEffect(() => {
    const isLogin = localStorage.getItem('token');
    if (!isLogin) navigate('/');
  }, []);
  
  // Assignment4 // createTodo // 새로 추가
  const createTodo = async () => {
    try {
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
   } catch(error) {
      alert(`${error.message}\n요청중에 오류가 발생했습니다. 새로고침 후 다시 시도해주세요.`);
   }
  };

  // Assignment4
  const addTodo = () => {
    if (todoInput.current.value) {
      createTodo().then((data) => {
        setInput(data);
      });
      
      todoInput.current.value = '';
    }
  };

  const forEnter = (e) => {
    if (e.key === 'Enter') addTodo();
  };

  const logout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };


  return (
    <div className="w-screen h-screen relative bg-lime-100">

      <div className="w-full h-36 relative">
        <button onClick={ logout } className="btn btn-sm absolute right-4 top-4 xl:right-20 xl:top-6 bg-blue-500 border-0">로그아웃</button>
        <p className="text-center pt-24 text-5xl font-bold select-none text-blue-500">TO DO LIST</p>
      </div>

      <div className="absolute widthCenter top-44 todoBox border-solid border rounded-md border-blue-500 p-6">
        <div className="w-full h-1/6 py-2 flex">
          <input type="text" placeholder="할 일을 입력해 주세요" ref={ todoInput } onKeyPress={ forEnter } className="w-5/6 h-full input input-bordered focus:outline-none" />
          <button type="submit" onClick={ addTodo } className="w-1/6 h-full ml-3 text-white border-solid border rounded-md focus:outline-none bg-blue-500">
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