import { axiosCommonInstance } from '../../apis/axiosInstance';

// 피드 추가
export const addFeed = async (roomId, images, content) => {
    console.log(roomId)
    const { data } = await axiosCommonInstance.post('/feeds', 
        {
        roomId: roomId,
        images: images,
        content: content
        }
    );
    return data;
};

// 피드 전체 조회
export const feedList = async (roomId, lastFeedDate, size = 20) => {
    const { data } = await axiosCommonInstance.get(`/feeds?roomId=${roomId}&lastFeedDate=${lastFeedDate}&size=${size}`)
    return data;
}

// 피드 내용 업데이트
