import React, { useState } from 'react';
import { TextField, Button } from '@mui/material';
import FindAccountStyle from '../css/FindAccount.module.css';
import logo from '../assets/logo.png';

function FindAccount() {
  const [activeTab, setActiveTab] = useState('findId');

  return (
    <div className={FindAccountStyle.container}>
      <button className={FindAccountStyle.closeButton}>&times;</button>
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
        <div 
          className={`${FindAccountStyle.tab} ${activeTab === 'resetPw' ? FindAccountStyle.activeTab : ''}`}
          onClick={() => setActiveTab('resetPw')}
        >
          비밀번호 재설정
        </div>
      </div>
      {activeTab === 'findId' && (
        <div className={FindAccountStyle.form}>
          <TextField label="이름" variant="outlined" fullWidth className={FindAccountStyle.input} />
          <TextField label="휴대 전화번호 입력 ('-' 제외)" variant="outlined" fullWidth className={FindAccountStyle.input} />
          <Button variant="outlined" className={FindAccountStyle.button}>인증번호 전송</Button>
          <TextField label="인증번호 입력" variant="outlined" fullWidth className={FindAccountStyle.input} />
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
      {activeTab === 'resetPw' && (
        <div className={FindAccountStyle.form}>
          <TextField label="기존 아이디를 입력해주세요" variant="outlined" fullWidth className={FindAccountStyle.input} />
          <TextField label="새로운 비밀번호를 설정해주세요" variant="outlined" fullWidth className={FindAccountStyle.input} type="password" />
          <TextField label="한번 더 입력해주세요" variant="outlined" fullWidth className={FindAccountStyle.input} type="password" />
          <Button variant="contained" className={FindAccountStyle.submitButton}>확인</Button>
        </div>
      )}
    </div>
  );
}

export default FindAccount;
