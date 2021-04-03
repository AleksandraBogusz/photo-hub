import React, { useState } from "react";
import Post from "./Post";
import "../styles/PostList.css";

export const PostList = (props) => {
  const [photo, setPhoto] = useState("");
  const photos = props.photos;

  const list = photos.map((photo) => {
    return <Post src={photo.url} description={photo.description} key={photo.id} setPhoto={setPhoto} />;
  });
  return (
    <div className="container-wrapper">
      <div className="container">
        {list}
      </div>
    </div>
  );
};

