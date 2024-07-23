import React from 'react';
import { Button, TextField, Box, Typography } from '@mui/material';
import { styled } from '@mui/system';
import logo from '../assets/logo.png';  
import kakaoLogo from '../assets/kakao.png'; 
import googleLogo from '../assets/google.png'; 

const Root = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  height: '100vh',
  backgroundColor: '#fff',
});

const Logo = styled('img')({
  width: '100px',
  marginBottom: '16px',
});

const Input = styled(TextField)({
  marginBottom: '16px',
  width: '90%',
  maxWidth: '390px',
});

const CustomButton = styled(Button)({
  marginBottom: '16px',
  width: '90%',
  maxWidth: '390px',
  background: 'linear-gradient(to right, #ff758c, #ff7eb3)',
  color: '#fff',
});

const SnsButton = styled(Button)({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: '90%',
  maxWidth: '390px',
  marginBottom: '16px',
  backgroundColor: '#f5f5f5',
  color: '#000',
});

const SnsContainer = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  marginTop: '16px',
});

const TextLink = styled(Typography)({
  color: '#9e9e9e',
  marginBottom: '8px',
});

function LoginPage() {
  return (
    <Root>
      <Logo src={logo} alt="FLORINK" />
      <Input
        label="전화번호 또는 아이디"
        variant="outlined"
      />
      <Input
        label="비밀번호"
        variant="outlined"
        type="password"
      />
      <CustomButton variant="contained">로그인</CustomButton>
      <Box>
        <TextLink>아이디 찾기</TextLink>
        <TextLink>비밀번호 찾기</TextLink>
        <TextLink>회원가입</TextLink>
      </Box>
      <SnsContainer>
        <SnsButton variant="contained">
          <img src={kakaoLogo} alt="Kakao" style={{ marginRight: '8px', width: '24px', height: '24px' }} /> 카카오로 시작
        </SnsButton>
        <SnsButton variant="contained">
          <img src={googleLogo} alt="Google" style={{ marginRight: '8px', width: '24px', height: '24px' }} /> 구글 계정으로 시작
        </SnsButton>
      </SnsContainer>
    </Root>
  );
}

export default LoginPage;