import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { useState, useContext, useEffect } from 'react';
import { UserContext } from "../../contexts/UserContext.js";
import { CartContext } from "../../contexts/CartContext.js";
import DisplayCart from "./DisplayCart";
export default function Cart(props) {

    // Stuff for Cart Modal ---------------
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    // ------------------------------------

    // Stuff for Cart ---------------------
    const { user } = useContext(UserContext);
    const { cart, setCart } = useContext(CartContext);
    console.log("Cart in Cart.js", cart);
    // ------------------------------------

    // If someone is signed in, make cart useContext their personal cart
    const getUserCart = () => {
        if (user){
            fetch(`http://localhost:5000/users/${user.id}/shopping-cart`)
            .then((res) => {
                return res.json();
            })
            .then((obj) => {
                if (obj != null) {
                    console.log("User Cart", obj);
                    if (obj.length === 0) { // if obj array is empty, make it a dummy object
                        obj = [{
                            "price": 0,
                            "name": "Nothing in cart",
                            "description": "",
                            "image": "",
                            "id": ""
                        }];
                    }
                    setCart(obj);
                } else {
                    console.log("Error");
                }
            });
        }
    };

    useEffect(() => {
        getUserCart();
    }, [show]);
    
    
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
                    <DisplayCart cart={cart}/>
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