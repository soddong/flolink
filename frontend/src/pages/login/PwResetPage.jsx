import React, { useState } from 'react';
import { TextField, Button } from '@mui/material';
import FindAccountStyle from '../../css/login/FindAccount.module.css';
import logo from '../../assets/logo/logo.png';
import { changePassword } from '../../service/user/userApi';
import { useNavigate } from 'react-router-dom';

function FindAccount() {
  const [loginId, setLoginId] = useState('');
  const [newPassword, setnewPassword] = useState('');
  const [newPasswordCheck, setnewPasswordCheck] = useState('');
  const navigate = useNavigate();

  const handleResetPw = async () => {
    try {
      await changePassword(loginId, newPassword, newPasswordCheck)
      alert('비밀번호 재설정을 완료하였습니다.');
      navigate("/channelselect");
    } catch (error) {
      console.error(error);
      alert('비밀번호 재설정에 실패했습니다.');
      navigate("/channelselect");
    }
  };
  return (
    <div className={FindAccountStyle.container}>
      <button className={FindAccountStyle.closeButton}>&times;</button>
      <img src={logo} alt="FLORINK" className={FindAccountStyle.logo} />

      <div className={FindAccountStyle.tabs}>
        <div 
          className={`${FindAccountStyle.tab} ${FindAccountStyle.activeTab}`}
        >
          비밀번호 재설정
        </div>
      </div>
      
        <div className={FindAccountStyle.form}>
            <TextField label="기존 아이디를 입력해주세요" variant="outlined" fullWidth className={FindAccountStyle.input} 
            value={loginId} onChange={(e) => setLoginId(e?.target?.value)}/>
            <TextField label="새로운 비밀번호를 설정해주세요" variant="outlined" fullWidth className={FindAccountStyle.input} type="password" 
            value={newPassword} onChange={(e) => setnewPassword(e?.target?.value)}/>
            <TextField label="한번 더 입력해주세요" variant="outlined" fullWidth className={FindAccountStyle.input} type="password" 
            value={newPasswordCheck} onChange={(e) => setnewPasswordCheck(e?.target?.value)}/>
            <Button variant="contained" className={FindAccountStyle.submitButton} onClick={handleResetPw}>확인</Button>
        </div>
      
    </div>
  );
}

export default FindAccount;