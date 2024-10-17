import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeUserLikedVideos } from "../store/userSlice";
import { getUserLikedVideos } from "../hooks/getUserLikedVideos";

function LikedVideos() {
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const dispatch = useDispatch();
  const status = useSelector((state) => state.auth.status);

  useEffect(() => {
    if (status) {
      if (page === 1) {
        dispatch(removeUserLikedVideos());
      }
      getUserLikedVideos(dispatch, page).then((res) => {
        setLoading(false);
        if (res.data.length !== 10) {
          setHasMore(false);
        }
      });
    }
  }, [status, page]);

  const likedVideos = useSelector((state) => state.user.userLikedVideos);
  console.log(likedVideos);
  return <div>LikedVideos</div>;
}

export default LikedVideos;
