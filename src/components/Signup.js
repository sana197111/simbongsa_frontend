// Signup.js
import React, { useState } from 'react';
import '../App.css';
import "../index.css";
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const logoImage = `${process.env.PUBLIC_URL}/logo.png`;

function Signup() {
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const navigate = useNavigate();

  const handleSignup = async (event) => {
    event.preventDefault();
  
    // 아이디 유효성 검사
    if (userId.length < 4) {
      alert("아이디는 4자 이상이어야 합니다.");
      return;
    }
  
    // 비밀번호 유효성 검사
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
    if (!passwordRegex.test(password)) {
      alert("비밀번호는 최소 8자 이상이며, 하나 이상의 숫자와 특수 문자를 포함해야 합니다.");
      return;
    }
  
    // 이메일 유효성 검사
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (!emailRegex.test(email)) {
      alert("올바른 이메일 형식이 아닙니다.");
      return;
    }
  
    // 전화번호 유효성 검사
    const phoneRegex = /^\d{10,11}$/;
    if (!phoneRegex.test(phoneNumber)) {
      alert("올바른 전화번호 형식이 아닙니다. (10-11자리 숫자)");
      return;
    }
  
    // 사용자 데이터 준비
    const userData = {
      username: userId,
      password: password,
      name: name,
      email: email,
      phone_number: phoneNumber,
    };

    try {
      const response = await axios.post('http://127.0.0.1:8000/signup/', userData);
      console.log(response.data);
      navigate('/login');
    } catch (error) {
      console.error('회원가입 에러:', error);
      alert('회원가입에 실패했습니다. 다시 시도해 주세요.');
    }
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
      <h2 className="text-4xl mb-8 scoreheavy-font">회원가입</h2>
      <form onSubmit={handleSignup} className="flex flex-col items-center">
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
          className="mb-4 px-4 py-2 border border-gray-600"
        />
        <input
          type="text"
          placeholder="이름"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="mb-4 px-4 py-2 border border-gray-600"
        />
        <input
          type="email"
          placeholder="이메일"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mb-4 px-4 py-2 border border-gray-600"
        />
        <input
          type="tel"
          placeholder="전화번호"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          className="mb-8 px-4 py-2 border border-gray-600"
        />
        <button type="submit" className="scoreregular-font mb-4 px-6 py-2 border border-gray-600 border-solid hover:bg-[#018b63] hover:border-[#018b63] hover:text-white active:bg-[#016d53] transition duration-300 ease-in-out">
          회원가입
        </button>
        <Link to="/login">
                <p className="scorelight-font hover:text-[#018b63] transition duration-300 ease-in-out cursor-pointer">
                    로그인
                </p>
        </Link>
      </form>
    </div>
  );
}

export default Signup;
