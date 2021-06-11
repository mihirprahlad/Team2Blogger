import { RiEditBoxLine } from "react-icons/ri";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup'
import { Col } from 'react-bootstrap';
import { useState } from 'react';

export default function EditItems(props) {
    // Controls for Edit Modal ---------------
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    // ------------------------------------

    // Values for editing fields -----------
    const [name, setName] = useState(props.name);
    const [description, setDescription] = useState(props.description);
    const [price, setPrice] = useState(props.price);
    const [image, setImage] = useState(props.image);
    const id = props.id;
    // ------------------------------------

    // Handling edit submission -----------
    function handleSubmit() {
        console.log(`http://localhost:5000/items/update/${id}`)
        fetch(`http://localhost:5000/items/${id}`, {
            method: "PUT",
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
        <div className="Cart" >
            {/* Icon that opens the Edit Modal */}
            <div style={{ float: "right", padding: "15px" }}>
                <RiEditBoxLine onClick={handleShow} />
            </div>


            {/* Edit Modal */}
            <Modal show={show} onHide={handleClose}>
                {/* Header */}
                <Modal.Header closeButton>
                    <Modal.Title>Edit {name}</Modal.Title>
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
                                <Form.Control type="text" value={name} onChange={(event) => setName(event.target.value)} />
                            </Col>
                        </Form.Row>

                        <br />

                        {/* Item Description */}
                        <Form.Row>
                            <Form.Label column="sm" lg={2}>
                                Description
                            </Form.Label>
                            <Col>
                                <Form.Control type="text" value={description} onChange={(event) => setDescription(event.target.value)} />
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
                                <Form.Control type="text" value={price} onChange={(event) => setPrice(event.target.value)} />
                            </Col>
                        </Form.Row>

                        <br />

                        {/* Item Image URL */}
                        <Form.Row>
                            <Form.Label column="sm" lg={2}>
                                Image URL
                            </Form.Label>
                            <Col>
                                <Form.Control type="text" value={image} onChange={(event) => setImage(event.target.value)} />
                            </Col>
                        </Form.Row>

                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                        </Button>
                    <Button variant="primary" onClick={handleSubmit}>
                        Save Changes
                        </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}
