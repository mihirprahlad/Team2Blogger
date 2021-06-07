import Card from 'react-bootstrap/Card';
import CardDeck from 'react-bootstrap/CardDeck';
import Button from 'react-bootstrap/Button';
export default function DisplayItems(props){

    return (
        <div className="CardContainer" style={{ margin: "auto", width: "50%" }}>
        <CardDeck>

            {props.items.map((item) => (
                <Card>
                <Card.Img variant="top" src={item.image} />
                <Card.Body>
                    <Card.Title>{item.name}</Card.Title>
                    <Card.Text>
                        {item.description}
                </Card.Text>
                </Card.Body>
                <Card.Footer>
                    <medium className="text-muted">$ {item.price}</medium>
                    <Button size="sm" style={{float: "right"}}>Add to Cart</Button>
                    {/* ^ so far doesn't do anything, dummy button */}
                </Card.Footer>
            </Card>

            ))}


        </CardDeck>
    </div>
    );
}