import React, { useState, useEffect  } from 'react';
import { TextField, Button, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import FindAccountStyle from '../../css/login/FindAccount.module.css';
import logo from '../../assets/logo/logo.png';
import { useNavigate } from 'react-router-dom';
import { axiosCommonInstance } from '../../apis/axiosInstance';
import { findId, phoneNumberCheck, sendAuthNum, resetPw } from '../../service/auth/auth';

function FindAccount() {
  const [activeTab, setActiveTab] = useState('findId');
  const [countdown, setCountdown] = useState(0);
  const [verificationCode, setVerificationCode] = useState('');
  const [isCodeSent, setIsCodeSent] = useState(false);
  const [maskedId, setMaskedId] = useState('');
  const [openModal, setOpenModal] = useState(false);
  const [username, setUsername] = useState('');
  const [tel, setTel] = useState('');
  const [authNum, setAuthNum] = useState('');
  const [successToken, setSuccessToken] = useState('')
  const [loginId, setloginId] = useState('')
  const navigate = useNavigate();

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  // 인증번호 전송
  const handleSendCode = async () => {
    try {
      // 예시
      const authNum = await sendAuthNum(tel).data;
      setAuthNum(authNum)     
      setIsCodeSent(true);
      setCountdown(180); // 3분
    } catch (error) {
      console.error(error);
      alert('인증번호 전송에 실패했습니다.');
    }
  };

  // 인증번호 확인
  const handleVerifyCode = async () => {
    if (countdown <= 0) {
      alert('인증번호가 만료되었습니다. 다시 요청해주세요.');
      return;
    }

    try {
      phoneNumberCheck(tel, verificationCode).then((res) => {
        if(res?.code === "SUCCESS"){
          setSuccessToken(res?.data?.token);
          alert('인증성공');
        } else {
          alert('인증번호가 틀렸습니다. 다시 시도해주세요.');
        }
      })
    } catch (error) {
      console.error(error);
      alert('인증번호 확인에 실패했습니다.');
    }
  };

  

  // 아이디 반환
  const handleFindId = async () => {
    try{
      const secretId = await findId(username, tel, successToken);
      console.log(secretId?.data?.loginId)
      if (secretId?.status === 200) {
        setMaskedId(secretId?.data?.loginId);
        setOpenModal(true);
      } else {
        alert('일치하는 정보가 없습니다.');
      }
    } catch (e) {
        alert('처리 중 오류가 발생했습니다.');
    }
  }
  
  // 비밀번호 반환?
  const handleFindPw = async () => {
    try{
      resetPw(loginId, username, tel, verificationCode)
    } catch (e) {
        alert('처리 중 오류가 발생했습니다!.');
    }
  }

  return (
    <div className={FindAccountStyle.container}>
      <button className={FindAccountStyle.closeButton} onClick={() => navigate(-1)}>&times;</button>
      <img src={logo} alt="FLORINK" className={FindAccountStyle.logo} />
      <div className={FindAccountStyle.tabs}>
        <div 
          className={`${FindAccountStyle.tab} ${activeTab === 'findId' ? FindAccountStyle.activeTab : ''}`}
          onClick={() => setActiveTab('findId')}
        >
          아이디 찾기
        </div>
        <div 
          className={`${FindAccountStyle.tab} ${activeTab === 'findPw' ? FindAccountStyle.activeTab : ''}`}
          onClick={() => setActiveTab('findPw')}
        >
          비밀번호 찾기
        </div>
      </div>
      {activeTab === 'findId' && (
        <div className={FindAccountStyle.form}>
          <TextField label="이름" variant="outlined" fullWidth className={FindAccountStyle.input} 
            onChange={(e) => setUsername(e.target.value)}/>
          <TextField label="휴대 전화번호 입력 ('-' 제외)" variant="outlined" fullWidth className={FindAccountStyle.input} 
            onChange={(e) => setTel(e.target.value)}/>
          <Button 
            variant="outlined" 
            className={FindAccountStyle.button}
            onClick={handleSendCode}
            disabled={isCodeSent}
          >
            {isCodeSent ? `${Math.floor(countdown / 60)}:${('0' + (countdown % 60)).slice(-2)} 후 재발송 가능` : '인증번호 전송'}
          </Button>
          <TextField 
            label="인증번호 6자리를 입력해주세요" 
            variant="outlined" 
            fullWidth 
            className={FindAccountStyle.input}
            value={verificationCode}
            onChange={(e) => setVerificationCode(e.target.value)}
            disabled={countdown <= 0}
          />
          <Button 
            variant="outlined" 
            className={FindAccountStyle.button}
            onClick={handleVerifyCode}
          >
            확인
          </Button>
          <Button variant="contained" className={FindAccountStyle.submitButton}
          onClick={handleFindId}>아이디 찾기</Button>
        </div>
      )}
      
      {activeTab === 'findPw' && (
        <div className={FindAccountStyle.form}>
          <TextField label="이름" variant="outlined" fullWidth className={FindAccountStyle.input} 
            onChange={(e) => setUsername(e.target.value)} />
          <TextField label="아이디" variant="outlined" fullWidth className={FindAccountStyle.input}
            onChange={(e) => setloginId(e.target.value)} />
          <TextField label="휴대 전화번호 입력 ('-' 제외)" variant="outlined" fullWidth className={FindAccountStyle.input}
            onChange={(e) => setTel(e.target.value)} />
          <Button variant="outlined" className={FindAccountStyle.button} 
            onClick={handleSendCode} >인증번호 전송</Button>
          <TextField label="인증번호 입력" variant="outlined" fullWidth className={FindAccountStyle.input} 
            onChange={(e) => setVerificationCode(e.target.value)} />
          <Button variant="contained" className={FindAccountStyle.submitButton} 
            onClick={handleFindPw}>비밀번호 찾기</Button>
        </div>
      )}
      {/* 찾은 아이디 표시 모달 */}
      <Dialog open={openModal} onClose={() => setOpenModal(false)}>
        <DialogTitle>아이디 확인</DialogTitle>
        <DialogContent>
          <span>아이디 찾기가 완료되었습니다.</span>
          <p>{maskedId}</p>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenModal(false)} color="primary">
            닫기
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default FindAccount;
