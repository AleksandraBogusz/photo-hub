import styles from './FocusCommentInput.module.css';

const FocusCommentInput = (props) => {
    return (
        <div className={styles['main']}>
            <a href="#" className={styles['publish-link']}>+</a>
            <textarea className={styles['textarea']} placeholder='Dodaj swój komentarz.'></textarea>
        </div>
    );
};

export default FocusCommentInput;