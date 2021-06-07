import Card from 'react-bootstrap/Card'
import Image from 'react-bootstrap/Image'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

export default function PostCard({postContent}){
    return(
        <div>
            <Card style={{ width: '50rem' ,margin:"auto"}}>
            <Card.Body>
                <Container>
                <Row>
                <Col sm={2}>
                <Image style={{ width: '5rem'}} src={postContent.image} roundedCircle/>
                </Col>
                <Col sm={10}>
                <h2>{postContent.title}</h2>
                <Card.Subtitle className="mb-2 text-muted">Camille Cooper</Card.Subtitle>
                <Card.Subtitle className="mb-2 text-muted">{postContent.date}</Card.Subtitle>
                </Col>
                </Row>
                <Card.Text style={{textAlign:"left",paddingTop:"2%"}}>{postContent.content}</Card.Text>
                </Container>
            </Card.Body>
            </Card>
            
        </div>
    )

}