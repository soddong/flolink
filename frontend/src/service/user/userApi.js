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

export const getMyInfo = async () => {
    const { data } = await axiosCommonInstance.get('/users/myInfo');
    return data;
}

//회원 탈퇴
export const deleteUser = async () => {
    try {
        const { data } = await axiosCommonInstance.delete('/users/myInfo');
        localStorage.removeItem("ACCESS_TOKEN");
        document.cookie = "refresh=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        return data;
    } catch (error) {
        throw error;
    }
}

export const logout = async () => {
    try {
        const { data } = await axiosCommonInstance.post('/auth/logout');
        localStorage.removeItem("ACCESS_TOKEN");
        document.cookie = "refresh=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        return data;
    } catch (error) {
        console.error("Error during logout:", error);
        throw error; 
    }
};