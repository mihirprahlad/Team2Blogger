import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { useState, useContext } from 'react';
import { UserContext } from "../../contexts/UserContext.js";
import { CartContext } from "../../contexts/CartContext.js";
export default function Cart(props) {

    // needs an array of items in the cart...
    // possibly a usecontext?

    // Stuff for Cart Modal ---------------
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    // ------------------------------------

    // Stuff for Cart
    const { user, setUser } = useContext(UserContext);
    const { cart, setCart } = useContext(CartContext);
    console.log("Cart in Cart.js", cart);
    
    return (
        <div className="Cart" style={{ float: "right", padding: "15px" }}>
            <Button variant="primary" onClick={handleShow}>
                View Cart
                </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Cart</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    INSERT CART HERE
                </Modal.Body>
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
    );
}