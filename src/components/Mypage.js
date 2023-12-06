import React, { useState, useEffect } from 'react';
import { useNavigate, Link, useParams } from 'react-router-dom';
import axios from 'axios';
import VolunteerModal from './VolunteerModal';

const logoImage = `${process.env.PUBLIC_URL}/logo.png`;

// Axios 설정에 CSRF 토큰을 포함
axios.defaults.xsrfHeaderName = 'X-CSRFToken';
axios.defaults.xsrfCookieName = 'csrftoken';

function MyPage() {
    const navigate = useNavigate();
    const [currentTab, setCurrentTab] = useState('personal');
    const [personalStatus, setPersonalStatus] = useState('applied'); // 'applied' 또는 'completed'
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedActivity, setSelectedActivity] = useState(null);
    const [pastEvents, setPastEvents] = useState([]);
    const [upcomingEvents, setUpcomingEvents] = useState([]);
    const [corporateEvents, setCorporateEvents] = useState([]);
    const { event_id } = useParams();

    useEffect(() => {
        if (currentTab === 'corporate') {
            fetchCorporateEvents();
        }
    }, [currentTab]);

    useEffect(() => {
        axios.get('http://127.0.0.1:8000/api/mypage/', {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
        .then(response => {
            // past_events와 upcoming_events를 분리하여 상태 설정
            setPastEvents(response.data.past_events);
            setUpcomingEvents(response.data.upcoming_events);
        })
        .catch(error => {
            console.error("봉사활동 목록을 불러오는 데 실패했습니다:", error);
        });
    }, []);

    const fetchCorporateEvents = () => {
        axios.get('http://127.0.0.1:8000/mypage/org/', {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
        .then(response => {
            setCorporateEvents(response.data);
        })
        .catch(error => {
            console.error("기업 봉사활동 목록을 불러오는 데 실패했습니다:", error);
        });
    };

    // 탭 변경 핸들러 수정
    const handleTabChange = (tabName) => {
        setCurrentTab(tabName);
        if (tabName === 'corporate') {
            fetchCorporateEvents();
        }
    };

    const handleButtonClick = (event, title, type) => {
        event.stopPropagation(); // 이벤트 전파 중단

        if (type === 'cancel') {
            console.log("신청 취소 처리:", title);
            // 신청 취소 로직 추가
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
        const event = corporateEvents.find(a => a.title === title);
        setSelectedActivity(event);
        setIsModalOpen(true);
        console.log("봉사활동 수정:", title);
    };
    
    // VolunteerModal의 '저장' 버튼 클릭 이벤트 핸들러
    const handleModalSave = (formData) => {
        // 새로운 봉사활동인 경우
        if (!selectedActivity) {
            axios.post('http://127.0.0.1:8000/api/upload_event', formData)
                .then(response => {
                    // 성공 처리
                    console.log("봉사활동 추가 성공:", response.data);
                })
                .catch(error => {
                    console.error("봉사활동 추가 실패:", error);
                });
        } else {
            // 봉사활동 수정인 경우
            axios.put(`http://127.0.0.1:8000/volunteer/${event_id}`, formData)
                .then(response => {
                    // 성공 처리
                    console.log("봉사활동 수정 성공:", response.data);
                })
                .catch(error => {
                    console.error("봉사활동 수정 실패:", error);
                });
        }

        setIsModalOpen(false);
    };


    // 삭제 버튼 클릭 이벤트 핸들러
    const handleDeleteVolunteerActivity = (title) => {
        if (window.confirm("정말 삭제하시겠습니까?")) {
            const event = corporateEvents.find(a => a.title === title);
            axios.delete(`http://127.0.0.1:8000/volunteer/${event_id}`)
                .then(response => {
                    // 성공 처리
                    console.log("봉사활동 삭제 성공");
                })
                .catch(error => {
                    console.error("봉사활동 삭제 실패:", error);
                });
        }
    };

    
    const handleModalClose = () => {
        setIsModalOpen(false);
    };

    
    // 로그아웃 함수
    const handleLogout = async () => {
        try {
            await axios.post('http://127.0.0.1:8000/logout');
            localStorage.removeItem('token');
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
                <button onClick={() => handleTabChange('personal')} className="block w-full text-left py-2 hover:bg-gray-100 scoreregular-font rounded">
                    개인 봉사 현황
                </button>
                <button onClick={() => handleTabChange('corporate')} className="block w-full text-left py-2 hover:bg-gray-100 scoreregular-font rounded">
                    기업 봉사 현황
                </button>
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
                                {pastEvents.map((event, index) => (
                                    <div key={index} className="mb-4 p-4 border border-gray-200 rounded-lg w-full hover:bg-gray-100 active:bg-gray-200 transition duration-300 ease-in-out">
                                    <Link to={`/volunteer/${event.event_id}`} key={index} className="block mb-4">
                                        <h3 className="text-lg font-semibold mb-1 scoreregular-font truncate">{event.title}</h3>                                            
                                        <p className="text-sm mb-2 scorelight-font truncate">{event.description && event.description.length > 30 ? `${event.description.substring(0, 70)}...` : event.description}</p>
                                        <p className="text-xs mb-1 scorelight-font truncate">위치: {event.location}</p>
                                        <p className="text-xs mb-1 scorelight-font truncate">봉사 기간: {event.vol_start ? event.vol_start.substring(0, 10) : '날짜 미정'} ~ {event.vol_end ? event.vol_end.substring(0, 10) : '날짜 미정'}</p>
                                        <p className="text-xs scorelight-font truncate">신청 기간: {event.apply_start ? event.apply_start.substring(0, 10) : '날짜 미정'} ~ {event.apply_end ? event.apply_end.substring(0, 10) : '날짜 미정'}</p>
                                    </Link>
                                    <button 
                                        onClick={(e) => handleButtonClick(e, event.title, 'cancel')}
                                        className="bg-red-500 hover:bg-red-700 scorelight-font text-white font-bold py-2 px-4 rounded mr-2"
                                    >
                                        신청 취소
                                    </button>
                                    <span className="scorelight-font">{event.status}</span>
                                </div>
                                ))}
                            </div>
                        ) : (
                            <div>
                                {upcomingEvents.map((activity, index) => (
                                    <div key={index} className="mb-4 p-4 border border-gray-200 rounded-lg w-full hover:bg-gray-100 active:bg-gray-200 transition duration-300 ease-in-out">
                                    <Link to={`/volunteer/${activity.event_id}`} key={index} className="block mb-4">
                                        <h3 className="text-lg font-semibold mb-1 scoreregular-font truncate">{activity.title}</h3>
                                        <p className="text-sm mb-2 scorelight-font truncate">{activity.description && activity.description.length > 30 ? `${activity.description.substring(0, 70)}...` : activity.description}</p>
                                        <p className="text-xs mb-1 scorelight-font truncate">위치: {activity.location}</p>
                                        <p className="text-xs mb-1 scorelight-font truncate">봉사 기간: {activity.vol_start ? activity.vol_start.substring(0, 10) : '날짜 미정'} ~ {activity.vol_end ? activity.vol_end.substring(0, 10) : '날짜 미정'}</p>
                                        <p className="text-xs scorelight-font truncate">신청 기간: {activity.apply_start ? activity.apply_start.substring(0, 10) : '날짜 미정'} ~ {activity.apply_end ? activity.apply_end.substring(0, 10) : '날짜 미정'}</p>
                                    </Link>
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
                        {corporateEvents.map((activity, index) => (
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
                                <button 
                                onClick={(e) => handleDeleteVolunteerActivity(activity.title)}
                                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded ml-2"
                                >
                                    삭제
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
        </div>
    );
}

export default MyPage;