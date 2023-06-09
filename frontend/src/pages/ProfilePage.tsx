import FormContainer from "../components/FormContainer";
import ProfileInfoForm from "../components/ProfileInfoForm";
import ProfilePasswordForm from "../components/ProfilePasswordForm";

export default function ProfilePage() {
	return (
		<FormContainer>
			<ProfileInfoForm />
			<ProfilePasswordForm />
		</FormContainer>
	);
}

