import { useState } from "react";
import Video from "./Video";
const VideoLists = ({ allVideos, getAllVideos }) => {
  const [order, setOrder] = useState("desc");
  const [search, setSearch] = useState("")

  const orderHandle = (e) => {
    const newOrder = e.target.value;
    setOrder(newOrder);
    getAllVideos(search,newOrder);
  };

  const searchHandle = async (e) => {
    const searchText = e.target.value
    setSearch(searchText)
    getAllVideos(searchText, order)
  }

  return (
    <>
      <div className="features">
        <div className="search-videos">
          <label>Search by title </label>
          <input
            type="text"
            placeholder="Enter title..."
            onChange={searchHandle}
          />
        </div>
        <div className="order-videos">
          <label>Order by votes </label>
          <select value={order} onChange={orderHandle}>
            <option value="desc">Desc</option>
            <option value="asc">Asce</option>
          </select>
        </div>
      </div>
      <div className="video-lists">
        {allVideos.map((video) => (
          <Video
            key={video.id}
            id={video.id}
            rating={video.rating}
            title={video.title}
            url={video.url}
            getAllVideos={getAllVideos}
          />
        ))}
      </div>
    </>
  );
};

export default VideoLists;
