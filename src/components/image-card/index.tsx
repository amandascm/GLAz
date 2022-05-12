import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';
import './styles.css';

const ImageCard = ({ props }: any) => {
  return (
    <div className="image-card-container">
      <Link to={props.link} style={{ color: 'inherit', textDecoration: 'inherit' }}>
        <Card style={{ width: '18rem' }}>
          {props.imgSrc && <Card.Img variant="top" src={props.imgSrc} />}
          <Card.Body style={{ height: '50%', border: 0 }}>
            <Card.Title>{props.title}</Card.Title>
            <Card.Text>{props.text}</Card.Text>
          </Card.Body>
        </Card>
      </Link>
    </div>
  );
};

export default ImageCard;
