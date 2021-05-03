import styles from './FocusBackground.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { focusedPhotoSelector, setFocusedPhoto, submitComment } from '../../redux/detailPhotoSlice';

import FocusCard from '../FocusCard';

const FocusBackground = (props) => {
    const dispatch = useDispatch();

    const onClick = () => {
        dispatch(setFocusedPhoto({ url: '', id: '' }));
        dispatch(submitComment(''));
    }

    const { url, id } = useSelector(focusedPhotoSelector);
    if (url && id) {
        return <div className={styles['main-wrapper']} {...props} onClick={onClick}>
            <FocusCard photo={url} id={id}/>
        </div>
    }


    return null;

};

export default FocusBackground;