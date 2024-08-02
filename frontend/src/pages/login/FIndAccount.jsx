import React, { useState, useEffect  } from 'react';
import { TextField, Button, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import FindAccountStyle from '../../css/login/FindAccount.module.css';
import logo from '../../assets/logo/logo.png';
import { useNavigate } from 'react-router-dom';

function FindAccount() {
  const [activeTab, setActiveTab] = useState('findId');
  const [countdown, setCountdown] = useState(0);
  const [verificationCode, setVerificationCode] = useState('');
  const [isCodeSent, setIsCodeSent] = useState(false);
  const [maskedId, setMaskedId] = useState('');
  const [openModal, setOpenModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  const handleSendCode = async () => {
    // 인증번호 전송
    try {
      // 예시
      await fetch('/api/send-verification-code', { method: 'POST' });
      setIsCodeSent(true);
      setCountdown(180); // 3분
    } catch (error) {
      console.error(error);
      alert('인증번호 전송에 실패했습니다.');
    }
  };

  const handleVerifyCode = async () => {
    // 인증번호 확인
    if (countdown <= 0) {
      alert('인증번호가 만료되었습니다. 다시 요청해주세요.');
      return;
    }

    try {
      // 예시
      const response = await fetch('/api/verify-code', { 
        method: 'POST', 
        body: JSON.stringify({ code: verificationCode }),
      });
      if (response.status === 200) {
        const result = await response.json();
        setMaskedId(result.maskedId); // 마스킹된 아이디
        setOpenModal(true);
      } else {
        alert('인증번호가 틀렸습니다. 다시 시도해주세요.');
      }
    } catch (error) {
      console.error(error);
      alert('인증번호 확인에 실패했습니다.');
    }
  };

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
          <TextField label="이름" variant="outlined" fullWidth className={FindAccountStyle.input} />
          <TextField label="휴대 전화번호 입력 ('-' 제외)" variant="outlined" fullWidth className={FindAccountStyle.input} />
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
          <Button variant="contained" className={FindAccountStyle.submitButton}>아이디 찾기</Button>
        </div>
      )}
      
      {activeTab === 'findPw' && (
        <div className={FindAccountStyle.form}>
          <TextField label="이름" variant="outlined" fullWidth className={FindAccountStyle.input} />
          <TextField label="아이디" variant="outlined" fullWidth className={FindAccountStyle.input} />
          <TextField label="휴대 전화번호 입력 ('-' 제외)" variant="outlined" fullWidth className={FindAccountStyle.input} />
          <Button variant="outlined" className={FindAccountStyle.button}>인증번호 전송</Button>
          <TextField label="인증번호 입력" variant="outlined" fullWidth className={FindAccountStyle.input} />
          <Button variant="contained" className={FindAccountStyle.submitButton}>비밀번호 찾기</Button>
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
