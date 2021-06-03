import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';

function MainNav ({ title }) {
    return (
        <Navbar>
            <Navbar.Brand className='mx-auto'>
                {title}
            </Navbar.Brand>
        </Navbar>
    )
}

export default MainNav;