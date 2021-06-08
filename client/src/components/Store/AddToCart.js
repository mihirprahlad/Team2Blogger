import Button from "react-bootstrap/Button";
import { CartContext } from "../../contexts/CartContext.js";
import { useContext } from 'react';
export default function AddToCart(props){
    const { cart, setCart } = useContext(CartContext);
    const handleSubmit = () => {
        let newCart = cart;
        newCart.push(props.item);
        console.log ("newCart", newCart);
        setCart(newCart);
        console.log(cart);
      }
    return (
        <Button size="sm" onClick={handleSubmit} style={{ float: "right" }}>
            Add to Cart
        </Button>
    );
}