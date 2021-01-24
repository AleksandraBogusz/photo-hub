import { ListGroupItem } from "react-bootstrap";
import React from "react";
import av1 from "../photos/avatars/av1.png";
import av2 from "../photos/avatars/av2.png";
import av3 from "../photos/avatars/av3.png";
import av4 from "../photos/avatars/av4.png";

import "../styles/Comment.css";
const list = [
  {
    id: 1,
    text: "Amazing ",
    avatar: av1,
  },
  {
    id: 2,
    text: "Cute <3",
    avatar: av4,
  },
  {
    id: 3,
    text: "Sweet",
    avatar: av3,
  },
  {
    id: 4,
    text: "Cool",
    avatar: av2,
  },
  {
    id: 5,
    text: ":) ;)",
    avatar: av3,
  },
  {
    id: 6,
    text: "Pretty",
    avatar: av1,
  },
  {
    id: 7,
    text: "Great",
    avatar: av3,
  },
];

const Comment = () =>
  list.map((item) => {
    return (
      <ListGroupItem>
        <img src={item.avatar} alt={item.id} className="list-group-item-img" />
        {item.text}
      </ListGroupItem>
    );
  });

export default Comment;
