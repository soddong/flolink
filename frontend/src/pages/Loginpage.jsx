import React from 'react';
import { Button, TextField, Box, Typography } from '@mui/material';
import logo from '../assets/logo.png';  
import kakaoLogo from '../assets/kakao.png'; 
import googleLogo from '../assets/google.png'; 
import LoginPageStyle from '../css/Loginpage.module.css';

function LoginPage() {
  return (
    <div className={LoginPageStyle.root}>
      <img src={logo} alt="FLORINK" className="logo" />
      <TextField
        className={LoginPageStyle.input}
        label="전화번호 또는 아이디"
        variant="outlined"
      />
      <TextField
        className={LoginPageStyle.input}
        label="비밀번호"
        variant="outlined"
        type="password"
      />
      <Button className={LoginPageStyle.customButton} variant="contained">로그인</Button>
      <Box>
        <Typography className={LoginPageStyle.textLink}>아이디 찾기</Typography>
        <Typography className={LoginPageStyle.textLink}>비밀번호 찾기</Typography>
        <Typography className={LoginPageStyle.textLink}>회원가입</Typography>
      </Box>
      <Box className={LoginPageStyle.snsContainer}>
        <Button className={LoginPageStyle.snsButton} variant="contained">
          <img src={kakaoLogo} alt="Kakao" className={LoginPageStyle.snsLogo} /> 카카오로 시작
        </Button>
        <Button className={LoginPageStyle.snsButton} variant="contained">
          <img src={googleLogo} alt="Google" className={LoginPageStyle.snsLogo} /> 구글 계정으로 시작
        </Button>
      </Box>
    </div>
  );
}

export default LoginPage;
