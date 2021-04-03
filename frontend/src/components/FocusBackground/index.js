import styles from './FocusBackground.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { detailPhotoUrlSelector, changeUrl } from '../../redux/detailPhotoSlice';

import Photo from '../Photo';
import FocusCard from '../FocusCard';

const FocusBackground = (props) => {
    const dispatch = useDispatch();
    const src = useSelector(detailPhotoUrlSelector);
    // return <img alt='photo' className={styles['img-disp']} {...props} />
    if (src) {
        return <div className={styles['main-wrapper']} {...props} onClick={() => dispatch(changeUrl(''))}>
            {/* <Photo alt='photo' src={src} /> */}
            <FocusCard photo={src}/>
        </div>
    }


    return null;

};

export default FocusBackground;