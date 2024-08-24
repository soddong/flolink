import { axiosCommonInstance } from '../../apis/axiosInstance';

// 아이디 중복 체크
export const checkDuplicateUsername = async (username) => {
    const { data } = await axiosCommonInstance.get(`/users/duplicate/${username}`);
    return data;
};

// 휴대전화 인증번호 발급
export const sendAuthNum = async (tel) => {
    const { data } = await axiosCommonInstance.post('/auth/authentication',
        {
            tel: tel
        }
    )
    return data;
}

// 인증번호 확인
export const phoneNumberCheck = async (tel, authNum) => {
    const { data } = await axiosCommonInstance.post('/auth/authentication/check',
        {
            tel: tel,
            authNum: authNum
        }
    )
    return data;
}

// 회원가입
export const registUser = async (userinfo)=>{
    const {data} = await axiosCommonInstance.post("/users/join", userinfo);
    return data;
}

// 로그인
export const login = async (loginId, password) => {
    const { data, headers } = await axiosCommonInstance.post("/login", 
        {
      loginId: loginId,
      password: password
        });
    return { data, headers }; // headers도 반환
  };

// 아이디 반환
export const findId = async (userName, tel, successToken) => {
    const {data} = await axiosCommonInstance.post("/users/find/id", {
        userName: userName,
        tel: tel,
        token: successToken
    });
    return data;
}

// 비밀번호 찾기
export const findpw = async (loginId, userName, tel, token) => {
    const {data} = await axiosCommonInstance.post("users/find/pw", {
        loginId: loginId,
        userName: userName,
        tel: tel,
        token: token
    });
    return data;
}

// 로그아웃
export const logout = async () => {
    const {data} = await axiosCommonInstance.post("/logout", {
    });
    return data;
}

// 비밀번호 재설정 (여기서 authNum은 문자발송 후 받은 인증번호다.)
export const resetPw = async (loginId, userName, tel, authNum) => {
    const {data} = await axiosCommonInstance.post("/auth/reset/pw",{
        userName: userName,
        loginId: loginId,
        tel: tel,
        authNum: authNum
    })
    return data;
}

// AccessToken 재발급
export const reissue = async () => {
    await axiosCommonInstance.patch("/reissue")
}

