import { useEffect, useState } from 'react';
import { useAuth } from '../../utils/Auth.js';
import styles from './FocusCommentSection.module.css';
import FocusComment from '../FocusComment';
import av2 from '../../photos/avatars/av2.png';
import FocusCommentInput from '../FocusCommentInput';
import axios from 'axios';

const _COMMENTS_SERVICE_URL = process.env.REACT_APP_COMMENTS_SERVICE_URL;

const FocusCommentSection = (props) => {
    const auth = useAuth();
    const [comments, setComments] = useState([]);

    useEffect(async () => {
        const options = {
            headers: {
              Authorization: `Bearer ${auth.token}`
            }
          }
        const response = await axios.get(`${_COMMENTS_SERVICE_URL}/photo/0`, options);

        if (response.data.length != 0) {
            const mappedComments = response.data.comments.map(comment => {
                const { display_name, content } = comment;
                return <FocusComment avatarUrl={av2} nickname={display_name} content={content}/>
            });

            setComments(mappedComments);
        }
    }, []);

    return (
        <div className={styles['main']}>
            <div className={styles['comment-wrapper']}>
                {comments}
            </div>
            <FocusCommentInput />
        </div>
    );
}

export default FocusCommentSection;