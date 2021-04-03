import styles from './FocusCommentSection.module.css';
import FocusComment from '../FocusComment';
import FocusCommentImput from '../FocusCommentInput';
import av2 from '../../photos/avatars/av2.png';
import FocusCommentInput from '../FocusCommentInput';

const dummyData = [
    {
        avatarUrl: av2,
        nickname: 'Johhny',
        content: "That's a baseball!"
    },
    {
        avatarUrl: av2,
        nickname: 'Levi',
        content: 'OI OI OI ERWIN... PEE PEE'
    },
    {
        avatarUrl: av2,
        nickname: 'Kuciapski',
        content: 'chrum chrum'
    },
    {
        avatarUrl: av2,
        nickname: 'aha ok',
        content: 'hejka, pójdziesz ze mną do kina?'
    },
]
const FocusCommentSection = (props) => {
    const children = dummyData.map(data => <FocusComment {...data} />);
    return (
        <div className={styles['main']}>
            <div className={styles['comment-wrapper']}>
                {children}
            </div>
            <FocusCommentInput />
        </div>
    );
}

export default FocusCommentSection;