import React, { useState } from 'react';
import { TextField, Button } from '@mui/material';
import FindAccountStyle from '../css/FindAccount.module.css';
import logo from '../assets/logo.png';

function SignUp() {
  return (
    <div className={FindAccountStyle.container}>
      <button className={FindAccountStyle.closeButton}>&times;</button>
      <img src={logo} alt="FLORINK" className={FindAccountStyle.logo} />
      <div className={FindAccountStyle.tabs}>
        <div className={`${FindAccountStyle.tab} ${FindAccountStyle.activeTab}`}>
            회원가입
        </div>
      </div>

      <div className={FindAccountStyle.form}>
            <TextField label="5~20자 이내로" variant="outlined" fullWidth className={FindAccountStyle.input} />
            <TextField label="비밀번호를 입력해주세요" variant="outlined" fullWidth className={FindAccountStyle.input} type="password" />
            <TextField label="비밀번호를 한번 더 입력해주세요" variant="outlined" fullWidth className={FindAccountStyle.input} type="password" />
            <TextField label="닉네임을 입력해주세요" variant="outlined" fullWidth className={FindAccountStyle.input} />
            <TextField label="이름을 입력해주세요" variant="outlined" fullWidth className={FindAccountStyle.input} />
                <TextField label="통신사" variant="outlined" fullWidth className={FindAccountStyle.input} />
            <TextField label="휴대 전화번호 입력 ('-' 제외)" variant="outlined" fullWidth className={FindAccountStyle.input} />
            <Button variant="contained" className={FindAccountStyle.submitButton}>전송</Button>
        </div>
    </div>
  );
}

export default FindAccount;


