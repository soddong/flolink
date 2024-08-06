
import React, { useEffect, useState } from 'react';
import logo from '../../assets/logo/logo.png';
import Button from '../../components/signup/Button';
import TextField from '../../components/signup/TextField';
import ToastModal from '../../components/signup/ToastModal';
import { Router, useNavigate } from 'react-router-dom';
import PwField from '../../components/signup/PwField';
import NicknameField from '../../components/signup/NicknameField';
import IdField from '../../components/signup/IdField';
import NameField from '../../components/signup/NameField';
import PhoneNumberField from '../../components/signup/PhoneNumber';
import { checkDuplicateUsername } from '../../service/auth/auth';
function SignupPage() {
  const [selectedTelecom, setSelectedTelecom] = useState('SKT');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordSame, setPasswordSame] = useState(true);
  const [nickname, setNickname] = useState('');
  const [nicknameError, setNicknameError] = useState('');
  const [username, setUsername] = useState('');
  const [usernameMessage, setUsernameMessage] = useState('');
  const [fullName, setFullName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [successToken, setSuccessToken] = useState('');
  // const isFormValid = password && confirmPassword && passwordSame && username && nickname && !nicknameError && fullName && phoneNumber;
  const isFormValid = true;

  useEffect(() => {
    if (isFormValid) {
      setIsModalOpen(false);
    }
  }, [isFormValid]);

  const checkUsernameAvailability = async (e) => {
    e.preventDefault();
    try {
      const response = checkDuplicateUsername(username);
      console.log(response);
      // 응답이 성공적으로 왔을 때
      if (response.data) {
        // 중복된 아이디가 있는 경우
        setUsernameMessage('이미 사용 중인 아이디입니다.');
      } else {
        // 중복된 아이디가 없는 경우
        setUsernameMessage('사용 가능한 아이디입니다.');
      }
    } catch (error) {
      // 오류가 발생한 경우
      setUsernameMessage('아이디 확인 중 오류가 발생했습니다.');
    }
  };

  const handleSendCode = (e) => {
    e.preventDefault();
    if (!isFormValid) {
      alert('모든 필드를 올바르게 입력해주세요.');
      return;
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);
    setPasswordSame(value === confirmPassword);
  };

  const handleConfirmPasswordChange = (e) => {
    const value = e.target.value;
    setConfirmPassword(value);
    setPasswordSame(value === password);
  };

  const handleNicknameChange = (e) => {
    const value = e.target.value;
    setNickname(value);

    if (value.length > 8) {
      setNicknameError('닉네임은 최대 8글자까지 입력 가능합니다.');
    } else {
      setNicknameError('');
    }
  };

  const handleRegist = () => {
    console.log("1234");
    axiosCommonInstance.post("/users/join", {
      loginId: username,
      password: password,
      userName: fullName,
      nickname: nickname,
      tel: phoneNumber,
      token: successToken
    }).then((data) => {
      console.log("우왕 회원가입이다");
      navigate('/login');
    })
  }

  const handleFullNameChange = (e) => {
    setFullName(e.target.value);
  };

  const handlePhoneNumberChange = (e) => {
    setPhoneNumber(e.target.value);
  };

  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-white p-5">
      <div className="w-full max-w-md">
        <button className="absolute top-2 right-2 text-2xl" onClick={() => navigate(-1)}>&times;</button>
        <img src={logo} alt="FLORINK" className="block mx-auto mb-5 w-24 h-auto" />
        <h2 className="text-center text-lg font-bold mb-5">회원가입</h2>
        <form className="flex flex-col gap-3" onSubmit={handleSendCode}>
          <div className="flex items-end gap-3 mb-0">
            <div className="flex-1">
              <IdField
                placeholder="아이디를 입력해주세요"
                label="아이디"
                setUsername={setUsername}
                setUsernameMessage={setUsernameMessage}
              />
            </div>
            <Button text="중복확인" variant="outline" className="text-sm flex-none" onClick={checkUsernameAvailability} />
          </div>
          {usernameMessage && (
            <p className="text-sm mt-1" style={{ color: usernameMessage.includes('사용 가능한') ? 'green' : 'red' }}>
              {usernameMessage}
            </p>
          )}

          <PwField
            label="비밀번호"
            placeholder="비밀번호를 입력해주세요"
            type="password"
            value={password}
            onChange={handlePasswordChange}
          />
          <PwField
            label="비밀번호 확인"
            placeholder="비밀번호를 한 번 더 입력해주세요"
            type="password"
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
          />
          {!passwordSame && (
            <p className="text-red-500 text-sm">비밀번호가 일치하지 않습니다.</p>
          )}
          <NicknameField
            label="닉네임"
            placeholder="닉네임을 입력해주세요"
            value={nickname}
            onChange={handleNicknameChange}
          />
          {nicknameError && (
            <p className="text-red-500 text-sm">{nicknameError}</p>
          )}
          <NameField
            label="이름"
            placeholder="예) 이싸피"
            setFullName={setFullName}
          />
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
            <PhoneNumberField
              label="휴대전화번호"
              placeholder="010-1234-5678"
              setPhoneNumber={setPhoneNumber}
              onChange={handlePhoneNumberChange}
            />
          </div>
          {successToken === "" && (
            <Button text="전송" variant="solid" onClick={handleSendCode} disabled={!isFormValid} />
          )}{
            successToken !== "" && (
              <Button text="가입하기" variant="solid" onClick={handleRegist} disabled={!isFormValid} />
            )
          }
        </form>
        {isModalOpen && (
          <ToastModal
            message="문자로 전달받은\n인증번호 6자리를 입력해주세요."
            onClose={handleCloseModal}
            setSuccessToken={setSuccessToken}
            phoneNumber={phoneNumber}
          />
        )}
      </div>
    </div>
  );
}

export default SignupPage;
