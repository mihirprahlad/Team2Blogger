import { useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import DisplayItems from './DisplayItems';

export default function Store() {
    // Stuff for Cart Modal ---------------
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    // ------------------------------------

    // Fetch request to get store items
    const [items, setItems] = useState([]); // array of items

    const getItems = () => {
        fetch("http://localhost:5000/items")
            .then((res) => {
                return res.json();
            })
            .then((obj) => {
                if (obj != null) {
                    console.log("API CALL", obj);
                    if (obj.length === 0) {
                        obj = [{
                            "price": 0,
                            "name": "Items not found",
                            "description": "Items not found",
                            "image": "https://merchbar.imgix.net/product/43/1763/uvch442/UVCH442.JPG?w=360&h=360&quality=60&auto=compress%252Cformat",
                            "id": "notFound"
                        }];
                    }
                    setItems(obj);
                } else {
                    console.log("Error");
                }
            });
    };
    useEffect(() => {
        getItems();
    }, []); // add something to this dependency array later


    return (
        <div>
            {/* Header */}
            <div className="Header">
                <h1 style={{ padding: "15px" }}>Store</h1>

            </div>

            {/* Cart */}
            <div className="Cart" style={{ float: "right", padding: "15px" }}>
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
                <DisplayItems items={items} />
            </div>


        </div>
    );
}