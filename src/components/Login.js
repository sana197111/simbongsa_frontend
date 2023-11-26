// Login.js
import React, { useState } from 'react';
import '../App.css';
import "../index.css";
import { Link } from 'react-router-dom';

const logoImage = `${process.env.PUBLIC_URL}/logo.png`;

function Login() {
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (event) => {
    event.preventDefault();
    // 아이디 유효성 검사
    if (userId.length < 4) {
      alert("아이디는 4자 이상이어야 합니다.");
      return;
    }
  
    // 비밀번호 유효성 검사
    if (password.length < 6) {
      alert("비밀번호는 6자 이상이어야 합니다.");
      return;
    }
  
    // 로그인 로직을 여기에 추가하세요.
  };  

  return (
    <div className="min-h-screen overflow-y-auto max-h-screen p-4 flex flex-col items-center justify-center">
        <Link to="/" className="text-center">
            <div className="flex flex-col items-center">
                <img src={logoImage} alt="Logo" className="mb-6 logo-image" />
                <h2 className="text-4xl mb-2 custom-font">심봉사</h2>
                <h2 className="text-xl mb-12 custom-font">심심할 때 봉사하는 사람들</h2>
            </div>    
        </Link>
      <h2 className="text-4xl mb-8 scoreheavy-font">로그인</h2>
      <form onSubmit={handleLogin} className="flex flex-col items-center">
        <input
          type="text"
          placeholder="아이디"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
          className="mb-4 px-4 py-2 border border-gray-600"
        />
        <input
          type="password"
          placeholder="비밀번호"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="mb-8 px-4 py-2 border border-gray-600"
        />
        <button type="submit" className="scoreregular-font mb-4 px-6 py-2 border border-gray-600 border-solid hover:bg-[#018b63] hover:border-[#018b63] hover:text-white active:bg-[#016d53] transition duration-300 ease-in-out">
          로그인
        </button>
        <Link to="/signup">
                <p className="scorelight-font hover:text-[#018b63] transition duration-300 ease-in-out cursor-pointer">
                    회원가입
                </p>
        </Link>
      </form>
    </div>
  );
}

export default Login;
