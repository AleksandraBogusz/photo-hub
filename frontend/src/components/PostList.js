import React, { useState } from "react";
import Post from "./Post";
import PostDetails from "./PostDetails";
import "../styles/PostList.css";

export const PostList = (props) => {
  const [photo, setPhoto] = useState("");
  const photos = props.photos;
  const list = photos.map((photo) => {
    return <Post src={photo} key={photo.id} setPhoto={setPhoto} />;
  });
  return (
    <div className="container-wrapper">
      <div className="container">
        <PostDetails photo={photo} setPhoto={setPhoto} />
        {list}
      </div>
    </div>
  );
};

