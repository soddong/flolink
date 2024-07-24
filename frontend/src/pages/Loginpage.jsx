import React from 'react';
import { Button, TextField, Box, Typography } from '@mui/material';
import logo from '../assets/logo.png';  
import kakaoLogo from '../assets/kakao.png'; 
import googleLogo from '../assets/google.png'; 
import LoginPageStyle from '../css/Loginpage.module.css';

function LoginPage() {
  return (
    <div className={LoginPageStyle.root}>
      <img src={logo} alt="FLORINK" className={LoginPageStyle.logo} />
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
      <Box className={LoginPageStyle.linksContainer}>
        <Button className={LoginPageStyle.linkButton}>아이디 찾기</Button>
        <Button className={LoginPageStyle.linkButton}>비밀번호 찾기</Button>
        <Button className={LoginPageStyle.linkButton}>회원가입</Button>
      </Box>

      <hr className={LoginPageStyle.divider} />

      <Typography className={LoginPageStyle.snsLogin}>SNS 로그인</Typography>
      <Box className={LoginPageStyle.snsContainer}>
        <Button className={`${LoginPageStyle.snsButton} ${LoginPageStyle.kakaoButton}`} variant="contained">
          <img src={kakaoLogo} alt="Kakao" className={LoginPageStyle.snsLogo} /> 카카오로 계속
        </Button>
        <Button className={`${LoginPageStyle.snsButton} ${LoginPageStyle.googleButton}`} variant="contained">
          <img src={googleLogo} alt="Google" className={LoginPageStyle.snsLogo} /> 구글로 계속
        </Button>
      </Box>
    </div>
  );
}

export default LoginPage;
