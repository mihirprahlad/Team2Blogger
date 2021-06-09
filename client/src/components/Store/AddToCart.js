import Button from "react-bootstrap/Button";
import { CartContext } from "../../contexts/CartContext.js";
import { UserContext } from "../../contexts/UserContext.js";
import { useContext } from 'react';
export default function AddToCart(props) {
    const { cart, setCart } = useContext(CartContext);
    const { user } = useContext(UserContext);
    const handleSubmit = () => {
        if (!user) { // if not signed in, do this
            let newCart = cart;
            newCart.push(props.item);
            console.log("newCart", newCart);
            setCart(newCart);
            console.log(cart);
        } else { // if signed in, do this
            console.log("adding item ID", props.item.id, "to cart of ID:", user.uid);
            console.log(props.item.id);
            fetch(`http://localhost:5000/users/${user.uid}/shopping-cart`, {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    item_id: props.item.id
                }),
            });
        }

    }
    return (
        <Button size="sm" onClick={handleSubmit} style={{ float: "right" }}>
            Add to Cart
        </Button>
    );
}