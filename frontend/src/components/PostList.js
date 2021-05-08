import React from "react";
import Post from "./Post";
import "../styles/PostList.css";

export const PostList = (props) => {
  const { photos } = props;

  const list = photos.map((photo) => {
    const { url, description, image_id } = photo;
    return <Post src={url} description={description} key={image_id} id={image_id}/>;
  });
  return (
    <div className="container-wrapper">
      <div className="container">
        {list}
      </div>
    </div>
  );
};

