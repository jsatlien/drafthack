import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Col, Container, Row } from 'react-bootstrap';

function Home() {
    return (
        <div>
            <Container className='pt-5'>
                <Row className='pt-5'>
                    <Col sm='4' className='text-center'>
                        <Link to='/dashboard?new=1'><Button>New Draft</Button></Link>
                    </Col>
                    <Col className='text-center' sm='4'>
                        <Link to='/dashboard'><Button>Resume Draft</Button></Link>
                    </Col>
                    <Col className='text-center' sm='4'>
                        <Link to='/upload'><Button>Upload Rankings</Button></Link>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default Home;