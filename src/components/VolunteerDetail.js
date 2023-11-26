// VolunteerDetail.js
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';

// 임시 데이터 (실제 어플리케이션에서는 API 호출 또는 상태 관리 시스템을 통해 데이터를 불러올 것입니다)
const volunteerActivities = [
    { title: "환경 정화 활동", description: "해변가와 공원을 청소하는 봉사활동입니다. 자연을 사랑하는 분들에게 추천드려요.", location: "서울시 강남구", startDate: "2023-12-01", endDate: "2023-12-31", applyStart: "2023-11-01", applyEnd: "2023-11-20" },
    { title: "도서관 정리 봉사", description: "지역 도서관의 책 정리 및 관리를 돕는 봉사활동입니다. 책과 도서관을 사랑하는 분들께 좋습니다.", location: "부산시 해운대구", startDate: "2023-11-15", endDate: "2023-11-30", applyStart: "2023-10-20", applyEnd: "2023-11-10" },
    { title: "노인 복지관 도우미", description: "노인 복지관에서 어르신들의 일상생활을 돕는 활동입니다. 봉사 정신이 투철한 분들께 추천합니다.", location: "대구시 수성구", startDate: "2023-12-05", endDate: "2024-01-05", applyStart: "2023-11-10", applyEnd: "2023-11-30" },
    { title: "유기동물 보호 활동", description: "유기동물 보호소에서 동물들을 돌보는 활동입니다. 동물을 사랑하는 마음이 있는 분들께 좋습니다.", location: "인천시 남동구", startDate: "2023-11-01", endDate: "2023-11-30", applyStart: "2023-10-15", applyEnd: "2023-10-25" },
    { title: "어린이 교육 지원", description: "지역 아동센터에서 어린이들의 학습을 지원하는 활동입니다. 교육에 관심이 많은 분들에게 추천합니다.", location: "광주시 서구", startDate: "2023-10-20", endDate: "2023-11-20", applyStart: "2023-10-01", applyEnd: "2023-10-15" },
    { title: "푸드뱅크 식품 정리", description: "푸드뱅크에서 기부받은 식품을 분류하고 정리하는 활동입니다. 식품 뱅크 운영에 기여하고 싶은 분들께 추천합니다.", location: "대전시 중구", startDate: "2023-12-10", endDate: "2023-12-25", applyStart: "2023-11-20", applyEnd: "2023-12-05" },
    { title: "공원 녹화 활동", description: "지역 공원에서 식물 심기 및 관리를 돕는 활동입니다. 환경 보호에 기여하고 싶은 분들께 추천합니다.", location: "울산시 남구", startDate: "2023-11-05", endDate: "2023-11-19", applyStart: "2023-10-20", applyEnd: "2023-11-03" }
];

function VolunteerDetail() {
    const navigate = useNavigate();
    const { title } = useParams();
    const activity = volunteerActivities.find(activity => activity.title === title);

    if (!activity) {
        return <div className="text-center py-10">봉사활동을 찾을 수 없습니다.</div>;
    }

    const goBack = () => {
        navigate(-1); // 뒤로 이동
    };

    const handleApply = () => {
            // 신청 처리 로직
            alert('신청되었습니다. 마이페이지에서 확인하세요.');
            navigate('/mypage'); // 가정된 마이페이지 경로
    };

    return (
        <div className="min-h-screen overflow-y-auto max-h-screen p-4 flex flex-col items-center justify-center">
            <h1 className="text-4xl scoreheavy-font mt-12 mb-12">{activity.title}</h1>
            <p className="text-lg scorelight-font mb-2"><strong>위치:</strong> {activity.location}</p>
            <p className="text-lg scorelight-font mb-2"><strong>봉사 기간:</strong> {activity.startDate} ~ {activity.endDate}</p>
            <p className="text-lg scorelight-font mb-12"><strong>신청 기간:</strong> {activity.applyStart} ~ {activity.applyEnd}</p>
            <p className="text-xl scoreregular-font mb-8">{activity.description}</p>
            <button onClick={handleApply} className="inline-block mb-4 bg-[#018b63] hover:bg-[#016d53] text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out">
                신청하기
            </button>
            <button onClick={goBack} className="bg-gray-200 hover:bg-gray-300 text-black font-bold py-2 px-4 rounded mb-4 transition duration-300 ease-in-out">
                뒤로가기
            </button>
        </div>
    );
}

export default VolunteerDetail;
