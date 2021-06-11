import Button from "react-bootstrap/Button";
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';
// import Alert from 'react-bootstrap/Alert'
import { CartContext } from "../../contexts/CartContext.js";
import { UserContext } from "../../contexts/UserContext.js";
import { useContext, useState } from 'react';
export default function AddToCart(props) {
    const { cart, setCart } = useContext(CartContext);
    const { user } = useContext(UserContext);
    const item = props.item; // what is being added to the cart
    const [show, setShow] = useState(false);

    const popover = (
        <Popover id="popover-basic">
            {/* <Popover.Title as="h3">Popover right</Popover.Title> */}
            <Popover.Content>
                Added to Cart
          </Popover.Content>
        </Popover>
    );

    const handleSubmit = () => {
        if (!user) { // if not signed in, do this: add item to useContext cart
            // Used for duplicate checking
            let duplicate = false;
            const seen = new Set();
            // ---------------------------

            // Increment quantity if duplicate exists
            cart.map((cartItem) => (
                item.id === cartItem.id ? (cartItem.quantity = parseInt(cartItem.quantity) + 1) : duplicate = false
            ))

            // If duplicate does not exist, add to cart with quantity 1
            if (!duplicate) {
                let newCart = cart;
                newCart.push({ ...item, quantity: 1 });
                console.log("newCart", newCart);
                setCart(newCart);
                console.log(cart);
            }

            // Take out any duplicates
            const filteredArr = cart.filter(element => {
                const duplicate = seen.has(element.id);
                seen.add(element.id);
                return !duplicate;
            });

            // Set cart to filtered array w/o duplicates
            filteredArr.length > 0 ? setCart(filteredArr) : setCart(cart);

        } else { // if signed in, do this: add item to a user's cart in the database
            console.log("adding item ID", item.id, "to cart of ID:", user.id);
            fetch(`http://localhost:5000/users/${user.id}/shopping-cart`, {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    item_id: item.id
                }),
            });
        }
        setShow(true);
    }
    return (
        <div>
            {/* {show ?
                <Alert variant="success" onClose={() => setShow(false)} dismissible>
                    <p style={{ textAlign: "center" }}>Added!</p>
                </Alert>
                : null} */}
            <OverlayTrigger trigger="focus" placement="right" overlay={popover} >
                <Button size="sm" onClick={handleSubmit} style={{ float: "right" }}>
                    Add to Cart
                </Button>
            </OverlayTrigger>

        </div>

    );
}