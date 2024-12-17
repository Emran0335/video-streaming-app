import { useEffect, useState } from "react";
import { FaRegPlayCircle } from "react-icons/fa";
import InfiniteScroll from "react-infinite-scroll-component";
import { useSelector } from "react-redux";
import { icons } from "../assets/Icons.jsx";
import GuestComponet from "../components/GuestPages/GuestComponent.jsx";
import GuestSubscriptions from "../components/GuestPages/GuestSubscriptions.jsx";
import VideoCard from "../components/Video/VideoCard.jsx";
import axiosInstance from "../utils/axios.helper.js";

function Subscriptions() {
  const [videos, setVideos] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [hasMore, setHasMore] = useState(true);
  const authState = useSelector((state) => state.auth.state);

  const getData = async (page) => {
    try {
      const response = await axiosInstance.get(
        `/videos/s/subscription?page=${page}&limit=20`
      );

      if (response?.data?.success) {
        setVideos((prevVideos) => [...prevVideos, ...response.data.data]);
        setLoading(false);

        if (response.data.data.length !== 20) {
          setHasMore(false);
        }
      }
    } catch (error) {
      console.log("Error fetching videos", error);
    }
  };

  useEffect(() => {
    if (authState) {
      getData(page);
    }
  }, [page]);

  const fetchMoreData = () => {
    setPage((prevPage) => prevPage + 1);
  };

  if (!authState) {
    return <GuestSubscriptions />;
  }

  if (loading) {
    return (
      <span className="flex justify-center mt-20">{icons.bigLoading}</span>
    );
  }

  if (videos?.length === 0) {
    return (
      <GuestComponet
        icon={
          <span className="w-full h-full flex items-center p-4">
            <FaRegPlayCircle className="w-32 h-32" />
          </span>
        }
        titel="No Videos Avaiable"
        subTitle="Either you don't have any subscrided channels or your subscribed channels have no videos"
        guest={false}
      />
    );
  }
  return (
    <div className="overflow-auto">
      <InfiniteScroll
        dataLength={videos.length}
        next={fetchMoreData}
        hasMore={hasMore}
        loader={
          <div className="flex justify-center h-7 mt-1">{icons.loading}</div>
        }
        scrollableTarget="scrollableDiv"
      >
        <div className="overflow-hidden mb-2 mx-2">
          <div
            className={`gird grid-cols-[repeat(auto-fit,_minmax(300px,_1fr))] gap-2 ${
              videos.length < 4 &&
              "sm:grid-cols-[repeat(auto-fit,_minmax(300px,0.34fr))] 2xl:grid-cols-[repeat(auto-fit,_minmax(300px,0.24fr))]"
            }`}
          >
            {videos.map((video) => (
              <VideoCard key={video._id} video={video} />
            ))}
          </div>
        </div>
      </InfiniteScroll>
    </div>
  );
}

export default Subscriptions;
