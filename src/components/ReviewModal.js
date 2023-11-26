import React, { useState } from 'react';

function ReviewModal({ isOpen, onClose, activity, onSaveReview }) {
    const [rating, setRating] = useState(0);
    const [reviewText, setReviewText] = useState('');

    const handleRating = (newRating) => {
        setRating(newRating);
    };

    const handleReviewChange = (e) => {
        setReviewText(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSaveReview({ rating, reviewText, activityTitle: activity.title });
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full">
            <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
                <h3 className="text-lg scoreregular-font mb-4">후기 입력</h3>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        {[0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5].map((star, index) => (
                            <button 
                                key={index} 
                                onClick={() => handleRating(star)} 
                                className={`hover:text-yellow-500 ${star <= rating ? 'text-yellow-500' : 'text-gray-300'}`}
                            >
                                {star % 1 === 0 ? '★' : '☆'}
                            </button>
                        ))}
                    </div>
                    <textarea 
                        name="reviewText" 
                        value={reviewText} 
                        onChange={handleReviewChange} 
                        placeholder="후기 작성" 
                        className="mb-4 p-1 w-full scorelight-font border rounded h-24"
                    />
                    <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2">저장</button>
                    <button onClick={onClose} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">닫기</button>
                </form>
            </div>
        </div>
    );
}

export default ReviewModal;
