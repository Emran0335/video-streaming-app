import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

function LikedVideos() {
  [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    getUserLikedVideos(dispatch).then(() => setLoading(false));
  }, []);

  const likedVideos = useSelector((state)=> state.user.userLikedVideos);
  return <div>LikedVideos</div>;
}

export default LikedVideos;
