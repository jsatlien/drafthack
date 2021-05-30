import React, { useState, useRef } from 'react';
import axios from 'axios';

function FileUpload() {
    const [fileData, setFileData] = useState('');
    const nameRef = useRef();
    const getFile = e => {
        setFileData(e.target.files[0]);
    };

    const uploadFile = e => {
        e.preventDefault();
        const data = new FormData();
        data.append('rankingFile', fileData);
        if (nameRef.current.value) {
            axios({
                method: 'POST',
                url: '/api/upload/rankings?name=' + nameRef.current.value,
                data: data,
            }).then((res) => {
                console.log("success!")
            });
        }
    };

    return (
        <form onSubmit={uploadFile}>
            <input type='text' name='name' ref={nameRef} required />
            <input type='file' name='rankingFile' onChange={getFile} required />
            <input type='submit' name='upload' value='Upload' />
        </form>
    );
}

export default FileUpload;