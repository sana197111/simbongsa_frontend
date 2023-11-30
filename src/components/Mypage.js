import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import VolunteerModal from './VolunteerModal';
import ReviewModal from './ReviewModal';

const logoImage = `${process.env.PUBLIC_URL}/logo.png`;

// Axios 설정에 CSRF 토큰을 포함
axios.defaults.xsrfHeaderName = 'X-CSRFToken';
axios.defaults.xsrfCookieName = 'csrftoken';

const volunteerActivities = [
    { title: "환경 정화 활동", description: "해변가와 공원을 청소하는 봉사활동입니다. 자연을 사랑하는 분들에게 추천드려요.", location: "서울시 강남구", startDate: "2023-12-01", endDate: "2023-12-31", applyStart: "2023-11-01", applyEnd: "2023-11-20", status: "수락됨" },
    { title: "도서관 정리 봉사", description: "지역 도서관의 책 정리 및 관리를 돕는 봉사활동입니다. 책과 도서관을 사랑하는 분들께 좋습니다.", location: "부산시 해운대구", startDate: "2023-11-15", endDate: "2023-11-30", applyStart: "2023-10-20", applyEnd: "2023-11-10", status: "수락됨" },
    { title: "노인 복지관 도우미", description: "노인 복지관에서 어르신들의 일상생활을 돕는 활동입니다. 봉사 정신이 투철한 분들께 추천합니다.", location: "대구시 수성구", startDate: "2023-12-05", endDate: "2024-01-05", applyStart: "2023-11-10", applyEnd: "2023-11-30", status: "수락됨" },
    { title: "유기동물 보호 활동", description: "유기동물 보호소에서 동물들을 돌보는 활동입니다. 동물을 사랑하는 마음이 있는 분들께 좋습니다.", location: "인천시 남동구", startDate: "2023-11-01", endDate: "2023-11-30", applyStart: "2023-10-15", applyEnd: "2023-10-25", status: "거절됨" },
    { title: "어린이 교육 지원", description: "지역 아동센터에서 어린이들의 학습을 지원하는 활동입니다. 교육에 관심이 많은 분들에게 추천합니다.", location: "광주시 서구", startDate: "2023-10-20", endDate: "2023-11-20", applyStart: "2023-10-01", applyEnd: "2023-10-15", status: "수락됨" },
    { title: "푸드뱅크 식품 정리", description: "푸드뱅크에서 기부받은 식품을 분류하고 정리하는 활동입니다. 식품 뱅크 운영에 기여하고 싶은 분들께 추천합니다.", location: "대전시 중구", startDate: "2023-12-10", endDate: "2023-12-25", applyStart: "2023-11-20", applyEnd: "2023-12-05", status: "수락됨" },
    { title: "공원 녹화 활동", description: "지역 공원에서 식물 심기 및 관리를 돕는 활동입니다. 환경 보호에 기여하고 싶은 분들께 추천합니다.", location: "울산시 남구", startDate: "2023-11-05", endDate: "2023-11-19", applyStart: "2023-10-20", applyEnd: "2023-11-03", status: "거절됨" }
];

function MyPage() {
    const navigate = useNavigate();
    const [currentTab, setCurrentTab] = useState('personal');
    const [personalStatus, setPersonalStatus] = useState('applied'); // 'applied' 또는 'completed'
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedActivity, setSelectedActivity] = useState(null);
    const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
    const [selectedReviewActivity, setSelectedReviewActivity] = useState(null);

    const handleButtonClick = (event, title, type) => {
        event.stopPropagation(); // 이벤트 전파 중단

        if (type === 'cancel') {
            console.log("신청 취소 처리:", title);
            // 신청 취소 로직 추가
        } else if (type === 'review') {
            console.log("후기 입력 페이지로 이동:", title);
            // 후기 입력 페이지로 이동
        } else if (type === 'applications') {
            console.log("신청 현황 페이지로 이동:", title);
            navigate(`/volunteer/${title}/applications`);
        }
    };
    
    const handleAddVolunteerActivity = () => {
        setSelectedActivity(null);
        setIsModalOpen(true);
        console.log("봉사활동 추가");
    };
    
    const handleEditVolunteerActivity = (title) => {
        const activity = volunteerActivities.find(a => a.title === title);
        setSelectedActivity(activity);
        setIsModalOpen(true);
        console.log("봉사활동 수정:", title);
    };
    
    // VolunteerModal의 '저장' 버튼 클릭 이벤트 핸들러
    const handleModalSave = (formData) => {
        console.log("저장된 봉사활동 데이터:", formData);
        setIsModalOpen(false);
        // 여기에 formData를 사용하여 봉사활동 추가 또는 수정 로직을 구현
    };

    // ReviewModal의 '저장' 버튼 클릭 이벤트 핸들러
    const handleSaveReview = (reviewData) => {
        console.log("저장된 리뷰 데이터:", reviewData);
        setIsReviewModalOpen(false);
        // 리뷰 저장 로직 구현
    };
    
    const handleModalClose = () => {
        setIsModalOpen(false);
    };

    // 후기 입력 버튼 클릭 핸들러
    const handleReviewButtonClick = (activity) => {
        setSelectedReviewActivity(activity);
        setIsReviewModalOpen(true);
    };

    
    // 로그아웃 함수
    const handleLogout = async () => {
        try {
            await axios.post('http://127.0.0.1:8000/logout/');
            // 로그아웃 성공 후 홈페이지로 리다이렉트
            navigate('/');
        } catch (error) {
            console.error('로그아웃 에러:', error);
            alert('로그아웃에 실패했습니다. 다시 시도해 주세요.');
        }
    };

    return (
        <div className="min-h-screen overflow-y-auto max-h-screen p-4 flex">
            <div className="w-1/4 p-4 border-r border-gray-300">
                <button 
                    onClick={handleLogout}
                    className="bg-red-500 hover:bg-red-700 text-white scorelight-font font-bold py-2 px-4 rounded"
                >
                    로그아웃
                </button>
                <button onClick={() => setCurrentTab('personal')} className="block w-full text-left py-2 hover:bg-gray-100 scoreregular-font rounded">개인 봉사 현황</button>
                <button onClick={() => setCurrentTab('corporate')} className="block w-full text-left py-2 hover:bg-gray-100 scoreregular-font rounded">기업 봉사 현황</button>
            </div>
            <div className="w-3/4 p-4">
                <Link to="/">
                    <img src={logoImage} alt="Logo" className="mb-6 logo-image" />
                </Link>
                {currentTab === 'personal' && (
                    <div>
                        <h1 className="text-4xl scoreheavy-font mt-12 mb-12">개인 봉사 현황</h1>
                        <div className="flex mb-4">
                            <label className="flex scorelight-font items-center mr-4">
                                <input type="radio" name="personalStatus" value="applied" checked={personalStatus === 'applied'} onChange={() => setPersonalStatus('applied')} className="mr-2 scorelight-font" />
                                신청
                            </label>
                            <label className="flex scorelight-font items-center">
                                <input type="radio" name="personalStatus" value="completed" checked={personalStatus === 'completed'} onChange={() => setPersonalStatus('completed')} className="mr-2 scorelight-font" />
                                완료
                            </label>
                        </div>
                        {personalStatus === 'applied' ? (
                            <div>
                                {volunteerActivities.map((activity, index) => (
                                    <div key={index} className="mb-4 p-4 border border-gray-200 rounded-lg w-full hover:bg-gray-100 active:bg-gray-200 transition duration-300 ease-in-out">
                                        <Link to={`/volunteer/${activity.title}`} className="block mb-4">
                                            <h3 className="text-lg font-semibold mb-1 scoreregular-font truncate">{activity.title}</h3>                                            
                                            <p className="text-sm mb-2 scorelight-font truncate">{activity.description.length > 30 ? `${activity.description.substring(0, 70)}...` : activity.description}</p>
                                            <p className="text-xs mb-1 scorelight-font truncate">위치: {activity.location}</p>
                                            <p className="text-xs mb-1 scorelight-font truncate">봉사 기간: {activity.startDate} ~ {activity.endDate}</p>
                                            <p className="text-xs scorelight-font truncate">신청 기간: {activity.applyStart} ~ {activity.applyEnd}</p>
                                        </Link>
                                        <button 
                                            onClick={(e) => handleButtonClick(e, activity.title, 'cancel')}
                                            className="bg-red-500 hover:bg-red-700 scorelight-font text-white font-bold py-2 px-4 rounded mr-2"
                                        >
                                            신청 취소
                                        </button>
                                        <span className="scorelight-font">{activity.status}</span>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div>
                                {volunteerActivities.map((activity, index) => (
                                    <div key={index} className="mb-4 p-4 border border-gray-200 rounded-lg w-full hover:bg-gray-100 active:bg-gray-200 transition duration-300 ease-in-out">
                                        <Link to={`/volunteer/${activity.title}`} className="block mb-4">
                                            <h3 className="text-lg font-semibold mb-1 scoreregular-font truncate">{activity.title}</h3>
                                            <p className="text-sm mb-2 scorelight-font truncate">{activity.description.length > 30 ? `${activity.description.substring(0, 70)}...` : activity.description}</p>
                                            <p className="text-xs mb-1 scorelight-font truncate">위치: {activity.location}</p>
                                            <p className="text-xs mb-1 scorelight-font truncate">봉사 기간: {activity.startDate} ~ {activity.endDate}</p>
                                            <p className="text-xs scorelight-font truncate">신청 기간: {activity.applyStart} ~ {activity.applyEnd}</p>
                                        </Link>
                                        <button 
                                            onClick={handleReviewButtonClick}
                                            className="bg-blue-500 hover:bg-blue-700 text-white scorelight-font font-bold py-2 px-4 rounded"
                                        >
                                            후기 입력
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                )}
                {currentTab === 'corporate' && (
                    <div>
                        <div className="flex justify-between items-center mb-4">
                            <h1 className="text-4xl scoreheavy-font">기업 봉사 현황</h1>
                            <button 
                                onClick={handleAddVolunteerActivity}
                                className="bg-blue-500 scorelight-font hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                            >
                                봉사활동 추가
                            </button>
                        </div>
                        {volunteerActivities.map((activity, index) => (
                            <div key={index} className="mb-4 p-4 border border-gray-200 rounded-lg w-full hover:bg-gray-100 active:bg-gray-200 transition duration-300 ease-in-out">
                                <Link to={`/volunteer/${activity.title}`} className="block mb-4">
                                    <h3 className="text-lg font-semibold mb-1 scoreregular-font truncate">{activity.title}</h3>
                                    <p className="text-sm mb-2 scorelight-font truncate">{activity.description.length > 30 ? `${activity.description.substring(0, 70)}...` : activity.description}</p>
                                    <p className="text-xs mb-1 scorelight-font truncate">위치: {activity.location}</p>
                                    <p className="text-xs mb-1 scorelight-font truncate">봉사 기간: {activity.startDate} ~ {activity.endDate}</p>
                                    <p className="text-xs scorelight-font truncate">신청 기간: {activity.applyStart} ~ {activity.applyEnd}</p>
                                </Link>
                                <button 
                                    onClick={(e) => handleButtonClick(e, activity.title, 'applications')}
                                    className="bg-green-500 scorelight-font hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                                >
                                    신청 현황
                                </button>
                                <button 
                                        onClick={(e) => handleEditVolunteerActivity(e, activity.title)}
                                        className="bg-yellow-700 scorelight-font hover:bg-yellow-400 text-white ml-4 font-bold py-2 px-4 rounded"
                                    >
                                        수정
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </div>
            <VolunteerModal 
                isOpen={isModalOpen} 
                onClose={handleModalClose} 
                activity={selectedActivity} 
                onSave={handleModalSave} // 수정된 handleModalSave 함수 사용
            />
            <ReviewModal 
                isOpen={isReviewModalOpen} 
                onClose={() => setIsReviewModalOpen(false)} 
                activity={selectedReviewActivity} 
                onSaveReview={handleSaveReview} // 기존 handleSaveReview 함수 사용
            />
        </div>
    );
}

export default MyPage;