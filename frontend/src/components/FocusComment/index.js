import styles from './FocusComment.module.css';

const FocusComment = (props) => {
    const { avatarUrl, displayName, content, timestamp } = props;
    return (
        <div className={styles['main']}>
            <Header className={styles['header']}>
                <Avatar value={avatarUrl} className={styles['avatar']}/>
                <Nickname value={displayName} className={styles['nickname']}/>
                <Timestamp value={timestamp} className={styles['date']}/>
            </Header>
            <Content value={content} className={styles['content']}/>
        </div>
    );
};

export default FocusComment;


const Avatar = ({value, className}) => <img src={value} alt='avatar' className={className}/>
const Nickname = ({value, className}) => <span className={className}>{value}</span>
const Header = ({children, className}) => <div className={className}>{children}</div>;
const Content = ({value, className}) => <span className={className}>{value}</span>
const Timestamp = ({value, className}) => <span className={className}>{value}</span>