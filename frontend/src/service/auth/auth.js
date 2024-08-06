import { axiosCommonInstance } from '../../apis/axiosInstance';


export const checkDuplicateUsername = async (username) => {
    const { data } = await axiosCommonInstance.get(`/users/duplicate/${username}`);
    return data;
};


export const phoneNumberCheck = async (tel, authNum) => {
    const { data } = await axiosCommonInstance.post('/auth/authentication/check',
        {
            tel: tel,
            authNum: authNum
        }
    )
    return data;
}

export const registUser = async (userinfo)=>{
    const {data} = axiosCommonInstance.post("/users/join", userinfo);
    return data;
}