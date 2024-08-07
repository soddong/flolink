import { axiosCommonInstance } from '../../apis/axiosInstance';

// 피드 추가
export const addFeed = async (feedcontent) => {
    const { data } = await axiosCommonInstance.post(`/feeds`, feedcontent);
    return data;
};

// 피드 전체 조회
export const feedList = async (tel) => {
    const { data } = await axiosCommonInstance.post('/auth/authentication',
        {
            tel: tel
        }
    )
    return data;
}
