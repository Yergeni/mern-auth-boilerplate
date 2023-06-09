import { LinkContainer } from "react-router-bootstrap";
import { Container, Card, Button } from "react-bootstrap";

import { ROUTES } from "../common/constants";

import { useAuth } from "../hooks/useAuth";

export default function Presentation() {
	const { userInfo } = useAuth();

	return (
		<div className=" py-5">
			<Container className="d-flex justify-content-center">
				<Card className="p-5 d-flex flex-column align-items-center hero-card bg-light w-75">
					<h1 className="text-center mb-4">MERN Authentication</h1>
					<p className="text-center mb-4">
						This is a boilerplate for MERN authentication that stores a JWT in
						an HTTP-Only cookie. It also uses Redux Toolkit and the React
						Bootstrap library.
					</p>
					{!userInfo && (
						<div className="d-flex">
							<LinkContainer to={ROUTES.LOGIN}>
								<Button variant="primary" className="me-3">
									Sign In
								</Button>
							</LinkContainer>
							<LinkContainer to={ROUTES.REGISTER}>
								<Button variant="secondary">Register</Button>
							</LinkContainer>
						</div>
					)}
				</Card>
			</Container>
		</div>
	);
}
