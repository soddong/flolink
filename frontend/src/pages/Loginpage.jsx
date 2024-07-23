import React from 'react';
import { Button, TextField, Box, Typography } from '@mui/material';
import logo from '../assets/logo.png';  
import kakaoLogo from '../assets/kakao.png'; 
import googleLogo from '../assets/google.png'; 
import '../css/Loginpage.css';

function LoginPage() {
  return (
    <div className="root">
      <img src={logo} alt="FLORINK" className="logo" />
      <TextField
        className="input"
        label="전화번호 또는 아이디"
        variant="outlined"
      />
      <TextField
        className="input"
        label="비밀번호"
        variant="outlined"
        type="password"
      />
      <Button className="customButton" variant="contained">로그인</Button>
      <Box>
        <Typography className="textLink">아이디 찾기</Typography>
        <Typography className="textLink">비밀번호 찾기</Typography>
        <Typography className="textLink">회원가입</Typography>
      </Box>
      <Box className="snsContainer">
        <Button className="snsButton" variant="contained">
          <img src={kakaoLogo} alt="Kakao" className="snsLogo" /> 카카오로 시작
        </Button>
        <Button className="snsButton" variant="contained">
          <img src={googleLogo} alt="Google" className="snsLogo" /> 구글 계정으로 시작
        </Button>
      </Box>
    </div>
  );
}

export default LoginPage;
