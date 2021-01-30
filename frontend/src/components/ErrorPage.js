import { Link  } from 'react-router-dom';

export const ErrorPage = () => {
    return (
        <div>
            <h1>This page doesn't exist!</h1>
            <Link to="/">{"<- Go back to home page"}</Link>
        </div>
    )
}