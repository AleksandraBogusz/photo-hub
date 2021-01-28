import "../styles/PostDetails.css";
import heart2 from "../photos/shared/heart2.png"

import Comment from "./Comment";
import { Scrollbars } from "rc-scrollbars";

import { Card, ListGroup } from "react-bootstrap";

const PostDetails = (props) => {
  const photo = props.photo;
  if (photo) {
    return (
      <div className="background-container" onClick={() => props.setPhoto("")}>
        <div className="card-container" 
        style={{ width: "45rem" }}
        >
          <Card>
            <Card.Header>Username</Card.Header>
            <Card.Body>
              <Card.Img src={photo} variant="top" style={{width:300, height:400}} />
              <Card.Text>{photo.description}</Card.Text>
            </Card.Body>

            <Card className="comments">
              <Scrollbars style={{ width: 255, height: 150 }}>
                <ListGroup className="list-group-flush">
                  <Comment />
                </ListGroup>
              </Scrollbars>
            </Card>
            <Card.Footer className="text-muted">
              2 days ago 
              <img src= {heart2} style ={{width: 25, height: 20}}/>
            </Card.Footer>
          </Card>
        </div>
      </div>
    );
  }
  return null;
};

export default PostDetails;
