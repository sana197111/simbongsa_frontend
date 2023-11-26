import React from 'react';
import { Link } from 'react-router-dom';
import '../App.css';
import "../index.css";

const logoImage = `${process.env.PUBLIC_URL}/logo.png`;
// const mainImage = `${process.env.PUBLIC_URL}/mainimage.png`;

function Main() {
    return ( // style={{ backgroundColor: "#0f1211" }} style={{color: "#ffffff"}}
        <div className="min-h-screen overflow-y-auto max-h-screen p-4 flex flex-col items-center justify-center">
            <div className="absolute top-12" style={{ right: "20%" }}>
                <Link to="/company-login">
                    <button className="scoreregular-font text-sm py-1 px-3 border border-gray-600 border-solid hover:bg-[#018b63] hover:border-[#018b63] hover:text-white active:bg-[#016d53] transition duration-300 ease-in-out">
                        기업 담당자 로그인
                    </button>
                </Link>
            </div>
            <img src={logoImage} alt="Logo" className="mb-6 logo-image" />
            <h2 className="text-4xl mb-2 custom-font">심봉사</h2>
            <h2 className="text-xl mb-12 custom-font">심심할 때 봉사하는 사람들</h2>
            {/* <img src={mainImage} alt="Main" className="w-48 max-w-md main-image mb-4" /> */}
            <h1 className="text-2xl text-center mb-6 scoreheavy-font">
                나와 어울리는 봉사활동 테스트
            </h1>
            <Link to="/mbtitest">
                <button className="scoreregular-font mt-8 mb-4 px-6 py-2 border border-gray-600 border-solid hover:bg-[#018b63] hover:border-[#018b63] hover:text-white active:bg-[#016d53] transition duration-300 ease-in-out">
                    테스트 시작하기
                </button>
            </Link>
            <Link to="/login">
                <p className="scorelight-font hover:text-[#018b63] transition duration-300 ease-in-out cursor-pointer">
                    나의 신청 현황 보러가기
                </p>
            </Link>
        </div>
    );
}

export default Main;
