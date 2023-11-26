// Result.js
import React from 'react';
import { useParams } from 'react-router-dom';
import mbtiTypes from './mbtiTypes';
import { Link } from 'react-router-dom';

function Result() {
  const { type } = useParams();
  const result = mbtiTypes.find(mbti => mbti.type === type.toUpperCase());
  
  const volunteerActivities = [
    { title: "환경 정화 활동", description: "해변가와 공원을 청소하는 봉사활동입니다. 자연을 사랑하는 분들에게 추천드려요.", location: "서울시 강남구", startDate: "2023-12-01", endDate: "2023-12-31", applyStart: "2023-11-01", applyEnd: "2023-11-20" },
    { title: "도서관 정리 봉사", description: "지역 도서관의 책 정리 및 관리를 돕는 봉사활동입니다. 책과 도서관을 사랑하는 분들께 좋습니다.", location: "부산시 해운대구", startDate: "2023-11-15", endDate: "2023-11-30", applyStart: "2023-10-20", applyEnd: "2023-11-10" },
    { title: "노인 복지관 도우미", description: "노인 복지관에서 어르신들의 일상생활을 돕는 활동입니다. 봉사 정신이 투철한 분들께 추천합니다.", location: "대구시 수성구", startDate: "2023-12-05", endDate: "2024-01-05", applyStart: "2023-11-10", applyEnd: "2023-11-30" },
    { title: "유기동물 보호 활동", description: "유기동물 보호소에서 동물들을 돌보는 활동입니다. 동물을 사랑하는 마음이 있는 분들께 좋습니다.", location: "인천시 남동구", startDate: "2023-11-01", endDate: "2023-11-30", applyStart: "2023-10-15", applyEnd: "2023-10-25" },
    { title: "어린이 교육 지원", description: "지역 아동센터에서 어린이들의 학습을 지원하는 활동입니다. 교육에 관심이 많은 분들에게 추천합니다.", location: "광주시 서구", startDate: "2023-10-20", endDate: "2023-11-20", applyStart: "2023-10-01", applyEnd: "2023-10-15" },
    { title: "푸드뱅크 식품 정리", description: "푸드뱅크에서 기부받은 식품을 분류하고 정리하는 활동입니다. 식품 뱅크 운영에 기여하고 싶은 분들께 추천합니다.", location: "대전시 중구", startDate: "2023-12-10", endDate: "2023-12-25", applyStart: "2023-11-20", applyEnd: "2023-12-05" },
    { title: "공원 녹화 활동", description: "지역 공원에서 식물 심기 및 관리를 돕는 활동입니다. 환경 보호에 기여하고 싶은 분들께 추천합니다.", location: "울산시 남구", startDate: "2023-11-05", endDate: "2023-11-19", applyStart: "2023-10-20", applyEnd: "2023-11-03" }
  ];
  
  return (
    <div className="min-h-screen overflow-y-auto p-4 flex flex-col items-center justify-center">
      <h2 className="text-4xl mt-12 mb-12 scoreheavy-font">{result?.nickname}</h2>
      <p className="text-xl mb-12 scoreregular-font">{result?.description}</p>
      <p className="text-lg mb-2 scorelight-font">추천 봉사활동</p>
      <p className="text-lg mb-8 scorelight-font">{result?.activities}</p>
      <div className="w-full max-w-2xl flex flex-col items-center">
        {volunteerActivities.slice(0, 5).map((activity, index) => (
          <Link to={`/volunteer/${activity.title}`} key={index} className="w-full">
            <div className="mb-4 p-4 border border-gray-200 rounded-lg w-full hover:bg-gray-100 active:bg-gray-200 transition duration-300 ease-in-out">
              <h3 className="text-lg font-semibold mb-1 scoreregular-font truncate">{activity.title}</h3>
              <p className="text-sm mb-2 scorelight-font truncate">{activity.description.length > 30 ? `${activity.description.substring(0, 70)}...` : activity.description}</p>
              <p className="text-xs mb-1 scorelight-font truncate">위치: {activity.location}</p>
              <p className="text-xs mb-1 scorelight-font truncate">봉사 기간: {activity.startDate} ~ {activity.endDate}</p>
              <p className="text-xs scorelight-font truncate">신청 기간: {activity.applyStart} ~ {activity.applyEnd}</p>
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
