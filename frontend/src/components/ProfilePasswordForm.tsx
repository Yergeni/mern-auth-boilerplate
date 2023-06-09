import { useDispatch } from "react-redux";
import * as Yup from "yup";
import { Formik } from "formik";
import { toast } from "react-toastify";

/* User Slice */
import { setCredentials } from "../context/slices/authSlice";
import { useUpdateProfileMutation } from "../context/slices/usersApiSlice";

import { VscLoading } from "react-icons/vsc";
import { Form, Button, Stack } from "react-bootstrap";

const passwordSchema = Yup.object().shape({
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

type PasswordFormValues = Yup.InferType<typeof passwordSchema>;

export default function ProfilePasswordForm() {
	const dispatch = useDispatch();

	const initialPasswordValues: PasswordFormValues = {
		password: "",
		confirmPassword: "",
	};

	// API
	const [updatePassword, { isLoading }] = useUpdateProfileMutation();

	const handleUpdatePassword = async (values: PasswordFormValues) => {
		try {
			const res = await updatePassword({
				password: values.password,
				confirmPassword: values.confirmPassword,
			}).unwrap();
			dispatch(setCredentials({ userInfo: res.userInfo }));
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
		<>
			<h1 className="mt-3">Update Password</h1>
			<Formik
				validationSchema={passwordSchema}
				initialValues={initialPasswordValues}
				onSubmit={handleUpdatePassword}
				validateOnChange={true}
				validateOnBlur={true}
			>
				{({ handleSubmit, handleChange, values, touched, errors }) => (
					<Form onSubmit={handleSubmit}>
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

						<Stack
							direction="horizontal"
							className="mt-3 justify-content-end"
							gap={2}
						>
							<Button type="submit" variant="primary" disabled={isLoading}>
								{isLoading && <VscLoading className="login-page_loading" />}
								Update Password
							</Button>
						</Stack>
					</Form>
				)}
			</Formik>
		</>
	);
}
