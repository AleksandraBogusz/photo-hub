import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

import { useDispatch } from 'react-redux';
import { setFocusedPhoto } from '../redux/detailPhotoSlice'

const Post = (props) => {
  const dispatch = useDispatch()
  const { src, description, id } = props;
  return (
    <div>
      <LazyLoadImage
        src={src}
        alt={description}
        onClick={() => {
          dispatch(setFocusedPhoto({ url: src, id }));
        }}
        className="container-img"
        effect="blur"
      />
    </div>
  );
};

export default Post;
