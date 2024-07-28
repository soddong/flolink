// import React, { useState } from 'react';
// import logo from '../assets/logo.png';
// import Button from '../components/Button';
// import TextField from '../components/TextField';
// import ToastModal from '../components/ToastModal';

// function SignupPage() {
//   const [selectedTelecom, setSelectedTelecom] = useState('SKT');
//   const [isModalOpen, setIsModalOpen] = useState(false);
  
//   const handleSendCode = (e) => {
//     e.preventDefault(); // Prevent form submission and page reload
//     setIsModalOpen(true);
//   };

//   const handleCloseModal = () => {
//     setIsModalOpen(false);
//   };

//   return (
//     <div className="max-w-md mx-auto h-screen bg-white p-5 relative">
//       <button className="absolute top-2 right-2 text-2xl">&times;</button>
//       <img src={logo} alt="FLORINK" className="block mx-auto mb-5 w-24 h-auto" />
//       <h2 className="text-center text-lg font-bold mb-5">회원가입</h2>
//       <form className="flex flex-col gap-3" onSubmit={handleSendCode}>
//         <div className="flex items-end gap-3 mb-0">
//           <div className="flex-1">
//             <TextField placeholder="아이디를 입력해주세요" label="아이디" />
//           </div>
//           <Button text="중복확인" variant="outline" className="text-sm flex-none" />
//         </div>

//         <TextField label="비밀번호" placeholder="비밀번호를 입력해주세요" type="password" />
//         <TextField label="비밀번호 확인" placeholder="비밀번호를 한 번 더 입력해주세요" type="password" />
//         <TextField label="닉네임" placeholder="닉네임을 입력해주세요"/>
//         <TextField label="이름" placeholder="예) 이싸피" />
//         <div className="flex items-center gap-3 mb-0">
//           <div className="flex flex-col">
//             <label className="block text-gray-700 mb">통신사</label>
//             <select
//               value={selectedTelecom}
//               onChange={(e) => setSelectedTelecom(e.target.value)}
//               className="p-2 border rounded focus:outline-none focus:border-pink-500"
//             >
//               <option value="KT">KT</option>
//               <option value="SKT">SKT</option>
//               <option value="LGU+">LGU+</option>
//             </select>
//           </div>
//           <TextField label="휴대전화번호" placeholder="010-1234-5678" />
//         </div>
//         <Button text="전송" variant="solid"/>
//       </form>
//       {isModalOpen && (
//         <ToastModal onClose={handleCloseModal} />
//       )}
//     </div>
//   );
// }

// export default SignupPage;
import React, { useState } from 'react';
import logo from '../assets/logo.png';
import Button from '../components/Button';
import TextField from '../components/TextField';
import ToastModal from '../components/ToastModal';

function SignupPage() {
  const [selectedTelecom, setSelectedTelecom] = useState('SKT');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSendCode = (e) => {
    e.preventDefault(); // Prevent form submission and page reload
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="max-w-md mx-auto h-screen bg-white p-5 relative">
      <button className="absolute top-2 right-2 text-2xl">&times;</button>
      <img src={logo} alt="FLORINK" className="block mx-auto mb-5 w-24 h-auto" />
      <h2 className="text-center text-lg font-bold mb-5">회원가입</h2>
      <form className="flex flex-col gap-3">
        <div className="flex items-end gap-3 mb-0">
          <div className="flex-1">
            <TextField placeholder="아이디를 입력해주세요" label="아이디" />
          </div>
          <Button text="중복확인" variant="outline" className="text-sm flex-none" />
        </div>

        <TextField label="비밀번호" placeholder="비밀번호를 입력해주세요" type="password" />
        <TextField label="비밀번호 확인" placeholder="비밀번호를 한 번 더 입력해주세요" type="password" />
        <TextField label="닉네임" placeholder="닉네임을 입력해주세요"/>
        <TextField label="이름" placeholder="예) 이싸피" />
        <div className="flex items-center gap-3 mb-0">
          <div className="flex flex-col">
            <label className="block text-gray-700 mb">통신사</label>
            <select
              value={selectedTelecom}
              onChange={(e) => setSelectedTelecom(e.target.value)}
              className="p-2 border rounded focus:outline-none focus:border-pink-500"
            >
              <option value="KT">KT</option>
              <option value="SKT">SKT</option>
              <option value="LGU+">LGU+</option>
            </select>
          </div>
          <TextField label="휴대전화번호" placeholder="010-1234-5678" />
        </div>
        <Button text="전송" variant="solid" onClick={handleSendCode}/>
      </form>
      {isModalOpen && (
        <ToastModal 
          message="문자로 전달받은\n인증번호 6자리를 입력해주세요." 
          onClose={handleCloseModal} 
        />
      )}
    </div>
  );
}

export default SignupPage;
