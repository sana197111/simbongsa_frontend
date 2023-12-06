import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function VolunteerList() {
    const navigate = useNavigate();
    const [volunteerActivities, setVolunteerActivities] = useState([]); // 봉사활동 목록 상태 추가

    useEffect(() => {
        // 봉사활동 목록 불러오기
        axios.get('http://127.0.0.1:8000/volunteerlist') // API 경로 수정
            .then(response => {
                // 성공적으로 데이터를 받아오면 상태 업데이트
                setVolunteerActivities(response.data);
            })
            .catch(error => {
                console.error("봉사활동 목록을 불러오는 데 실패했습니다:", error);
            });
    }, []); // 의존성 배열을 빈 배열로 설정하여 컴포넌트 마운트 시에만 실행

    const goBack = () => {
        navigate(-1); // 뒤로 이동
    };

    return (
    <div className="min-h-screen overflow-y-auto p-4 flex flex-col items-center justify-center">
        <h2 className="text-4xl mt-12 mb-12 scoreheavy-font">봉사활동 목록</h2>  
        <div className="w-full max-w-2xl flex flex-col items-center">
        {volunteerActivities.map((activity, index) => (
            <Link to={`/volunteer/${activity.event_id}`} key={index} className="w-full">
            <div className="mb-4 p-4 border border-gray-200 rounded-lg w-full hover:bg-gray-100 active:bg-gray-200 transition duration-300 ease-in-out">
                <h3 className="text-lg font-semibold mb-1 truncate">{activity.title}</h3>
                <p className="text-sm mb-2 truncate">{activity.description.length > 30 ? `${activity.description.substring(0, 70)}...` : activity.description}</p>
                <p className="text-xs mb-1 truncate">위치: {activity.location}</p>
                <p className="text-xs mb-1 truncate">봉사 기간: {activity.vol_start.substring(0, 10)} ~ {activity.vol_end.substring(0, 10)}</p>
                <p className="text-xs truncate">신청 기간: {activity.apply_start.substring(0, 10)} ~ {activity.apply_end.substring(0, 10)}</p>
            </div>
            </Link>
        ))}
        <button onClick={goBack} className="bg-gray-200 hover:bg-gray-300 text-black font-bold py-2 px-4 rounded mb-4 transition duration-300 ease-in-out">
            뒤로가기
        </button>
        </div>
    </div>
    );
}

export default VolunteerList;
