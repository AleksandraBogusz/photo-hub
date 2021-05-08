import styles from './Photo.module.css';

const Photo = (props) => {
    return (<img className={styles['main']} {...props}/>);
}

export default Photo;