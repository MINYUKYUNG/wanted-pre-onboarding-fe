import { useState, forwardRef } from "react";
import axios from '../api/axios'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan, faPen, faX, faCheck } from "@fortawesome/free-solid-svg-icons";

const SideButtons = forwardRef(({ item, list, setList }, ref) => {
  const token = localStorage.getItem('token');
  const [ show, setShow ] = useState(true);

  // Assignment5 // deleteTodo // 삭제
  const deleteTodo = async ({ id }) => {
    try {
      await axios.delete(`/todos/${id}`, 
      {
        headers: { 'Authorization': `Bearer ${token}` },
      });

      setList(list.filter((todo) => todo.id !== id));
    } catch(error) {
      alert(`${error.message}\n요청중에 오류가 발생했습니다. 새로고침 후 다시 시도해주세요.`);
    };
  };

  // Assignment5 // 수정
  const editTodo = ({ id }) => {
    setShow(!show);
    ref.current.forEach((el) => {
      if (el[1] === id) el[0].readOnly = false;
    });
  };

  // Assignment5 // updateTodo // 제출
  const updateTodo = async ({ id, isCompleted }) => {
    setShow(!show);
    const newTodo = ref.current.find((el) => {
      if (el[1] === id) el[0].readOnly = true;
      return el[1] === id;
    });

    try {
        await axios.put(`/todos/${id}`, {
        todo: newTodo[0].value,
        isCompleted: isCompleted
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
      if (item.id === id) return { ...item, todo: newTodo[0].value };
      return item;
    }));
  };

  // Assignment5 // 취소
  const xTodo = ({ id }) => {
    setShow(!show);
    ref.current.forEach((el) => {
      if (el[1] === id) {
        el[0].readOnly = true;
        el[0].value = el[0].defaultValue;
      };
    });
  };
  

  return (
    <>
      <div className="w-2/12 h-full focus:outline-none" style={ show ? { display: "flex" }: { display: "none"} }>
        <button onClick={ () => editTodo(item) } className="w-1/2 h-full focus:outline-none ml-3">
          <FontAwesomeIcon icon={ faPen } className="text-blue-500" />
        </button>

        <button onClick={ () => deleteTodo(item) } className="w-1/2 h-full focus:outline-none ml-3">
          <FontAwesomeIcon icon={ faTrashCan } className="text-blue-500" />
        </button>
      </div>

      <div className="w-2/12 h-full focus:outline-none" style={ show ? { display: "none" }: { display: "flex" } }>
        <button onClick={ () => updateTodo(item) } className="w-1/2 h-full focus:outline-none ml-3">
          <FontAwesomeIcon icon={ faCheck } className="text-blue-500" />
        </button>

        <button onClick={ () => xTodo(item) } className="w-1/2 h-full focus:outline-none ml-3">
          <FontAwesomeIcon icon={ faX } className="text-blue-500" />
        </button>
      </div>
    </>
  )
})

export default SideButtons;