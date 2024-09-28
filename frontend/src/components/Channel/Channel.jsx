import React, { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { getUserProfile } from "../../hooks/getUserProfile.js";

function Channel() {
  const dispatch = useDispatch();
  const { username } = useParams();
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const { status, userData } = useSelector((state) => state.auth);
  const LoginPopUpDialog = useRef();
  const location = useLocation();
  console.log("userData", userData);
  console.log("Profile", profile);
  useEffect(() => {
    getUserProfile(dispatch, username).then((res) => {
      setProfile(res.data);
    });
  }, [status]);
  return <div>I am a channel component</div>;
}

export default Channel;
