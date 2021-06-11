import Card from "react-bootstrap/Card";
import CardDeck from "react-bootstrap/CardDeck";
import EditItems from "./EditItems";
import AddToCart from "./AddToCart"
import { RiDeleteBinLine } from "react-icons/ri";
import { useContext } from 'react';
import { UserContext } from "../../contexts/UserContext.js";

/**
 * Displays all items available in the store. Used in Store.js
 * @param {Object} props - items: Array of item objects representing all store items
 * @returns A CardDeck holding Cards representing each item. If user is an admin, also returns edit and delete buttons for each item.
 */
export default function DisplayItems(props) {
  const { user } = useContext(UserContext);
  return (
    <div className="CardContainer">
      <CardDeck>
        {props.items.map((item) => (
          <Card>
            <Card.Img
              variant="top"
              src={item.image}
              style={{ height: "220px", width: "220px" }}
            />
            <Card.Body>
              <div style={{ display: "flex", margin: "auto", justifyContent: "center" }}>
                {/* Edit Button - Only visible to an admin */}
                {user.is_admin ? <EditItems name={item.name} description={item.description} price={item.price} image={item.image} id={item.id} /> : null}

                {/* Delete Button - Only visible to an admin */}
                <div>
                  {user.is_admin ? <RiDeleteBinLine onClick={() =>
                    fetch(`http://localhost:5000/items/${item.id}`, {
                      method: "DELETE",
                      headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json",
                      },
                    }).then((obj) => {
                      console.log("deleting", obj);
                      window.location.reload();
                    })
                  }
                  /> : null}
                </div>
              </div>   
              <br />
              <Card.Title>{item.name}</Card.Title>
              <Card.Text>{item.description}</Card.Text>
            </Card.Body>
            <Card.Footer>
              <medium className="text-muted">$ {item.price}</medium>

              {/* Add to Cart button */}
              <AddToCart item={item} />
            </Card.Footer>
          </Card>
        ))}
      </CardDeck>
    </div>
  );
}
