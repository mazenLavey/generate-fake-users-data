import { Container } from "@mui/material";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUsers } from '@fortawesome/free-solid-svg-icons';
import "./index.css";

const Header: React.FC = () => {
    return (
        <header className="Header">
            <Container>
                <h1 className="Header__title">
                    <FontAwesomeIcon icon={faUsers} />
                    generate fake users
                </h1>
            </Container>
        </header>
    )
}

export default Header;