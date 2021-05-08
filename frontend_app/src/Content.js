import React, { useState, useEffect, useContext } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { Link as LinkRoute, useHistory } from "react-router-dom"
import axios from "axios"
import { DialogContent, DialogTitle, Paper } from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import GlobalContext from "./GlobalContext.js"


function Copyright() {
	return (
		<Typography variant="body2" color="textSecondary" align="center">
			{'Copyright © '}
			<Link color="inherit" href="https://material-ui.com/">
				Your Website
      </Link>{' '}
			{new Date().getFullYear()}
			{'.'}
		</Typography>
	);
}

const useStyles = makeStyles((theme) => ({
	paper: {
		marginTop: theme.spacing(8),
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
	},
	avatar: {
		margin: theme.spacing(1),
		backgroundColor: theme.palette.secondary.main,
	},
	form: {
		width: '100%', // Fix IE 11 issue.
		marginTop: theme.spacing(3),
	},
	submit: {
		margin: theme.spacing(3, 0, 2),
	},
	contentPaper: {
		border: "1px solid black",
		margin: "10px",
		padding: "10px",
		width: "100%"
	},
	contentGrid: {
		justifyItems: "space-betwen"
	},
	dialogPaper: {
		width: "90vw",
		hight: "90vh"
	}
}));

export default function SignUp() {
	const classes = useStyles();
	let history = useHistory();
	const [content, setContent] = useState([])
	const [openContent, setOpenContent] = useState(null)
	const global = useContext(GlobalContext)


	const onGetContent = async () => {
		try {
			var res = await axios.post("http://localhost:8000/getContent", {})
			console.log(res.data)
			setContent(res.data)
			history.push('/home')
		} catch (e) {
			console.log("Error")
			console.warn(e)
		}
	}

	const sendPayment = async (id, price) => {
		try {
			var res = await axios.post("http://localhost:8000/sendPayment", {
				from: global.context.user.id,
				to: id,
				price: price
			})
			console.log(res.data)
		} catch (e) {
			console.log("Error")
			console.warn(e)
		}
	}

	useEffect(() => { onGetContent() }, []);

	return (
		<Container component="div" maxWidth="xs">
			<CssBaseline />
			<div className={classes.paper}>
				{content.map(c => {
					return <Paper variant="outlined" className={classes.contentPaper}>
						<Grid container spacing={4} justify='space-between'>
							<Grid item>
								<Typography>
									{c.name}
								</Typography>
							</Grid>
							<Grid item>
								<Typography>
									{c.price / 100 + "e"}
								</Typography>
							</Grid>
							<Grid item>
								<Button variant="outlined"
									onClick={() => {
										sendPayment(c.creator, c.price)
										setOpenContent(c)
									}}
								>
									Rent
								</Button>
							</Grid>
						</Grid>
					</Paper>
				})}
				<Dialog
					open={!!openContent}
					onClose={() => {
						setOpenContent(null)
					}}
					maxWidth="lg"
				>
					<DialogTitle>{openContent && openContent.name}</DialogTitle>
					<Button onClick={() => { setOpenContent(null) }}>X</Button>
					{openContent && <Paper className={classes.dialogPaper}>
						{openContent.data}
					</Paper>}
				</Dialog>
			</div>
		</Container >
	);
}