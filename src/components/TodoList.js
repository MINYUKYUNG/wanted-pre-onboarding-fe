import { useState, useEffect, useRef } from 'react';
import axios from '../api/axios'
import SideButtons from './SideButtons';

function TodoList({ input }) {
  const [ list, setList ] = useState([]);
  const token = localStorage.getItem('token');

  const getTodos = async () => {
    if (input) setList([ ...list, input ]);
    else {
      const response = await axios.get('/todos', 
      {
        headers: { 'Authorization': `Bearer ${token}` },
      });

      setList([ ...response.data ]);
    }
  }
  
  useEffect(() => {
    getTodos();
  }, [input])

  const completeTodo = async (id, todo, checked) => {
    // eslint-disable-next-line no-unused-vars
    const response = await axios.put(`/todos/${id}`, {
      todo: todo,
      isCompleted: checked
    },
    {
      headers: { 
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json' 
      }
    });

    setList(list.map((todo) => {
      if (todo.id === id) return { ...todo, isCompleted: checked }
      return todo;
    }));
  }

  const idList = useRef([]);
  idList.current = [];

  const addRef = (el, id) => {
    if (el && !idList.current.includes(el)) idList.current.push([ el, id ]);
    return idList.current;
  }

  const result = list.map((item, index) => {
    const doneLine = item.isCompleted ? " line-through": '';

    const info = {
      item: item,
      list: list,
      setList: setList,
      addRef: addRef
    };

    return (
      <div className="w-full h-1/5 py-2 flex" key={ item.id }>

        <div className="w-1/12 relative">
          <input 
            type="checkbox" 
            checked={ item.isCompleted ? true: false } 
            onChange={ (e) => completeTodo(item.id, item.todo, e.target.checked) } 
            className="toggle toggle-xs focus:outline-none absolute heightCenter" 
          />
        </div>
        
        <input type="text" defaultValue={ item.todo } ref={ (el) => addRef(el, item.id) } className={ "w-9/12 h-full input focus:outline-none bg-gray-100" + doneLine } readOnly />

        <SideButtons { ...info } />

      </div>
    )
  })


  return (
    <>
      { result.length !== 0 ? result: null }
    </>
  )
}

export default TodoList;