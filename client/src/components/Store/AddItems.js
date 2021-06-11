import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup'
import { Col } from 'react-bootstrap';
import { useState } from 'react';
/**
 * Allows admin users to add items to the store. Used in Store.js
 * @returns A button to open the add modal, and the add modal itself
 */
export default function AddItems() {
    // Controls for Add Modal ---------------
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    // ------------------------------------

    // Values for adding fields -----------
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState(0);
    const [image, setImage] = useState("");
    // ------------------------------------

    // Handling add submission -----------
    function handleSubmit() {
        fetch("http://localhost:5000/items", {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name: name,
                description: description,
                price: price,
                image: image,
            }),
        });;
        setShow(false);
        window.location.reload();
    }
    // ------------------------------------
    return (

        <div className="Add" style={{ float: "left", paddingTop: "15px", paddingLeft: "0px" }}>
            {/* Button that opens the Add Modal */}
            <Button style={{backgroundColor:"#4C6357", border:"none"}} variant="primary" onClick={handleShow}>
                Add Item
                </Button>

            {/* Add Modal */}
            <Modal show={show} onHide={handleClose}>
                {/* Header */}
                <Modal.Header closeButton>
                    <Modal.Title>Add an Item</Modal.Title>
                </Modal.Header>

                {/* Body */}
                <Modal.Body>
                    <Form.Group>

                        {/* Item Name */}
                        <Form.Row>
                            <Form.Label column="sm" lg={2}>
                                Name
                            </Form.Label>
                            <Col>
                                <Form.Control type="text" placeholder="name" onChange={(event) => setName(event.target.value)} />
                            </Col>
                        </Form.Row>

                        <br />

                        {/* Item Description */}
                        <Form.Row>
                            <Form.Label column="sm" lg={2}>
                                Description
                            </Form.Label>
                            <Col>
                                <Form.Control type="text" placeholder="description" onChange={(event) => setDescription(event.target.value)} />
                            </Col>
                        </Form.Row>

                        <br />

                        {/* Item Price */}
                        <Form.Row>
                            <Form.Label column="sm" lg={2}>
                                Price
                            </Form.Label>
                            <InputGroup.Prepend size="sm">
                                <InputGroup.Text>$</InputGroup.Text>
                            </InputGroup.Prepend>
                            <Col>
                                <Form.Control type="text" placeholder="price" onChange={(event) => setPrice(event.target.value)} />
                            </Col>
                        </Form.Row>

                        <br />

                        {/* Item Image URL */}
                        <Form.Row>
                            <Form.Label column="sm" lg={2}>
                                Image URL
                            </Form.Label>
                            <Col>
                                <Form.Control type="text" placeholder="Image URL" onChange={(event) => setImage(event.target.value)} />
                            </Col>
                        </Form.Row>

                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                        </Button>
                    <Button variant="primary" onClick={handleSubmit}>
                        Add Item
                        </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}