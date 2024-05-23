import { useNavigate } from "react-router-dom";

const MiniProfileCard = ({ participant }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/users/${participant.id}`);
  };

  return (
    <div key={participant.id} className="profile-card" onClick={handleClick}>
      <img
        alt={participant.username}
        src={participant.avatar}
        className="profile-picture rounded-full"
        style={{ width: "64px", height: "64px" }} // 원하는 크기로 조정
      />
      <p className="profile-username">{participant.username}</p>
    </div>
  );
};

export default MiniProfileCard;
