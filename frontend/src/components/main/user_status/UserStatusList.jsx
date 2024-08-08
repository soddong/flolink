import ProfilePhoto from "./ProfilePhoto";
import Photo from "../../../assets/profile/profile_dummy.jpg";
import { useEffect, useState } from "react";

function UserStatusList({ members, setRoomDetail }) {
  const [memberList, setMemberList] = useState([]);
  useEffect(() => {
    if (members) {
      setMemberList(members);
    }
  }, [members]);
  //   { userId: 1, targetNickname: "박동환", profile: "HONEYBEE",roomId:2,targetUserRoomId:2,emotion:"good"}
  // const memberList = [
  //   { id: 1, name: '엄마', photo: Photo, status: '화남', manager: 1},
  //   { id: 2, name: '아빠', photo: Photo, status: '행복', manager: 0},
  //   { id: 3, name: '첫째', photo: Photo, status: '행복', manager: 0},
  //   { id: 4, name: '둘째', photo: Photo, status: '슬픔', manager: 0},
  // ]

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
              setRoomDetail={setRoomDetail}
            />
          );
        })}
      </div>
    </div>
  );
}

export default UserStatusList;
