import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import NavDropdown from "react-bootstrap/NavDropdown";
import { LinkContainer } from "react-router-bootstrap";

import Loader from "./Loader";

/* Hooks */
import { useAuth } from "../hooks/useAuth";

/* User Slice */
import { useLogoutMutation } from "../context/slices/usersApiSlice";
import { clearCredentials } from "../context/slices/authSlice";

import { ROUTES } from "../common/constants";

import { FaSignInAlt, FaSignOutAlt } from "react-icons/fa";

function Header() {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const { userInfo } = useAuth();

	const [logoutApiCall, { isLoading }] = useLogoutMutation();

	const handleLogout = async () => {
		try {
			await logoutApiCall({}).unwrap();
			dispatch(clearCredentials());
			navigate(ROUTES.HOME);
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
			{isLoading && <Loader />}
			<Container>
				<LinkContainer to={ROUTES.HOME}>
					<Navbar.Brand>MERN Auth</Navbar.Brand>
				</LinkContainer>
				<Navbar.Toggle aria-controls="basic-navbar-nav" />
				<Navbar.Collapse id="basic-navbar-nav">
					<Nav className="ms-auto">
						{userInfo ? (
							<>
								<NavDropdown title={userInfo.name} id="username">
									<LinkContainer to={ROUTES.PROFILE}>
										<NavDropdown.Item>Profile</NavDropdown.Item>
									</LinkContainer>
									<NavDropdown.Divider />
									<NavDropdown.Item onClick={handleLogout}>
										Logout
									</NavDropdown.Item>
								</NavDropdown>
							</>
						) : (
							<>
								<LinkContainer to={ROUTES.LOGIN}>
									<Nav.Link>
										<FaSignInAlt /> Login
									</Nav.Link>
								</LinkContainer>
								<LinkContainer to={ROUTES.REGISTER}>
									<Nav.Link>
										<FaSignOutAlt /> Register
									</Nav.Link>
								</LinkContainer>
							</>
						)}
					</Nav>
				</Navbar.Collapse>
			</Container>
		</Navbar>
	);
}

export default Header;
