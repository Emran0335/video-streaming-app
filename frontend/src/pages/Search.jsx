import React, { useEffect, useState } from "react";
import { IoPlayOutline } from "react-icons/io5";
import InfiniteScroll from "react-infinite-scroll-component";
import { useParams } from "react-router-dom";
import { icons } from "../assets/Icons.jsx";
import GuestComponent from "../components/GuestPages/GuestComponent.jsx";
import axiosInstance from "../utils/axios.helper.js";

function Search() {
  const [videos, setVideos] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const { query } = useParams();
  const [prevQuery, setPrevQuery] = useState("");

  const fetchVideos = async (page) => {
    setError("");
    try {
      const response = await axiosInstance.get(
        `/videos?query=${query}&page=${page}&limit=10`
      );

      if (response.data?.data?.length > 0) {
        setVideos((prev) => [...prev, ...response.data.data]);

        if (response.data.data.length !== 10) {
          setHasMore(false);
        }
      } else {
        setHasMore(false);
        setError(
          <GuestComponent
            title="No videos found"
            subTitle="There are no videos here for your search result. Please try to search something else."
            icon={
              <span className="w-full h-full flex items-center p-2">
                <IoPlayOutline className="w-28 h-28" />
              </span>
            }
            guest={false}
          />
        );
      }
    } catch (error) {
      setError(
        <p className="flex text-xl justify-center mt-20">
          An error occured while fetching videos .{error}
        </p>
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (query !== prevQuery) {
      setVideos([]);
      setPage(1);
      setHasMore(true);
      setLoading(true);
    }
    fetchVideos(1);
    setPrevQuery(query);
  }, [query]);

  const fetchMoreData = () => {
    if (hasMore) {
      setPage((prevPage) => prevPage + 1);
    }
  };
  return (
    <div>
      {loading ? (
        <span className="flex justify-center mt-20">{icons.bigLoading}</span>
      ) : (
        <div>
          {error ? (
            error
          ) : (
            <InfiniteScroll
              dataLength={videos.length}
              next={fetchMoreData}
              hasMore={hasMore}
              loader={
                <div className="flex justify-center h-7 mt-1">
                  {icons.bigLoading}
                </div>
              }
            ></InfiniteScroll>
          )}
        </div>
      )}
    </div>
  );
}

export default Search;
