import { useState, useEffect, useRef } from 'react';
import axios from '../api/axios'
import SideButtons from './SideButtons';

function TodoList({ input }) {
  const [ list, setList ] = useState([]);
  const token = localStorage.getItem('token');

  // Assignment4 // getTodos
  const getTodos = async () => {
    if(!token) return;
    else if (input) setList([ ...list, input ]);
    else {
      try {
        const response = await axios.get('/todos', 
        {
          headers: { 'Authorization': `Bearer ${token}` },
        });

        setList([ ...response.data ]);
      } catch(error) {
        alert(`${error.message}\n요청중에 오류가 발생했습니다. 새로고침 후 다시 시도해주세요.`);
      }
    }
  };
  
  useEffect(() => {
    getTodos();
  }, [input]);

  // Assignment4 // updateTodo // 완료 여부
  const completeTodo = async (id, todo, checked) => {
    try {
      await axios.put(`/todos/${id}`, {
        todo: todo,
        isCompleted: checked
      },
      {
        headers: { 
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json' 
        }
      });
    } catch(error) {
      alert(`${error.message}\n요청중에 오류가 발생했습니다. 해당페이지를 종료하고 새로운 페이지로 다시 시도해주세요.`);
    };

    setList(list.map((item) => {
      if (item.id === id) return { ...item, isCompleted: checked };
      return item;
    }));
  };

  const idList = useRef([]);
  idList.current = [];

  const addRef = (el, id) => {
    if (el && !idList.current.includes(el)) idList.current.push([ el, id ]);
    return idList.current;
  };

  const result = list.map((item) => {
    const doneLine = item.isCompleted ? " line-through": '';

    const info = {
      item: item,
      list: list,
      setList: setList,
      ref: idList
    };

    return (
      <div className="w-full h-1/5 py-2 flex" key={ item.id }>

        <div className="w-1/12 relative">
          <input 
            type="checkbox" 
            checked={ item.isCompleted ? true: false } 
            onChange={ (e) => completeTodo(item.id, item.todo, e.target.checked) } 
            className="toggle toggle-xs focus:outline-none absolute heightCenter checked:bg-blue-500 checked:border-blue-500" 
          />
        </div>
        
        <input type="text" defaultValue={ item.todo } ref={ (el) => addRef(el, item.id) } className={ "w-9/12 h-full input focus:outline-none bg-white" + doneLine } readOnly />

        <SideButtons { ...info } />

      </div>
    )
  });


  return (
    <>
      { result.length !== 0 ? result: null }
    </>
  )
}

export default TodoList;