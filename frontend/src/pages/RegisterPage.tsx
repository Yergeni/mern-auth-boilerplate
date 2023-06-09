import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { Formik } from "formik";
import { toast } from "react-toastify";

/* User Slice */
import { useAuth } from "../hooks/useAuth";
import { setCredentials } from "../context/slices/authSlice";
import { useRegisterMutation } from "../context/slices/usersApiSlice";

import { ROUTES } from "../common/constants";

import { VscLoading } from "react-icons/vsc";
import { Form, Button, Row, Col, InputGroup } from "react-bootstrap";

import FormContainer from "../components/FormContainer";

const registerSchema = Yup.object().shape({
	fullName: Yup.string()
		.min(2, "Too Short!")
		.max(50, "Too Long!")
		.required("Required"),
	email: Yup.string().email("Invalid email").required("Required"),
	password: Yup.string()
		.min(6, "6 characters minimun")
		.max(20, "20 characters maximun")
		.required("Required"),
	confirmPassword: Yup.string()
		.min(6, "6 characters minimun")
		.max(20, "20 characters maximun")
		// .oneOf([Yup.ref("password")], "Your password must match.")
		.test("password-match", "Passwords must match!", function (value) {
			return this.parent.password === value;
		})
		.required("Required"),
});

type FormValues = Yup.InferType<typeof registerSchema>;

const initialValues: FormValues = {
	fullName: "",
	email: "",
	password: "",
	confirmPassword: "",
};

export default function RegisterPage() {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const { userInfo } = useAuth();

	// If user info then navigate to the home page ('/')
	useEffect(() => {
		if (userInfo) navigate(ROUTES.HOME, { replace: true });
	}, [userInfo, navigate]);

	// API
	const [register, { isLoading }] = useRegisterMutation();

	const handleRegister = async (values: FormValues) => {
		try {
			const res = await register({
				name: values.fullName,
				email: values.email,
				password: values.password,
				confirmPassword: values.confirmPassword,
			}).unwrap();
			dispatch(setCredentials({ userInfo: res.userInfo }));
			navigate(ROUTES.HOME);
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
			<h1>Register</h1>
			<Formik
				validationSchema={registerSchema}
				initialValues={initialValues}
				onSubmit={handleRegister}
				validateOnChange={true}
				validateOnBlur={true}
			>
				{({ handleSubmit, handleChange, values, touched, errors }) => (
					<Form onSubmit={handleSubmit}>
						<Form.Group className="my-2" controlId="name">
							<Form.Label>Name</Form.Label>
							<Form.Control
								type="text"
								name="fullName"
								placeholder="Enter full name"
								value={values.fullName}
								onChange={handleChange}
								isInvalid={!!errors.fullName}
								isValid={touched.fullName && !errors.fullName}
							/>
							<Form.Control.Feedback type="invalid">
								{errors.fullName}
							</Form.Control.Feedback>
						</Form.Group>

						<Form.Group className="my-2" controlId="email">
							<Form.Label>Email Address</Form.Label>
							<InputGroup hasValidation>
								<InputGroup.Text id="inputGroupPrepend">@</InputGroup.Text>
								<Form.Control
									name="email"
									type="email"
									placeholder="Enter email"
									aria-describedby="inputGroupPrepend"
									value={values.email}
									onChange={handleChange}
									isInvalid={!!errors.email}
									isValid={touched.email && !errors.email}
								/>
								<Form.Control.Feedback type="invalid">
									{errors.email}
								</Form.Control.Feedback>
							</InputGroup>
						</Form.Group>

						<Form.Group className="my-2" controlId="password">
							<Form.Label>Password</Form.Label>
							<Form.Control
								name="password"
								type="password"
								placeholder="Enter password"
								value={values.password}
								onChange={handleChange}
								isInvalid={!!errors.password}
								isValid={touched.password && !errors.password}
							/>
							<Form.Control.Feedback type="invalid">
								{errors.password}
							</Form.Control.Feedback>
						</Form.Group>

						<Form.Group className="my-2" controlId="confirmPassword">
							<Form.Label>Confirm Password</Form.Label>
							<Form.Control
								name="confirmPassword"
								type="password"
								placeholder="Confirm your password"
								value={values.confirmPassword}
								onChange={handleChange}
								isInvalid={!!errors.confirmPassword}
								isValid={touched.confirmPassword && !errors.confirmPassword}
							/>
							<Form.Control.Feedback type="invalid">
								{errors.confirmPassword}
							</Form.Control.Feedback>
						</Form.Group>

						<Button
							type="submit"
							variant="primary"
							className="mt-3"
							disabled={isLoading}
						>
							{isLoading && <VscLoading className="login-page_loading" />}
							Register
						</Button>
					</Form>
				)}
			</Formik>

			<Row className="py-3">
				<Col>
					Already have an account? <Link to={ROUTES.LOGIN}>Login</Link>
				</Col>
			</Row>
		</FormContainer>
	);
}
