import React from 'react';
import { Form } from 'react-bootstrap';

function SelectList({ options, onSelect }) {
    return (
        <Form>
            <Form.Group controlId="exampleForm.ControlSelect1">
                <Form.Label>Select List</Form.Label>
                <Form.Control as="select" onChange={onSelect} >
                    {options.map(list => <option key={list._id} value={list._id}>{list.name}</option>)}
                </Form.Control>
            </Form.Group>
        </Form>
    )
}

export default SelectList;