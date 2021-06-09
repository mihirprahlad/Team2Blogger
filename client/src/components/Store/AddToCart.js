import Button from "react-bootstrap/Button";
import { CartContext } from "../../contexts/CartContext.js";
import { UserContext } from "../../contexts/UserContext.js";
import { useContext } from 'react';
export default function AddToCart(props) {
    const { cart, setCart } = useContext(CartContext);
    const { user } = useContext(UserContext);
    const item = props.item; // what is being added to the cart


    const handleSubmit = () => {
        if (!user) { // if not signed in, do this: add item to useContext cart
            // Used for duplicate checking
            let duplicate = false;
            const seen = new Set();
            // ---------------------------

            // Increment quantity if duplicate exists
            cart.map((cartItem) => (
                item.id === cartItem.id ? (cartItem.quantity = cartItem.quantity + 1) : duplicate = false
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
            console.log("adding item ID", item.id, "to cart of ID:", user.uid);
            fetch(`http://localhost:5000/users/${user.uid}/shopping-cart`, {
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

    }
    return (
        <Button size="sm" onClick={handleSubmit} style={{ float: "right" }}>
            Add to Cart
        </Button>
    );
}