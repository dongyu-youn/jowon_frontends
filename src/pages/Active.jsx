import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const Activate = () => {
  const { token } = useParams();
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        const response = await axios.get(
          `http://127.0.0.1:8000/users/api/signup/verify-email/${token}/`
        );
        setMessage(response.data.message);
        // 이메일 인증 후 홈 화면으로 리다이렉트
        navigate("/");
      } catch (error) {
        setMessage("Invalid or expired token.");
      }
    };
    verifyEmail();
  }, [token, navigate]);

  return (
    <div>
      <h2>Email Verification</h2>
      {message && <p>{message}</p>}
    </div>
  );
};

export default Activate;
