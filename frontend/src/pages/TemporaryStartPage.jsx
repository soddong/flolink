
function TemporaryStartPage() {
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
    )
}

export default TemporaryStartPage