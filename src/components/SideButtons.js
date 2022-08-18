import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from '../api/axios'
import { faTrashCan, faPen, faX, faCheck } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

function SideButtons({ item, list, setList, addRef }) {
  const token = localStorage.getItem('token');
  const [ show, setShow ] = useState(true);

  const deleteTodo = async (id) => {
    // eslint-disable-next-line no-unused-vars
    const response = await axios.delete(`/todos/${id}`, 
    {
      headers: { 'Authorization': `Bearer ${token}` },
    });

    setList(list.filter((todo) => todo.id !== id));
  }

  const editTodo = ({ todo }) => {
    setShow(!show);
    const refList = addRef();
    refList.forEach((ref) => {
      if (ref[0].value === todo) ref[0].readOnly = false;
    })
  }

  const updateTodo = () => {
    setShow(!show);

  }

  const xTodo = ({ id }) => {
    setShow(!show);
    const refList = addRef();
    refList.forEach((ref) => {
      if (ref[1] === id) {
        ref[0].readOnly = true;
        ref[0].value = ref[0].defaultValue
      };
    })
  }
  

  return (
    <>
      <div className="w-2/12 h-full focus:outline-none" style={ show ? { display: "flex" }: { display: "none"} }>
        <button onClick={ () => editTodo(item) } className="w-1/2 h-full focus:outline-none ml-3">
          <FontAwesomeIcon icon={ faPen } />
        </button>

        <button onClick={ () => deleteTodo(item.id) } className="w-1/2 h-full focus:outline-none ml-3">
          <FontAwesomeIcon icon={ faTrashCan } />
        </button>
      </div>

      <div className="w-2/12 h-full focus:outline-none" style={ show ? { display: "none" }: { display: "flex" } }>
        <button onClick={ () => updateTodo(item) } className="w-1/2 h-full focus:outline-none ml-3">
          <FontAwesomeIcon icon={ faCheck } />
        </button>

        <button onClick={ () => xTodo(item) } className="w-1/2 h-full focus:outline-none ml-3">
          <FontAwesomeIcon icon={ faX } />
        </button>
      </div>
    </>
  )
}

export default SideButtons;