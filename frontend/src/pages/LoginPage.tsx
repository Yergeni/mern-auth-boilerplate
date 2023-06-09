import { FormEvent, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

/* User Slice */
import { useAuth } from "../hooks/useAuth";
import { useLoginMutation } from "../context/slices/usersApiSlice";
import { setCredentials } from "../context/slices/authSlice";

import { ROUTES } from "../common/constants";

import { VscLoading } from "react-icons/vsc";
import { Form, Button, Row, Col, Stack } from "react-bootstrap";

import FormContainer from "../components/FormContainer";

/* Styles */
import "./LoginPage.css";

export default function LoginPage() {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const { userInfo } = useAuth();

	// If user info then navigate to the home page ('/')
	useEffect(() => {
		if (userInfo) navigate(ROUTES.HOME, { replace: true });
	}, [userInfo, navigate]);

	const emailRef = useRef<HTMLInputElement | null>(null);
	const passwordRef = useRef<HTMLInputElement | null>(null);

	// API
	const [login, { isLoading }] = useLoginMutation();

	const handleLogin = async (e: FormEvent) => {
		e.preventDefault();

		try {
			if (emailRef.current?.value && passwordRef.current?.value) {
				const res = await login({
					email: emailRef.current?.value,
					password: passwordRef.current?.value,
				}).unwrap();
				dispatch(setCredentials({userInfo: res.userInfo}));
				navigate(ROUTES.HOME);
			}
		} catch (error) {
			if (error) {
				toast.error(
					(error as { data: { message: string } }).data.message ||
						"Someting went wrong"
				);
			}
		}
	};

	return (
		<FormContainer>
			<h1>Sign In</h1>

			<Form onSubmit={handleLogin}>
				<Form.Group className="my-2" controlId="email">
					<Form.Label>Email Address</Form.Label>
					<Form.Control
						ref={emailRef}
						required
						type="email"
						placeholder="Enter email"
					/>
				</Form.Group>

				<Form.Group className="my-2" controlId="password">
					<Form.Label>Password</Form.Label>
					<Form.Control
						ref={passwordRef}
						required
						type="password"
						placeholder="Enter password"
					/>
				</Form.Group>

				<Button
					type="submit"
					variant="primary"
					className="mt-3"
					disabled={isLoading}
				>
					<Stack direction="horizontal" gap={2}>
						{isLoading && <VscLoading className="login-page_loading" />}
						<span>Sign In</span>
					</Stack>
				</Button>
			</Form>

			<Row className="py-3">
				<Col>
					Don't have an account? <Link to={ROUTES.REGISTER}>Register</Link>
				</Col>
			</Row>
		</FormContainer>
	);
}
