import { useAuth } from "../utils/Auth.js";
import { useState } from "react";
import { Form } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { Card } from "react-bootstrap";
import "../styles/LoginCard.css";
import camera from "../photos/shared/camera.png";

export const LoginForm = () => {
  const auth = useAuth();
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();
    auth.login({ login, password }).catch((error) => setError(error.message));
  };

  return (
    <div className="background-container">
      <div className="background">
        <Card className="loginCard" style={{ width: "20rem", height: "22rem" }}>
          <Card.Title className="card-title card-block text-center">
            PhotoHub
            <img
              src={camera}
              width="30"
              height="30"
              className="d-inline-block align-top"
              alt="PhotoHub logo"
            />
          </Card.Title>
          <Form onSubmit={onSubmit}>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Login</Form.Label>
              <Form.Control
                type="login"
                placeholder="Enter login"
                value={login}
                onChange={(e) => setLogin(e.target.value)}
              />
              <Form.Text className="text-muted">
                We'll never share your email with anyone else.
              </Form.Text>
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
         
            <p className="text-center">
              <strong>{error}</strong>
            </p>
          
        </Card>
      </div>
    </div>
  );
};

export default LoginForm;
