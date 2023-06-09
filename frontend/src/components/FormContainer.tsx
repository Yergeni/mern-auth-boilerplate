import { Container, Row, Col } from "react-bootstrap";

type FormContainerProps = {
	children: React.ReactNode;
};

export default function FormContainer({ children }: FormContainerProps) {
	return (
		<Container>
			<Row className="justify-content-md-center mt-5">
				<Col xs={12} md={6} className="card p-5">
					{children}
				</Col>
			</Row>
		</Container>
	);
}
