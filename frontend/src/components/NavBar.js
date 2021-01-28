import camera from '../photos/shared/camera.png';
import { SearchBar } from './SearchBar';
import { Button, Nav, Navbar } from 'react-bootstrap';
import { useAuth } from '../utils/Auth.js';
import { Link } from 'react-router-dom';


export const NavBar = () => {
    const auth = useAuth();
    return auth.user ? <AuthenticatedNavBar /> : <UnauthenticatedNavBar/>
}

const LogoutButton = () => {
    const auth = useAuth();
    return auth.user ? <Button onClick={() => auth.logout()}>Logout</Button> : null;
}

const AuthenticatedNavBar = () => {
    return (
        <Navbar bg="light" expand="lg">
            <Navbar.Brand href="#home">PhotoHub</Navbar.Brand>
            <img
                src={camera}
                width="30"
                height="30"
                className="d-inline-block align-top"
                alt="PhotoHub logo"
            />
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    <Nav.Link href="/">Home</Nav.Link>
                    <Nav.Link href="/explore">Explore</Nav.Link>
                    <Nav.Link href="/about">About</Nav.Link>
                    <SearchBar />
                </Nav>
                <LogoutButton />
            </Navbar.Collapse>
        </Navbar>
    );
}

const UnauthenticatedNavBar = () => {
    return (
       <Navbar bg="light" expand="lg">
            <Navbar.Brand href="#home">PhotoHub</Navbar.Brand>
            <img
                src={camera}
                width="30"
                height="30"
                className="d-inline-block align-top"
                alt="PhotoHub logo"
            />
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
            </Navbar.Collapse>
        </Navbar>
    );
}