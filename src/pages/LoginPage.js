import React, { useState, useEffect, useRef } from 'react';
import axios from '../api/axios'
import { useNavigate } from "react-router-dom"

function LoginPage() {
  const [ buttonText, setButtonText ] = useState('로그인');
  const navigate = useNavigate();
  const bgcolor = ' bg-gradient-to-r from-yellow-100 to-rose-300';
  
  // Assignment3
  useEffect(() => {
    const isLogin = localStorage.getItem('token');
    if (isLogin) navigate('/todo');
  }, []);

  const [ user, setUser ] = useState({
    email: "이메일",
    password: "비밀번호"
  });

  const checkUser = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value })
  };

  const buttonRef = useRef();

  // Assignment1
  useEffect(() => {
    const button = buttonRef.current.classList;
    if (user.email.includes("@") && user.password.length >= 8) {
      button.remove('btn-disabled');
      button.add('bg-yellow-100');
      button.add('hover:bg-yellow-100');
    } else if (!buttonRef.current.className.includes("btn-disabled")) {
      button.add('btn-disabled');
      button.remove('bg-yellow-100');
    }
  }, [user]);

  // Assignment2 // SignUp // SignIn
  const loginAPI = async (inup) => {
    const params = inup === '로그인' ? 'signin': 'signup';

    try {
      const response = await axios.post(`/auth/${params}`, {
        email: user.email,
        password: user.password
      },
      {
        headers: { 'Content-Type': 'application/json' },
      });

      localStorage.setItem('token', response.data.access_token);
      navigate("/todo");
    } catch(error) {
      if (error.response.status === 404 && inup === '로그인') alert(`${error.message}\n존재하지 않는 회원입니다. 회원가입 후 다시시도해주세요.`);
      else if (error.response.status === 401 && inup === '로그인') alert(`${error.message}\n잘못된 비밀번호입니다. 다시시도해주세요.`);
      else alert(`${error.message}\n요청중에 오류가 발생했습니다. 새로고침 후 다시 시도해주세요.`);
    };
  };

  const pressEnter = (e) => {
    if (e.key === 'Enter' && !buttonRef.current.className.includes("btn-disabled")) loginAPI(buttonText);
  };


  return (
    <div className={ "w-screen h-screen relative" + bgcolor }>

      <p className="text-center pt-32 text-5xl font-bold select-none text-rose-500">WANTED</p>

      <div className="absolute widthCenter top-52 loginBox border-solid border rounded-md border-rose-600 p-6 grid grid-rows-4">

        <div className="flex py-2">
          <div className="w-1/5 pt-3 select-none text-rose-600">이메일</div>
          <input type="text" name="email" placeholder="@를 포함한 이메일 입력" onChange={ checkUser } onKeyPress={ pressEnter } className="input input-bordered w-4/5 cursor-pointer" />
        </div>

        <div className="flex py-2">
          <div className="w-1/5 pt-3 select-none text-rose-600">비밀번호</div>
          <input type="password" name="password" placeholder="8자 이상의 비밀번호 입력" onChange={ checkUser } onKeyPress={ pressEnter } className="input input-bordered w-4/5 cursor-pointer" />
        </div>

        { buttonText === '로그인' ? 
          ( <p className="mt-4 text-sm text-gray-600"><span className="cursor-pointer select-none" onClick={ () => setButtonText('회원가입') }>회원가입</span></p> )
           : 
          ( 
            <div className="flex py-2">
              <div className="w-1/5 pt-3 select-none text-rose-600">이름</div>
              <input type="text" name="name" placeholder="홍길동" onKeyPress={ pressEnter } className="input input-bordered w-4/5 cursor-pointer" />
            </div>
          )
        }

        <button type="submit" className="btn mt-auto btn-disabled cursor-pointer text-rose-600 border-0" ref={ buttonRef } onClick={ () => loginAPI(buttonText) }>{ buttonText }</button>

      </div>

    </div>
  );
}

export default LoginPage;