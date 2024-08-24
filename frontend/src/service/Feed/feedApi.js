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

// 피드 수정
export const feedPatch = async (feedId, roomId, images, content) => {
    const formData = new FormData();
    formData.append('feedId', feedId)
    formData.append('roomId', roomId)
    images.forEach((image, index) => {
        formData.append(`images[${index}]`, image);
    });
    formData.append('content', content)
    const { data } = await axiosCommonInstance.post(`/feeds/${feedId}`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    })
    return data;
}

// 피드 삭제
export const feedDelete = async (feedId) => {
    const { data } = await axiosCommonInstance.delete(`/feeds/${feedId}`);
    return data;
}

//피드 댓글 작성
export const AddComment = async (feedId, roomId, content) => {
    const { data } = await axiosCommonInstance.post(`/feeds/${feedId}/comments`, { 
        roomId : roomId,
        content : content,
    });
    return data;
}

//피드 댓글 삭제
export const DeleteComment = async (feedId, commentId) => {
    const { data } = await axiosCommonInstance.delete(`/feeds/${feedId}/comments/${commentId}`);
    return data;
}

