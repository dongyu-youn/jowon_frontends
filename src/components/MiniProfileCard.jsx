import { useNavigate } from "react-router-dom";
import { FaCrown } from "react-icons/fa";

const MiniProfileCard = ({ participant, isFirst }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/users/${participant.id}`);
  };

  return (
    <div
      key={participant.id}
      className="profile-card mt-2"
      onClick={handleClick}
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        cursor: "pointer",
        position: "relative", // 부모 요소에 relative 적용
      }}
    >
      {isFirst && (
        <FaCrown
          className="text-yellow-500"
          style={{ position: "absolute", top: "-10px" }}
        />
      )}
      <img
        alt={participant.username}
        src={participant.avatar}
        className="profile-picture rounded-full"
        style={{ width: "50px", height: "50px", marginBottom: "8px" }} // 이미지 아래 여백 추가
      />
      <p className="profile-username">{participant.username}</p>
    </div>
  );
};

export default MiniProfileCard;
