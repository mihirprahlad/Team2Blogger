import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { useState, useContext, useEffect } from 'react';
import { UserContext } from "../../contexts/UserContext.js";
import { CartContext } from "../../contexts/CartContext.js";
import { CartUpdate } from "../../contexts/CartUpdate.js";
import DisplayCart from "./DisplayCart";
import { RiShoppingCartLine } from "react-icons/ri";

/**
 * Driver for displaying the user's cart. Used in Store.js
 * @returns A button to view the cart and a modal that displays the cart info
 */
export default function Cart() {

    // Stuff for Cart Modal ---------------
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    // ------------------------------------

    // Stuff for Cart ---------------------
    const { user } = useContext(UserContext);
    const { cart, setCart } = useContext(CartContext);
    const { update } = useContext(CartUpdate);
    console.log("Cart in Cart.js", cart);
    // ------------------------------------

    // If someone is signed in, make cart useContext their personal cart
    const getUserCart = () => {
        if (user) {
            fetch(`http://localhost:5000/users/${user.id}/shopping-cart`)
                .then((res) => {
                    return res.json();
                })
                .then((obj) => {
                    if (obj != null) {
                        console.log("User Cart", obj);
                        setCart(obj);
                    } else {
                        console.log("Error");
                    }
                });
        }
    };

    useEffect(() => {
        getUserCart();
    }, [show, update]);


    return (
        <div className="Cart" style={{ float: "right", marginRight: "100px", padding: "14px" }}>
            {/* View Cart button */}
            <RiShoppingCartLine size={40} onClick={handleShow} />

            {/* Cart Modal */}
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Cart</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {/* If cart is not empty, display cart. Otherwise, display a message. */}
                    {cart.length !== 0 ? <DisplayCart cart={cart} /> : "Nothing in cart."}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}