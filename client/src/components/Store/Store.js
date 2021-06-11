import { useState, useEffect, useContext } from 'react';
import DisplayItems from './DisplayItems';
import AddItems from './AddItems';
import Cart from './Cart';
import { UserContext } from "../../contexts/UserContext.js";

/**
 * Driver for the store page. Used in App.js
 * @returns A store header, admin controls, a cart, and the items
 */
export default function Store() {
    // Fetch request to get store items
    const [items, setItems] = useState([]); // array of items
    const { user } = useContext(UserContext);
    console.log("user", user);

    const getItems = () => {
        fetch("http://localhost:5000/items")
            .then((res) => {
                return res.json();
            })
            .then((obj) => {
                if (obj != null) {
                    console.log("API CALL", obj);
                    if (obj.length === 0) { // if obj array is empty, make it a dummy object
                        obj = [{
                            "price": 0,
                            "name": "Items not found",
                            "description": "Items not found",
                            "image": "",
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
    }, []);


    return (
        <div style={{marginLeft:"5%",paddingTop:"4vh", paddingBottom:"4vh", marginRight:"5%"}}>
            {/* Header */}
            <h1 style={{textAlign:"left",fontSize:"50px",color:"#4C635"}}>Store.</h1>
                <div style={{height:15,width:140,backgroundColor:"#4C6357"}}></div>


            {/* Add Items Button - Only visible to admin users */}
            {user.is_admin ? <AddItems /> : null}

            {/* Cart */}
            <Cart />
            <br />

            {/* Item Cards */}
            <div className="CardContainer" style={{ width: "100%", margin: "auto", display: "flex", flexDirection: "row", flexWrap: "wrap", justifyContent: "center"}}>
                <DisplayItems items={items} />
            </div>
        </div>
    );
}