import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

const Post = (props) => {
  return (
    <div>
      <LazyLoadImage
        src={props.src}
        alt={props.description}
        onClick={() => {
          props.setPhoto(props.src);
        }}
        className="container-img"
        effect="blur"
      />
    </div>
  );
};

export default Post;
