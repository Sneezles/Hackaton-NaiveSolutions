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
import Text from "react";
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { Link as LinkRoute, useHistory } from "react-router-dom"
import axios from "axios"
import { DialogContent, DialogTitle, Paper } from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import GlobalContext from "./GlobalContext.js"
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import ReactMarkdown from 'react-markdown'
import { Icon, InlineIcon } from '@iconify/react';
import bitcoinIcon from '@iconify-icons/mdi/bitcoin';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import Fab from '@material-ui/core/Fab';
import LibraryBooksIcon from '@material-ui/icons/LibraryBooks';

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
	closeButton: {
		position: 'absolute',
		right: theme.spacing(1),
		top: theme.spacing(1),
		color: theme.palette.grey[500],
	  },
	  btcicon: {
		  marginBottom: -1,
	  },
	extendedIcon: {
		marginRight: theme.spacing(1),
	},
	fab: {
		'& > *': {
			margin: theme.spacing(1),
		  },
	},
	fabcont: {
		marginBottom: theme.spacing(3),
		marginTop: theme.spacing(3),
		marginLeft: -20,
	},
	concentdialog: {
		marginTop: '7vh',
		maxHeight: '100vh',
	},
	bookicon: {
		margin: 20,
	},
	centerbleh: {
		marginTop: 30,
		marginLeft: -20,
	},
	bbbb: {
		marginTop: 30,
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
			var res = await axios.post("http://188.166.122.66:8000/getContent", {})
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
			var res = await axios.post("http://188.166.122.66:8000/sendPayment", {
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
		<Container component="div" maxWidth="md">
		<List className={classes.root}>
			{content.map(c => {
				return <React.Fragment><ListItem alignItems="flex-start">
					
					<Grid container spacing={3}>
        <Grid item xs={2}>
		<Fab className={classes.bookicon}>
						<LibraryBooksIcon/></Fab>
						</Grid>
        <Grid item xs={7}>
						<ListItemText
						 className={classes.centerbleh}
						primary={c.name}
						secondary={
							<React.Fragment>
								
							<Typography
								component="span"
								variant="body2"
								className={classes.inline}
								color="textPrimary"
							>
								{c.data.split('\n')[0]}
							</Typography>				

							</React.Fragment>
						}
						/>
						</Grid>
        <Grid item xs={3}>
		<Button variant="outlined" className={classes.bbbb}
								onClick={() => {
									sendPayment(c.creator, c.price)
									setOpenContent(c)
								}}
							>
								Rent | {c.price}<Icon className={classes.btcicon} icon={bitcoinIcon} />
							</Button>
							</Grid>
							</Grid>
					</ListItem>
					<Divider/>
					</React.Fragment>
			})}
		</List>		
			<CssBaseline />
			<div className={classes.paper}>
				{content.map(c => {
					return <Paper variant="outlined" className={classes.contentPaper}>
						<Grid container spacing={4} justify='space-between'>
							<Grid item>
								<Typography>
									{c.name}
								</Typography>
								<Typography numberOfLines={1}>{c.data.split('\n')[0]}</Typography>
							</Grid>
							<Grid item>
								<Typography>
									{c.price}<Icon className={classes.btcicon} icon={bitcoinIcon} />
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
					fullWidth={true}
					maxWidth="lg"
					className={classes.concentdialog}
				>
					<DialogTitle>
						
						<Typography variant="h6"><AccountCircleIcon /> {openContent && openContent.name}</Typography>
						<IconButton aria-label="close" className={classes.closeButton} onClick={() => { setOpenContent(null) }}>
							<CloseIcon />
						</IconButton>
					</DialogTitle>
					<DialogContent dividers>
						{openContent && <ReactMarkdown>{openContent.data}</ReactMarkdown>}
						<Divider />
					<Container maxWith="sm" className={classes.fabcont}>
					<Fab className={classes.fab} variant="extended" onClick={() => {sendPayment(openContent.creator, 1)}} variant="extended">
						<ThumbUpAltIcon className={classes.extendedIcon} />
       		 			Tip {1}<Icon className={classes.btcicon} icon={bitcoinIcon} />
      				</Fab>
					  </Container>
					  </DialogContent>
				</Dialog>
			</div>
		</Container >
	);
}