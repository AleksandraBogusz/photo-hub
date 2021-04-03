import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

import { useDispatch } from 'react-redux';
import { changeUrl } from '../redux/detailPhotoSlice'

const Post = (props) => {
  const dispatch = useDispatch()

  return (
    <div>
      <LazyLoadImage
        src={props.src}
        alt={props.description}
        onClick={() => {
          dispatch(changeUrl(props.src))
        }}
        className="container-img"
        effect="blur"
      />
    </div>
  );
};

export default Post;
