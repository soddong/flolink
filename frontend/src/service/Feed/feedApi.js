import { axiosCommonInstance } from '../../apis/axiosInstance';
import userRoomStore from '../../store/userRoomStore';

// 피드 추가
export const addFeed = async (roomId, images, content) => {
    const formData = new FormData();
    formData.append('roomId', roomId);
    formData.append('content', content);
    images.forEach((image, index) => {
        formData.append(`images[${index}]`, image);
    });

    const { data } = await axiosCommonInstance.post('/feeds', formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    })
    return data;
};

// 피드 전체 조회
export const fetchFeedList = async (roomId, lastFeedDate, size) => {
    const { data } = await axiosCommonInstance.get(`/feeds?roomId=${roomId}&lastFeedDate=${lastFeedDate}&size=${size}`)
    return data;
}

// 피드 내용 업데이트
export const feedPatch = async (feedId, roomId, images, content) => {
    const { data } = await axiosCommonInstance.patch(`/feeds?feedId=${feedId}`, {
        roomId : roomId,
        images : images,
        content : content
    });
    return data;
}

// 피드 삭제
export const feedDelete = async (feedId) => {
    const { data } = await axiosCommonInstance.delete(`/feeds?feedId=${feedId}`);
    return data;
}