import ProfilePhoto from "./ProfilePhoto";
import Photo from "../../../assets/profile/profile_dummy.jpg";
import { useEffect, useState } from "react";
import userRoomStore from "../../../store/userRoomStore";

function UserStatusList() {
  const [memberList, setMemberList] = useState([]);
  const { roomDetail } = userRoomStore((state) => ({
    roomDetail: state.roomDetail?.data,
  }));
  useEffect(() => {
    setMemberList(roomDetail?.memberInfoResponses);
  }, [roomDetail]);

  return (
    <div className="border-box mt-3.5 h-26 py-1 px-5 bg-white/75 rounded-xl flex flex-col items-center">
      <div className="flex pw-full relative justify-center items-center">
        <p className="text-base m-0 font-bold text-zinc-500">
          오늘 우리의 기분은?
        </p>
      </div>
      <div className="flex flex-nowrap w-full h-full justify-start my-1.5 overflow-x-auto">
        {memberList?.map((member) => {
          return (
            <ProfilePhoto
              key={member?.targetUserRoomId}
              member={member}
            />
          );
        })}
      </div>
    </div>
  );
}

export default UserStatusList;
