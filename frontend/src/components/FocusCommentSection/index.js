import { useEffect, useState } from 'react';
import { useAuth } from '../../utils/Auth.js';
import styles from './FocusCommentSection.module.css';
import FocusComment from '../FocusComment';
import av2 from '../../photos/avatars/av2.png';
import { commentSelector, focusedPhotoSelector } from '../../redux/detailPhotoSlice';
import { useSelector } from 'react-redux';
import FocusCommentInput from '../FocusCommentInput';
import InfiniteScroll from 'react-infinite-scroll-component';
import axios from 'axios';

const _COMMENTS_SERVICE_URL = process.env.REACT_APP_COMMENTS_SERVICE_URL;

const FocusCommentSection = (props) => {
    const auth = useAuth();
    const [comments, setComments] = useState([]);
    const [page, setPage] = useState(0);
    const [hasMore, setHasMore] = useState(true);
    const comment = useSelector(commentSelector);
    const focusedPhoto = useSelector(focusedPhotoSelector);

    const fetchCommentsOnScroll = async () => {
        const options = {
            headers: {
                Authorization: `Bearer ${auth.token}`
            }
        }

        const { id } = focusedPhoto;
        const response = await axios.get(`${_COMMENTS_SERVICE_URL}/photo/${id}?pageNum=${page}&pageSize=30`, options);
        const data = response.data;

        if (data.length !== 0) {
            const _comments = data.map(d => {
                const { _id, ...rest } = d;
                return <FocusComment avatarUrl={av2} key={_id} {...rest} />
            });
            setComments(comments.concat(_comments));
            setHasMore(data.length ? true : false);
            setPage(page + 1);
        }
    }

    useEffect(() => {
        fetchCommentsOnScroll();
    }, []);

    useEffect(() => {
        const { value } = comment;
        if (value) {
            const _newComment = <FocusComment avatarUrl={av2} key={Date.now()} displayName={auth.user.displayName} content={value} timestamp={Date.now()}/>
            setComments([_newComment, ...comments]);
        }
    }, [comment]);

    return (
        <div className={styles['main']}>
            <div id="scrollable" className={styles['comment-wrapper']}>
                <InfiniteScroll
                    dataLength={comments.length}
                    next={fetchCommentsOnScroll}
                    hasMore={hasMore}
                    endMessage={<span>koniec komentarzy</span>}
                    scrollableTarget="scrollable"
                >
                    <FocusCommentInput />
                    {comments}
                </InfiniteScroll>
            </div>
        </div>

    );
}

export default FocusCommentSection;