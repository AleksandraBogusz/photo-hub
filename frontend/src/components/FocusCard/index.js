import styles from './FocusCard.module.css';
import Photo from '../Photo';
import FocusCommentSection from '../FocusCommentSection';

const FocusCard = (props) => {

    const { photo, ...rest } = props;
    return(
    <div className={styles['main']} onClick={e => e.stopPropagation()}>
        <Photo src={photo}/>
        <FocusCommentSection />
    </div>
    )
}

export default FocusCard;