import { axiosCommonInstance } from '../../apis/axiosInstance';

// 비밀번호 변경
export const changePassword = async (loginId, newPassword, newPasswordConfirm) => {
    const { data } = await axiosCommonInstance.put('/users/reset/pw', {
        loginId: loginId,
        newPassword: newPassword,
        newPasswordConfirm: newPasswordConfirm
    });
    return data;
}

// 닉네임 변경
export const changeNickname = async (nickname) => {
    const { data } = await axiosCommonInstance.put('/users/myinfo/nickname', {
        nickname: nickname
    });
    return data;
}

// 상태메세지 변경
export const changeStatusMessage = async (statusMessage) => {
    const { data } = await axiosCommonInstance.put('/users/myInfo/message', {
        statusMessage: statusMessage
    });
    return data;
}

// 프로필 사진 변경
export const changeProfile = async (statusMessage) => {
    const { data } = await axiosCommonInstance.put('/users/myInfo/message', {
        statusMessage: statusMessage
    });
    return data;
}

// 기분상태 변경
export const changeEmotion = async (emotion) => {
    const { data } = await axiosCommonInstance.put('/users/myInfo/emotion', {
        emotion: emotion
    });
    return data;
}

