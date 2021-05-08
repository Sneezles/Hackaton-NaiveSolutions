import React, { useState, useContext } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { Link as LinkRoute, useHistory } from "react-router-dom"
import axios from "axios"
import GlobalContext from "./GlobalContext.js"
import { MenuItem, Select } from '@material-ui/core';


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
	data: {
		height: "100%"
	},
	dataItem: {
	}
}));

export default function SignUp() {
	const global = useContext(GlobalContext);
	const classes = useStyles();
	let history = useHistory();
	const [name, setName] = useState("")
	const [price, setPrice] = useState(0)
	const [data, setData] = useState("")
	const [type, setType] = useState("text")



	const onCreateUser = async () => {
		console.log(global)
		try {
			var res = await axios.post("http://localhost:8000/addContent", {
				name,
				price,
				type,
				data,
				creator: global.context.user.id
			})
			console.log(res)
			history.push('/home')
		} catch (e) {
			console.log("Error")
			console.warn(e)
		}
	}
	return (
		<Container component="div" maxWidth="xs">
			<CssBaseline />
			<div className={classes.paper}>
				<Typography component="h1" variant="h5">
					New content
        </Typography>
				<Grid container spacing={2}>
					<Grid item xs={12} >
						<TextField
							variant="outlined"
							required
							fullWidth
							id="name"
							label="Name"
							name="name"
							autoComplete="lname"
							value={name}
							onChange={e => { setName(e.target.value) }}
						/>
					</Grid>
					<Grid item xs={12}>
						<Select
							className={classes.select}
							fullWidth
							label='Type of vehicle'
							labelId='typeLabel'
							id='type'
							value={type}
							onChange={(v) => {
								setType(v.target.value);
							}}>
							<MenuItem value={"text"}>Text</MenuItem>
							<MenuItem value={"audio"}>Audio</MenuItem>
							<MenuItem value={"video"}>Video</MenuItem>
						</Select>
					</Grid>
					<Grid item xs={12}>
						<TextField
							variant="outlined"
							required
							fullWidth
							name="price"
							label="Price"
							type="price"
							id="price"
							value={price}
							onChange={e => { setPrice(e.target.value) }}
						/>
					</Grid>
					<Grid item xs={12} className={classes.dataItem}>
						<TextField
							variant="outlined"
							required
							fullWidth
							className={classes.data}
							name="data"
							label="Data"
							type="data"
							id="data"
							multiline
							value={data}
							onChange={e => { setData(e.target.value) }}
						/>
					</Grid>
					<Grid item xs={12}>

						<Button
							type="submit"
							fullWidth
							variant="contained"
							color="primary"
							className={classes.submit}
							onClick={onCreateUser}
						>
							Add new content
         				</Button>
					</Grid>
				</Grid>
			</div>

		</Container>
	);
}