// MbtiTest.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import questions from './questions'; // questions.js에서 질문들을 임포트
import Result from './Result'; // 결과를 보여줄 Result 컴포넌트 임포트
import '../App.css';
import "../index.css";

function MbtiTest() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({ E: 0, I: 0, N: 0, S: 0, T: 0, F: 0, J: 0, P: 0 });
  const [resultType, setResultType] = useState(null); // 결과 MBTI 유형을 저장할 상태
  const navigate = useNavigate();
  const handleOptionSelect = (type) => {
    setAnswers(prev => ({ ...prev, [type]: prev[type] + 1 }));
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    } else {
      calculateResult();
    }
  };

  const calculateResult = () => {
    // MBTI 유형별 점수에 따라 문자를 선택합니다.
    const mbtiType = [
      answers.E >= answers.I ? 'E' : 'I',
      answers.N >= answers.S ? 'N' : 'S',
      answers.T >= answers.F ? 'T' : 'F',
      answers.J >= answers.P ? 'J' : 'P',
    ].join('');
  
    console.log("Calculated MBTI Type:", mbtiType);
    setResultType(mbtiType);
    navigate(`/mbtitest/${mbtiType.toLowerCase()}`);
  };  

  const progress = (currentQuestion + 1) / questions.length * 100;

  return (
<div className="min-h-screen overflow-y-auto max-h-screen p-4 flex flex-col items-center justify-center">
  {resultType ? (
    <Result type={resultType} />
  ) : (
    <>
      <div className="w-96 mb-8 bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
        <div className="bg-[#018b63] h-2.5 rounded-full" style={{ width: `${progress}%` }}></div>
      </div>
      <h1 className="scoreheavy-font text-2xl text-center my-6">{questions[currentQuestion].title}</h1>
      <div className="flex flex-col items-center justify-center">
        {questions[currentQuestion].options.map((option, index) => (
          <button 
            key={index} 
            onClick={() => handleOptionSelect(option.type)}
            className="scoreregular-font mt-4 mb-4 px-6 py-2 border border-gray-600 border-solid hover:bg-[#018b63] hover:border-[#018b63] hover:text-white active:bg-[#016d53] transition duration-300 ease-in-out"
          >
            {option.text}
          </button>
        ))}
      </div>
    </>
  )}
</div>
  );
}

export default MbtiTest;
