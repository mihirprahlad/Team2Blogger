import Table from 'react-bootstrap/Table';
import DeleteCartItem from './DeleteCartItem';
import EditCartItem from './EditCartItem';
import { useContext } from 'react';
import { UserContext } from "../../contexts/UserContext.js";

/**
 * Displays the cart in table form in the proper modal. Used in Cart.js
 * @param {Object} props - Contains a cart object that represents the user's cart
 * @returns A table of all the items in the cart, edit/delete buttons for signed-in users, and the total price 
 */
export default function DisplayCart(props) {
    const { user } = useContext(UserContext);

    // Determining the cart total ---------------------------
    let price = 0;
    props.cart.map((item) => (
        price = price + parseFloat(item.price * item.quantity)
    ))
    // ------------------------------------------------------

    return (
        <div>
            <Table striped bordered hover size="sm">
                <thead>
                    <tr>
                        <th>Item</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        {user ? <th>Edit/Delete</th> : null}
                    </tr>
                </thead>
                <tbody>
                    {props.cart.map((item) => (
                        <tr>
                            <td>{item.name}</td>
                            <td>{"$ " + item.price}</td>
                            {<td>{item.quantity}</td>}
                            {user ? <td>{
                                <div style={{ display: "flex", flexDirection: "row", justifyContent: "center", margin: "auto" }}>
                                    {/* Edit Cart Item Button */}
                                    <div style={{paddingRight: "10px"}}>
                                        <EditCartItem itemID={item.id} itemQuantity={item.quantity} itemName={item.name} />
                                    </div>
                                    
                                    {/* Delete Cart Item Button */}
                                    <div style={{paddingLeft: "10px"}}>
                                        <DeleteCartItem itemID={item.id} />
                                    </div>
                                </div>}
                            </td> : null }
                            
                        </tr>
                    ))}
                </tbody>
            </Table>
            <div style={{ textAlign: "right", paddingRight: "15px" }}>
                <h5>Cart Total: </h5>
                <h5>{"$ " + price.toFixed(2)}</h5>
                {/* ^ Have to round to 2 decimal places */}
            </div>

        </div>
    );
}