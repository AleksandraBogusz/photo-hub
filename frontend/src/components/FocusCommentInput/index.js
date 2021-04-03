import styles from './FocusCommentInput.module.css';

const FocusCommentInput = (props) => {
    return (
        <div className={styles['main']}>
            <textarea className={styles['textarea']} placeholder='Po naciśnięciu na to pole scrollbar się psuje.'></textarea>
        </div>
    );
};

export default FocusCommentInput;