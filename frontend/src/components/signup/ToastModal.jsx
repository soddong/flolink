// import React from 'react';

// function ToastModal({ message, onClose }) {
//   return (
//     <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50">
//       <div className="bg-white p-5 rounded shadow-lg w-80 relative">
//         <button onClick={onClose} className="absolute top-2 right-2 text-2xl">&times;</button>
//         <p className="text-center text-gray-700 mb-4 font-bold">
//           문자로 전달받은<br />인증번호 6자리를 입력해주세요.
//         </p>
//         <div className="flex flex-col gap-3">
//           <input 
//             type="text" 
//             placeholder="인증번호" 
//             className="w-full p-2 border rounded focus:outline-none focus:border-pink-500"
//           />
//           <div className="flex justify-between items-center text-sm text-gray-600">
//             <span>2:55</span>
//             <button className="text-pink-500">재전송</button>
//           </div>
//           <button 
//             onClick={onClose} 
//             className="w-full bg-pink-500 text-white p-2 rounded">
//             확인
//           </button>
//         </div>
//         <p className="text-xs text-center text-gray-500 mt-3">
//           인증번호가 오지 않는다면 여기를 눌러 방법을 따라 해보시고, 그래도 오지 않는다면 고객센터로 문의해주세요.
//         </p>
//       </div>
//     </div>
//   );
// }

// export default ToastModal;
import { teal } from '@mui/material/colors';
import React, { useState, useEffect } from 'react';
import { axiosCommonInstance } from '../../apis/axiosInstance';
import { phoneNumberCheck } from '../../service/auth/auth';

function ToastModal({ message, onClose, setSuccessToken, phoneNumber }) {
  const [timeLeft, setTimeLeft] = useState(180); // 3분 = 180초
  const [requested, setRequested] = useState(false);
  useEffect(() => {
    if (!requested) {
      axiosCommonInstance.post("/auth/authentication", {
        tel: phoneNumber
      })
      setRequested(true);
    }
    if (timeLeft === 0) {
      onClose();
      return;
    }
    const timer = setTimeout(() => {
      setTimeLeft(timeLeft - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [timeLeft, onClose]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const retry = () => {
    setTimeLeft(180);
    setRequested(false);
    //대충 인증번호 api 한번더 콜하기
  }

  const validate = () => {
    const data = phoneNumberCheck(phoneNumber, document.querySelector("#authnum").value);
    if (data.code == "SUCCESS") {
      setSuccessToken(data.token);
    } else {
      retry();
    }
    onClose();
  }
  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-white p-5 rounded shadow-lg w-80 relative">
        <button onClick={onClose} className="absolute top-2 right-2 text-2xl">&times;</button>
        <p className="text-center text-gray-700 mb-4 font-bold">
          문자로 전달받은<br />인증번호 6자리를 입력해주세요.
        </p>
        <div className="flex flex-col gap-3">
          <input
            type="text"
            id='authnum'
            placeholder="인증번호"
            className="w-full p-2 border rounded focus:outline-none focus:border-pink-500"
          />
          <div className="flex justify-between items-center text-sm text-gray-600">
            <span>{formatTime(timeLeft)}</span>
            <button className="text-pink-500" onClick={retry}>재전송</button>
          </div>
          <button
            onClick={validate}
            className="w-full bg-pink-500 text-white p-2 rounded">
            확인
          </button>
        </div>
        <p className="text-xs text-center text-gray-500 mt-3">
          인증번호가 오지 않는다면 여기를 눌러 방법을 따라 해보시고, 그래도 오지 않는다면 고객센터로 문의해주세요.
        </p>
      </div>
    </div>
  );
}

export default ToastModal;
