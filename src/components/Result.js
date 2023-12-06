// Result.js
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import mbtiTypes from './mbtiTypes';

function Result() {
  const { type } = useParams();
  const result = mbtiTypes.find(mbti => mbti.type === type.toUpperCase());
  const [volunteerActivities, setVolunteerActivities] = useState([]); // 봉사활동 목록 상태 추가

  useEffect(() => {
    // MBTI 타입에 따른 봉사활동 목록 불러오기
    const mbtiType = type.toUpperCase(); // URL 파라미터에서 가져온 MBTI 타입
    axios.get(`http://127.0.0.1:8000/volunteerlist/${mbtiType}`)
        .then(response => {
            setVolunteerActivities(response.data);
        })
        .catch(error => {
            console.error("봉사활동 목록을 불러오는 데 실패했습니다:", error);
        });
  }, [type]); // 의존성 배열에 type 추가

  return (
    <div className="min-h-screen overflow-y-auto p-4 flex flex-col items-center justify-center">
      <h2 className="text-4xl mt-12 mb-12 scoreheavy-font">{result?.nickname}</h2>
      <p className="text-xl mb-12 scoreregular-font">{result?.description}</p>
      <p className="text-lg mb-2 scorelight-font">추천 봉사활동</p>
      <p className="text-lg mb-8 scorelight-font">{result?.activities}</p>
      <div className="w-full max-w-2xl flex flex-col items-center">
        {volunteerActivities.slice(0, 5).map((activity, index) => (
          <Link to={`/volunteer/${activity.event_id}`} key={index} className="w-full">
            <div className="mb-4 p-4 border border-gray-200 rounded-lg w-full hover:bg-gray-100 active:bg-gray-200 transition duration-300 ease-in-out">
              <h3 className="text-lg font-semibold mb-1 scoreregular-font truncate">{activity.title}</h3>
              <p className="text-sm mb-2 scorelight-font truncate">{activity.description.length > 30 ? `${activity.description.substring(0, 70)}...` : activity.description}</p>
              <p className="text-xs mb-1 scorelight-font truncate">위치: {activity.location}</p>
              <p className="text-xs mb-1 truncate">봉사 기간: {activity.vol_start.substring(0, 10)} ~ {activity.vol_end.substring(0, 10)}</p>
              <p className="text-xs truncate">신청 기간: {activity.apply_start.substring(0, 10)} ~ {activity.apply_end.substring(0, 10)}</p>
            </div>
          </Link>
        ))}
        <Link to="/volunteerlist" className="text-center">
            <button className="scoreregular-font px-6 py-2 mt-4 mb-4 border border-gray-600 border-solid hover:bg-[#018b63] hover:border-[#018b63] hover:text-white active:bg-[#016d53] transition duration-300 ease-in-out">
            전체 봉사 목록 보러가기
            </button>
        </Link>
      </div>
    </div>
  );
}

export default Result;
