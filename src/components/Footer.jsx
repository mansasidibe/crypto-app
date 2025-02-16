import React from 'react';
import { Github, Twitter, Globe } from 'lucide-react';
import { Container, Row, Col, Button, Form } from 'react-bootstrap';

const Footer = ({ darkMode }) => {
  return (
    <footer className={`${darkMode ? 'bg-dark text-light' : 'bg-light text-dark'} py-5`}>
      <Container>
        <Row className="justify-content-between align-items-center">
          <Col xs={12} md={4} className="mb-3 mb-md-0 text-center text-md-left">
            <h3 className="text-lg font-semibold">Mansa SIDIBE </h3>
          </Col>
          
          <Col xs={12} md={4} className="text-center">
            <div className="d-flex justify-content-center mb-3">
              <a href="https://github.com/mansasidibe" target="_blank" rel="noopener noreferrer" className="mx-2 text-decoration-none">
                <Button variant="link" className="text-light hover:text-primary">
                  <Github size={24} />
                </Button>
              </a>
              <a href="http://sidibe-arouna.vercel.app/" target="_blank" rel="noopener noreferrer" className="mx-2 text-decoration-none">
                <Button variant="link" className="text-light hover:text-primary">
                  <Globe size={24} />
                </Button>
              </a>
            </div>
          </Col>
        </Row>

        <Row>
          <Col xs={12} className="text-center">
            <p>&copy; {new Date().getFullYear()} All rights reserved.</p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
