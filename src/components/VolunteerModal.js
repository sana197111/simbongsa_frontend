import React, { useState } from 'react';

function VolunteerModal({ isOpen, onClose, activity, onSave }) {
    const [formData, setFormData] = useState(activity || {
        title: '', description: '', location: '', startDate: '', endDate: '', applyStart: '', applyEnd: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({ ...prevState, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(formData);
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full">
            <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
                <h3 className="text-lg scoreregular-font mb-4">{activity ? '봉사활동 수정' : '봉사활동 추가'}</h3>
                <form onSubmit={handleSubmit}>
                    <label className="block text-sm scorelight-font">제목</label>
                    <input type="text" name="title" value={formData.title} onChange={handleChange} placeholder="제목" className="mb-2 p-1 w-full scorelight-font border rounded" />

                    <label className="block text-sm scorelight-font">설명</label>
                    <textarea name="description" value={formData.description} onChange={handleChange} placeholder="설명" className="mb-2 p-1 w-full scorelight-font border rounded" />

                    <label className="block text-sm scorelight-font">위치</label>
                    <input type="text" name="location" value={formData.location} onChange={handleChange} placeholder="위치" className="mb-2 p-1 w-full scorelight-font border rounded" />

                    <label className="block text-sm scorelight-font">봉사활동 기간</label>
                    <div className="flex space-x-2">
                        <input type="date" name="startDate" value={formData.startDate} onChange={handleChange} className="mb-2 p-1 border rounded" />
                        <input type="date" name="endDate" value={formData.endDate} onChange={handleChange} className="mb-2 p-1 border rounded" />
                    </div>

                    <label className="block text-sm scorelight-font">신청 기간</label>
                    <div className="flex space-x-2">
                        <input type="date" name="applyStart" value={formData.applyStart} onChange={handleChange} className="mb-2 p-1 border rounded" />
                        <input type="date" name="applyEnd" value={formData.applyEnd} onChange={handleChange} className="mb-2 p-1 border rounded" />
                    </div>

                    <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2">저장</button>
                    <button onClick={onClose} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">닫기</button>
                </form>
            </div>
        </div>
    );
}

export default VolunteerModal;