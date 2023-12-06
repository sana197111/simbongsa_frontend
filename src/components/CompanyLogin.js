// CompanyLogin.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../App.css';
import "../index.css";

function CompanyLogin() {
  const [userId, setUserId] = useState('');
  const [businessNumber, setBusinessNumber] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    console.log('Token:', token); // 토큰 확인 로그
  
    if (!token) {
      console.log('No token found, redirecting to login');
      navigate("/login", { state: { fromCorporate: true } });
      return; // 토큰이 없으면 함수 종료
    }
  
    // 토큰이 있는 경우, 사용자 정보 요청
    axios.get('http://127.0.0.1:8000/api/current-user', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    })
    .then(response => {
        // 성공적인 응답 처리
        setUserId(response.data.username); 
    })
    .catch(error => {
        // 에러 처리
        console.error('Error fetching user data:', error);
        navigate("/login", { state: { fromCorporate: true } });
    });
  }, [navigate]);  
  
  
  const handleBusinessLogin = async (event) => {
    event.preventDefault();
    
    if (businessNumber.length !== 10) {
      alert("유효한 사업자 등록번호를 입력해주세요.");
      return;
    }

    try {
        // 사업자 등록번호 인증 API 요청
        await axios.post('http://127.0.0.1:8000/api/verify-business-number', {
          businessNumber: businessNumber
        }, {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
        // 성공 시 마이페이지로 리다이렉트
        navigate('/mypage');
      } catch (error) {
        console.error('사업자 인증 에러:', error);
        alert('사업자 인증에 실패했습니다. 다시 시도해 주세요.');
      }
  };

  return (
    <div className="min-h-screen overflow-y-auto max-h-screen p-4 flex flex-col items-center justify-center">
      <h2 className="text-4xl mb-4 scoreheavy-font">기업 로그인</h2>
      <p className="text-xl mb-2">환영합니다, {userId}</p>
      <p className="text-md mb-4">기업 로그인을 위해서는 사업자 등록번호를 입력해주셔야 합니다.</p>
      <form onSubmit={handleBusinessLogin} className="flex flex-col items-center">
        <input
          type="text"
          placeholder="사업자 등록번호"
          value={businessNumber}
          onChange={(e) => setBusinessNumber(e.target.value)}
          className="mb-4 px-4 py-2 border border-gray-600"
        />
        <button type="submit" className="scoreregular-font mb-4 px-6 py-2 border border-gray-600 border-solid hover:bg-[#018b63] hover:border-[#018b63] hover:text-white active:bg-[#016d53] transition duration-300 ease-in-out">
          인증
        </button>
      </form>
    </div>
  );
}

export default CompanyLogin;
