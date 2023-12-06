// VolunteerDetail.js
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

function VolunteerDetail() {
    const navigate = useNavigate();
    const { event_id } = useParams();
    const [activity, setActivity] = useState(null);

    useEffect(() => {
        axios.get(`http://127.0.0.1:8000/volunteer/${event_id}`)
            .then(response => {
                setActivity(response.data);
            })
            .catch(error => {
                console.error("봉사활동 정보를 불러오는 데 실패했습니다:", error);
            });
    }, [event_id]);

    if (!activity) {
        return <div className="text-center py-10">봉사활동을 찾을 수 없습니다.</div>;
    }

    const goBack = () => {
        navigate(-1); // 뒤로 이동
    };

    const handleApply = () => {
        // 사용자가 로그인한 상태인지 확인
        if (!localStorage.getItem('token')) {
            // 로그인되지 않은 경우, 로그인 페이지로 이동
            navigate('/login'); // 가정된 로그인 페이지 경로
            return;
        }
    
        axios.post(`http://127.0.0.1:8000/event/${event_id}/apply`, {}, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
        .then(response => {
            if (response.status === 201) {
                alert('신청되었습니다. 마이페이지에서 확인하세요.');
                navigate('/mypage'); 
            } else if (response.status === 208) {
                alert('이미 신청되었습니다.');
            } else {
                alert('신청 실패: ' + response.data.error);
            }
        })
        .catch(error => {
            console.error("봉사활동 신청 중 오류 발생:", error);
            alert('봉사활동 신청 중 오류 발생');
        });
    };
    

    return (
        <div className="min-h-screen overflow-y-auto max-h-screen p-4 flex flex-col items-center justify-center">
            <h1 className="text-4xl scoreheavy-font mt-12 mb-12">{activity.title}</h1>
            <p className="text-lg scorelight-font mb-2"><strong>위치:</strong> {activity.location}</p>
            <p className="text-s scorelight-font mb-2 truncate"><strong>봉사 기간:</strong> {activity.vol_start.substring(0, 10)} ~ {activity.vol_end.substring(0, 10)}</p>
            <p className="text-s scorelight-font mb-8 truncate"><strong>신청 기간:</strong> {activity.apply_start.substring(0, 10)} ~ {activity.apply_end.substring(0, 10)}</p>
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
