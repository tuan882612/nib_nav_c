import '../Assets/Styles/Login.css';
import { Dialog, DialogContent, DialogTitle } from '@mui/material';

function Popup(props) {

	const { title, children, openPopup, setOpenPopup} = props

	return (
		<Dialog open={openPopup}>
			<DialogTitle>
				<div>{title}</div>
			</DialogTitle>
			<DialogContent>
				{children}
			</DialogContent>
		</Dialog>
	);
}

export default Popup;
