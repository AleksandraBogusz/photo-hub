import { useState } from 'react';
import { useAuth } from '../../utils/Auth';
import { useDispatch, useSelector } from 'react-redux';
import { submitComment, focusedPhotoSelector } from '../../redux/detailPhotoSlice';
import axios from 'axios';
import styles from './FocusCommentInput.module.css';

const _MAX_COMMENT_LENGTH = 200;
const _COMMENTS_SERVICE_URL = process.env.REACT_APP_COMMENTS_SERVICE_URL;

const FocusCommentInput = (props) => {
    const auth = useAuth();
    const dispatch = useDispatch();
    const focusedPhoto = useSelector(focusedPhotoSelector);
    const [comment, setComment] = useState('');
    const [commentLength, setCommentLength] = useState(0);

    const onCommentChange = (event) => {
        const value = event.target.value;
        const length = value.length;
        if (length <= _MAX_COMMENT_LENGTH) {
            setComment(value);
            setCommentLength(length);
        }
    }

    const onCommentSubmit = async (event) => {
        const options = {
            headers: {
                Authorization: `Bearer ${auth.token}`
            }
        }

        const { displayName, uuid } = auth.user;
        const body = {
            owner_id: uuid,
            displayName,
            content: comment,
        }

        const { id } = focusedPhoto;

        const response = await axios.post(
            `${_COMMENTS_SERVICE_URL}/photo/${id}`,
            body,
            options
        );
        const data = response.data;

        setComment('');
        setCommentLength(0);
        dispatch(submitComment(comment));
    }

    return (
        <div className={styles['main']}>
            <span className={styles['comment-len']}>{`${commentLength}/${_MAX_COMMENT_LENGTH}`}</span>
            <button onClick={onCommentSubmit} className={styles['publish-btn']}>Publish</button>
            <textarea
                onChange={onCommentChange}
                value={comment}
                className={styles['textarea']}
                placeholder='Dodaj swój komentarz.'></textarea>
        </div>
    );
};

export default FocusCommentInput;