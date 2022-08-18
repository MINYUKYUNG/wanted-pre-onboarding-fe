import React, { useState, useEffect, useRef } from 'react';
import axios from '../api/axios'
import { useNavigate } from "react-router-dom"

function LoginPage() {
  const [ buttonText, setButtonText ] = useState('로그인');
  const navigate = useNavigate();
  
  // 리디렉트
  // useEffect(() => {
  //   const isLogin = localStorage.getItem('token');
  //   if (isLogin) navigate('/todo');
  // }, [navigate])

  const [ user, setUser ] = useState({
    email: "이메일",
    password: "비밀번호"
  })

  const checkUser = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value })
  };

  const checkButton = useRef();

  useEffect(() => {
    if (user.email.includes("@") && user.password.length >= 8) checkButton.current.classList.remove('btn-disabled');
    else if (!checkButton.current.className.includes("btn-disabled")) checkButton.current.classList.add('btn-disabled');
  }, [user])

  // try, catch 구문도 추가해야한다
  const loginAPI = async (inup) => {
    const params = inup === '로그인' ? 'signin': 'signup';

    const response = await axios.post(`/auth/${params}`, {
      email: user.email,
      password: user.password
    },
    {
      headers: { 'Content-Type': 'application/json' },
    });

    localStorage.setItem('token', response.data.access_token);
    navigate("/todo");
  }


  return (
    <div className="w-screen h-screen relative">

      <p className="text-center pt-32 text-5xl font-bold select-none">WANTED</p>

      <div className="absolute widthCenter top-52 loginBox border-solid border rounded-md border-gray-300 p-6 grid grid-rows-4">

        <div className="flex py-2">
          <div className="w-1/5 pt-3 select-none">이메일</div>
          <input type="text" name="email" placeholder="@를 포함한 이메일 입력" onChange={ checkUser } className="input input-bordered w-4/5 cursor-pointer" />
        </div>

        <div className="flex py-2">
          <div className="w-1/5 pt-3 select-none">비밀번호</div>
          <input type="password" name="password" placeholder="8자 이상의 비밀번호 입력" onChange={ checkUser } className="input input-bordered w-4/5 cursor-pointer" />
        </div>

        { buttonText === '로그인' ? 
          ( <p className="mt-4 text-sm text-gray-600"><span className="cursor-pointer select-none" onClick={ () => setButtonText('회원가입') }>회원가입</span></p> )
           : 
          ( 
            <div className="flex py-2">
              <div className="w-1/5 pt-3 select-none">이름</div>
              <input type="text" name="name" placeholder="홍길동" className="input input-bordered w-4/5 cursor-pointer" />
            </div>
          )
        }

        <button type="submit" className="btn mt-auto btn-disabled cursor-pointer" ref={ checkButton } onClick={ () => loginAPI(buttonText) }>{ buttonText }</button>

      </div>

    </div>
  );
}

export default LoginPage;