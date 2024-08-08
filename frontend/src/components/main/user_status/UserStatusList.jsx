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
    <div className="border-box mt-3.5 h-24 py-1 px-5 bg-white/75 rounded-xl flex flex-col items-center">
      <div className="flex pw-full relative justify-center items-center">
        <p className="text-base m-0 font-bold text-zinc-500">
          오늘 우리의 기분은?
        </p>
      </div>
      <div className="flex w-full justify-around my-1.5">
        {memberList.map((member) => {
          return (
            // <ProfilePhoto name={member.targetNickname} photo={member.profile} status={member.emotion} key={member.targetUserRoomId} manager={1} />
            <ProfilePhoto
              name={member?.targetNickname}
              photo={Photo} //{"dog.png"}
              status={"화남"}
              targetUserRoomId={member?.targetUserRoomId}
              key={member?.targetUserRoomId}
              manager={1}
            />
          );
        })}
      </div>
    </div>
  );
}

export default UserStatusList;
