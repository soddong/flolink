import React, { useState } from 'react';
import { TextField, Button } from '@mui/material';
import FindAccountStyle from '../css/FindAccount.module.css';
import logo from '../assets/logo.png';

function FindAccount() {
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
            <TextField label="기존 아이디를 입력해주세요" variant="outlined" fullWidth className={FindAccountStyle.input} />
            <TextField label="새로운 비밀번호를 설정해주세요" variant="outlined" fullWidth className={FindAccountStyle.input} type="password" />
            <TextField label="한번 더 입력해주세요" variant="outlined" fullWidth className={FindAccountStyle.input} type="password" />
            <Button variant="contained" className={FindAccountStyle.submitButton}>확인</Button>
        </div>
      
    </div>
  );
}

export default FindAccount;