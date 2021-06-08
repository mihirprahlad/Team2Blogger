import Card from 'react-bootstrap/Card';
import CardDeck from 'react-bootstrap/CardDeck';
import Button from 'react-bootstrap/Button';
import { RiEditBoxLine } from "react-icons/ri";
import { RiDeleteBinLine } from "react-icons/ri";

export default function DisplayItems(props) {

    return (
        <div className="CardContainer" style={{ margin: "auto", width: "30%" }}>
            <CardDeck>

                {props.items.map((item) => (
                    <Card>
                        <Card.Img variant="top" src={item.image} style={{ height: "220px", width: "220px" }} />
                        <Card.Body>
                            <div>
                                <RiEditBoxLine />
                                <RiDeleteBinLine onClick={() =>
                                    fetch("http://localhost:5000/items", {
                                        method: "DELETE",
                                        headers: {
                                            Accept: "application/json",
                                            "Content-Type": "application/json",
                                        },
                                        body: JSON.stringify({ id: item.id }),
                                    })
                                        .then((obj) => {
                                            console.log("deleting", obj);
                                            // setUpdate(Math.random());
                                            window.location.reload();
                                        })
                                } />
                            </div>
                            <Card.Title>{item.name}</Card.Title>
                            <Card.Text>{item.description}</Card.Text>
                        </Card.Body>
                        <Card.Footer>
                            <medium className="text-muted">$ {item.price}</medium>
                            <Button size="sm" style={{ float: "right" }}>Add to Cart</Button>
                            {/* ^ so far doesn't do anything, dummy button */}
                        </Card.Footer>
                    </Card>

                ))}


            </CardDeck>
        </div>
    );
}