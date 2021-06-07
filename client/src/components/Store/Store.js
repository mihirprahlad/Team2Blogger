import { useState } from "react";
import Card from 'react-bootstrap/Card';
import CardDeck from 'react-bootstrap/CardDeck';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button'

export default function Store() {
    // Stuff for Cart Modal ---------------
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    // ------------------------------------

    return (
        <div>
            {/* Header */}
            <div className="Header">
                <h1 style={{ padding: "15px" }}>Store</h1>
                
            </div>

            {/* Cart */}
            <div className="Cart" style={{float: "right", padding: "15px"}}>
                <Button variant="primary" onClick={handleShow}>
                    View Cart
                </Button>

                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Cart</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>INSERT CART HERE</Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Close
                        </Button>
                        <Button variant="primary" onClick={handleClose}>
                            Save Changes
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
            <br />

            {/* Item Cards */}
            <div className="CardContainer" style={{ margin: "auto", width: "50%" }}>
                <CardDeck>


                    <Card>
                        <Card.Img variant="top" src="holder.js/100px160" />
                        <Card.Body>
                            <Card.Title>Card title</Card.Title>
                            <Card.Text>
                                This is a wider card with supporting text below as a natural lead-in to
                                additional content. This content is a little bit longer.
                        </Card.Text>
                        </Card.Body>
                        <Card.Footer>
                            <small className="text-muted">Last updated 3 mins ago</small>
                        </Card.Footer>
                    </Card>



                    <Card>
                        <Card.Img variant="top" src="holder.js/100px160" />
                        <Card.Body>
                            <Card.Title>Card title</Card.Title>
                            <Card.Text>
                                This card has supporting text below as a natural lead-in to additional content.{' '}
                            </Card.Text>
                        </Card.Body>
                        <Card.Footer>
                            <small className="text-muted">Last updated 3 mins ago</small>
                        </Card.Footer>
                    </Card>



                    <Card>
                        <Card.Img variant="top" src="holder.js/100px160" />
                        <Card.Body>
                            <Card.Title>Card title</Card.Title>
                            <Card.Text>
                                This is a wider card with supporting text below as a natural lead-in to
                                additional content. This card has even longer content than the first to
                                show that equal height action.
                        </Card.Text>
                        </Card.Body>
                        <Card.Footer>
                            <small className="text-muted">Last updated 3 mins ago</small>
                        </Card.Footer>
                    </Card>


                </CardDeck>
            </div>

        </div>
    );
}