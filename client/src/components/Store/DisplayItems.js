import Card from 'react-bootstrap/Card';
import CardDeck from 'react-bootstrap/CardDeck';
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
                    <small className="text-muted">$ {item.price}</small>
                </Card.Footer>
            </Card>

            ))}


        </CardDeck>
    </div>
    );
}