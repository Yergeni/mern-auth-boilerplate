import Spinner from "react-bootstrap/Spinner";

import "./Loader.css";

function Loader() {
	return (
		<div className="global-loader-backdrop">
			<Spinner animation="border" variant="dark" className="global-loader" />
		</div>
	);
}

export default Loader;
