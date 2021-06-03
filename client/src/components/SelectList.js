import React from 'react';
import { Form } from 'react-bootstrap';

function SelectList({ defaultMessage, options, onSelect }) {
    return (
        <Form>
                <Form.Control as="select" onChange={onSelect} >
                    {defaultMessage ? <option value='default' key='default'>{defaultMessage}</option> : ""}
                    {options.map(list => <option key={list._id} value={list._id}>{list.name}</option>)}
                </Form.Control>
        </Form>
    )
}

export default SelectList;