import '../Assets/Styles/Login.css';
import {
	Dialog,
	DialogContent,
	DialogTitle,
	Typography,
	Button,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

function Popup(props) {
	
	const { title, children, openPopup, setOpenPopup } = props;

	return (
		<Dialog open={openPopup}>
			<DialogTitle>
				<div style={{ display: 'flex' }}>
					<Typography
						variant='h6'
						component='div'
						style={{ flexGrow: 1 }}
					>
						{title}
					</Typography>
					<Button onClick={() => setOpenPopup(false)}>
						<CloseIcon />
					</Button>
				</div>
			</DialogTitle>
			<DialogContent>{children}</DialogContent>
		</Dialog>
	);
}

export default Popup;
