import Table from 'react-bootstrap/Table';
import DeleteCartItem from './DeleteCartItem';
import EditCartItem from './EditCartItem';
import { useState } from 'react';
export default function DisplayCart(props) {

    return (
        <div>
            <Table striped bordered hover size="sm">
                <thead>
                    <tr>
                        <th>Item</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {props.cart.map((item) => (
                        <tr>
                            <td>{item.name}</td>
                            <td>{item.price}</td>
                            <td>{<EditCartItem itemID={item.id} itemQuantity={item.quantity}/> }</td>
                            {/* <td>{item.quantity}</td> */}
                            <td><DeleteCartItem itemID={item.id} /></td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    );
}