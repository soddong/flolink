import { axiosCommonInstance } from '../../apis/axiosInstance';

export const fetchInventory = async () => {
    const { data } = await axiosCommonInstance.get('/myroom/inventory');
    return data;
}

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
    const { data } = await axiosCommonInstance.put('/users/myInfo/nickname', {
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

// 프로필 사진 및 기분상태 변경
export const changeProfileAndEmotion = async (profile, emotion) => {
    const upperCaseProfile = profile.toUpperCase();
    const upperCaseEmotion = emotion.toUpperCase();
    
    const { data } = await axiosCommonInstance.put('/users/myInfo/profile/emotion', {
        profile: upperCaseProfile,
        emotion: upperCaseEmotion
    });
    return data;
}


