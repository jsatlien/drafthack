import React, { useState, useRef } from 'react';
import API from '../utils/API';
import { Form, Button } from 'react-bootstrap';

function FileUpload() {
    const [fileData, setFileData] = useState('');
    const nameRef = useRef();
    const typeRef = useRef();

    const getFile = e => {
        setFileData(e.target.files[0]);
    };

    const uploadFile = e => {
        e.preventDefault();
        console.log(nameRef.current.value);
        console.log(typeRef.current.value);
        console.log(fileData);
        const uploadType = typeRef.current.value;
        if (nameRef.current.value && uploadType && fileData) {
            //tiersFile
            const data = new FormData();

            data.append('rankingFile', fileData);

            try {
                console.log(uploadType)

                switch (uploadType) {
                    case 'rankings':
                        console.log('hit rankings route')
                        API.uploadRankings(nameRef.current.value, data, 'standard').then((res) => {
                            console.log('success!')
                        });
                        break;
                    case 'tiers':
                        console.log('hit tiers route')
                        API.uploadTiers(nameRef.current.value, data).then(res => {
                            console.log('success')
                        });
                        break;
                    case 'flex-rankings': 
                        console.log('hit flex route')
                        API.uploadTiers(nameRef.current.value, data, true).then(res => {
                            console.log('success')
                        });
                    break;
                }

            } catch (e) {
                console.log(e);
            }
        }
    };

    return (
        <>
            <Form onSubmit={uploadFile}>
                <Form.Group controlId='formBasicEmail'>
                    <Form.Label>List Name</Form.Label>
                    <Form.Control type='text' name='name' ref={nameRef} required />
                </Form.Group>
                <Form.Group>
                    <Form.File id='uploadFile' name='rankingFile' label='upload csv' onChange={getFile} />
                </Form.Group>
                <Form.Label className="my-1 mr-2" htmlFor="inlineFormCustomSelectPref">
                    Preference
                </Form.Label>
                <Form.Control
                    as="select"
                    className="my-1 mr-sm-2"
                    id="chooseUploadType"
                    ref={typeRef}
                >
                    {/* TODO this should come from the db eventually */}
                    <option value="rankings">Standard Rankings</option>
                    <option value="tiers">Tiers</option>
                    <option value="flex-rankings">Flex Tiers</option>
                </Form.Control>
                <Button variant="primary" type="submit" name='upload'>
                    Upload
                </Button>
            </Form>
        </>
    );
}

export default FileUpload;