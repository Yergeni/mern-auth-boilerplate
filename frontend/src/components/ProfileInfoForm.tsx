import { useDispatch } from "react-redux";
import * as Yup from "yup";
import { Formik } from "formik";
import { toast } from "react-toastify";

/* User Slice */
import { useAuth } from "../hooks/useAuth";
import { setCredentials } from "../context/slices/authSlice";
import { useUpdateProfileMutation } from "../context/slices/usersApiSlice";

import { VscLoading } from "react-icons/vsc";
import { Form, Button, InputGroup, Stack } from "react-bootstrap";

const profileSchema = Yup.object().shape({
	fullName: Yup.string()
		.min(2, "Too Short!")
		.max(50, "Too Long!")
		.required("Required"),
	email: Yup.string().email("Invalid email").required("Required"),
});

type ProfileFormValues = Yup.InferType<typeof profileSchema>;

export default function ProfileInfoForm() {
	const dispatch = useDispatch();
	const { userInfo } = useAuth();

	const initialProfileValues: ProfileFormValues = {
		fullName: userInfo?.name || "",
		email: userInfo?.email || "",
	};

	// API
	const [updateProfile, { isLoading }] = useUpdateProfileMutation();

	const handleUpdateProfile = async (values: ProfileFormValues) => {
		try {
			const res = await updateProfile({
				name: values.fullName,
				email: values.email,
			}).unwrap();
			dispatch(setCredentials({ userInfo: res.userInfo }));
      toast.success("Your profile was updated");
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
			<h1>Update Profile</h1>
			<Formik
				validationSchema={profileSchema}
				initialValues={initialProfileValues}
				onSubmit={handleUpdateProfile}
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

						<Stack
							direction="horizontal"
							className="mt-3 justify-content-end"
							gap={2}
						>
							<Button type="submit" variant="primary" disabled={isLoading}>
								{isLoading && <VscLoading className="login-page_loading" />}
								Update Profile
							</Button>
						</Stack>
					</Form>
				)}
			</Formik>
		</>
	);
}
