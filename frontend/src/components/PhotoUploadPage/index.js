import React, { useState, useRef, useEffect } from 'react';
import styles from './PhotoUploadPage.module.css';
import axios from 'axios';
import { useAuth } from '../../utils/Auth';
import { WithContext as ReactTags } from 'react-tag-input';

const UPLOAD_SERVICE_URL = process.env.REACT_APP_UPLOAD_SERVICE_URL;

const KeyCodes = {
    comma: 188,
    enter: 13,
};

const delimiters = [KeyCodes.comma, KeyCodes.enter];

const PhotoUploadPage = (props) => {
    const auth = useAuth();

    const fileRef = useRef();
    const [title, setTitle] = useState('');
    const [tags, setTags] = useState('');
    const [description, setDescription] = useState('');
    const [file, setFile] = useState(null);

    const [_tags, _setTags] = useState([]);

    const submitPhoto = async (event) => {

        const tag = _tags.map(({ text }) => text).join(', ');

        console.log(tag);

        const body = new FormData();
        body.append("title", title);
        body.append("tag", tag);
        body.append("description", description)
        body.append("main-photo", file);

        const options = {
            headers: {
                Authorization: `Bearer ${auth.token}`
            }
        }

        const response = await axios.post(UPLOAD_SERVICE_URL, body, options);

        setTitle('');
        setTags('');
        setDescription('');
        setFile(null);
        fileRef.current.value = '';
    }

    const handleDelete = (i) => _setTags(_tags.filter((tag, index) => index !== i))
    const handleAddition = (tag) => _setTags([..._tags, tag])
    const handleDrag = () => _tags

    return (
        <div>
            <form onSubmit={e => e.preventDefault()}>
                <img src={file === null ? '/solid-gray.svg' : URL.createObjectURL(file)} alt="image" className={styles['photo']} />

                <input type="file" ref={fileRef} onChange={e => { setFile(e.target.files[0]) }} />

                <input type="text" placeholder="Title" value={title} onChange={e => setTitle(e.target.value)} />
                <input type="text" placeholder="Description" value={description} onChange={e => setDescription(e.target.value)} />
                <ReactTags
                    tags={_tags}
                    handleDelete={handleDelete}
                    handleAddition={handleAddition}
                    handleDrag={handleDrag}
                    delimiters={delimiters}
                />
                <input type="submit" value="send photo" onClick={submitPhoto} />
            </form>
            
        </div>
    )
}

export default PhotoUploadPage;