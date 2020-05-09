import React from 'react';
import clsx from 'clsx';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import styled from 'styled-components'
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import Box from '@material-ui/core/Box';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Link from '@material-ui/core/Link';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import NotificationsIcon from '@material-ui/icons/Notifications';
import { mainListItems, secondaryListItems } from './listItems';
// import Select from '@material-ui/core/Select';
import Select from 'react-select'
import {billsSelector, categorySelector} from "../selectors";
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';

import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';

import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';


import { withStyles } from '@material-ui/core/styles';
import { fade } from '@material-ui/core/styles';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import { withRouter } from 'react-router';
var Loader = require('react-loader');


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

const drawerWidth = 240;

const styles = (theme) => ({
	root: {
		display: 'flex',
	},
	toolbar: {
		paddingRight: 24, // keep right padding when drawer closed
	},
	toolbarIcon: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'flex-end',
		padding: '0 8px',
		...theme.mixins.toolbar,
	},
	appBar: {
		zIndex: theme.zIndex.drawer + 1,
		transition: theme.transitions.create(['width', 'margin'], {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.leavingScreen,
		}),
	},
	appBarShift: {
		marginLeft: drawerWidth,
		width: `calc(100% - ${drawerWidth}px)`,
		transition: theme.transitions.create(['width', 'margin'], {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.enteringScreen,
		}),
	},
	menuButton: {
		marginRight: 36,
	},
	menuButtonHidden: {
		display: 'none',
	},
	title: {
		flexGrow: 1,
	},
	drawerPaper: {
		position: 'relative',
		whiteSpace: 'nowrap',
		width: drawerWidth,
		transition: theme.transitions.create('width', {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.enteringScreen,
		}),
	},
	drawerPaperClose: {
		overflowX: 'hidden',
		transition: theme.transitions.create('width', {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.leavingScreen,
		}),
		width: theme.spacing(7),
		[theme.breakpoints.up('sm')]: {
			width: theme.spacing(9),
		},
	},
	appBarSpacer: theme.mixins.toolbar,
	content: {
		flexGrow: 1,
		height: '100vh',
		overflow: 'auto',
	},
	container: {
		paddingTop: theme.spacing(4),
		paddingBottom: theme.spacing(4),
	},
	paper: {
		padding: theme.spacing(2),
		display: 'flex',
		overflow: 'auto',
		flexDirection: 'column',
	},
	fixedHeight: {
		height: 240,
	},
	heroContent: {
		backgroundColor: theme.palette.background.paper,
		padding: theme.spacing(8, 0, 6),
	},
	cardGrid: {
		paddingTop: theme.spacing(16),
		paddingBottom: theme.spacing(8),
		width: '100%'
	},
	MuiCardActionsRoot: {
		justifyContent: 'center',
	},
});

const customStyles = {
	option: (provided, state) => ({
		...provided,
		borderBottom: '1px dotted pink',
		color: state.isSelected ? 'red' : 'blue',
		padding: 20,
	})
};

class Dashboard extends React.Component {

	constructor(){
		super();
		this.state={
			open: true,
			searchStr: '',
			isClearable: true,
			isDisabled: false,
			isLoading: false,
			isRtl: false,
			isSearchable: true,
			currentFilter: '',
			stateData: []
		}
	}

	componentDidMount(){
		if(this.props.data && this.props.data.length !== 0){
			this.setState({ stateData : this.props.data })
		}
		console.log('props', this.props);
	}

	componentDidUpdate(prevProps, prevState){
		if(prevProps !== this.props){
			console.log('props', props);
		}
		if(prevState !== this.state){
			console.log('updated state', this.state);
		}

	}


	toggleClearable = () =>
		this.setState(state => ({ isClearable: !state.isClearable }));
	toggleDisabled = () =>
		this.setState(state => ({ isDisabled: !state.isDisabled }));
	toggleLoading = () =>
		this.setState(state => ({ isLoading: !state.isLoading }));
	toggleRtl = () => this.setState(state => ({ isRtl: !state.isRtl }));
	toggleSearchable = () =>
		this.setState(state => ({ isSearchable: !state.isSearchable }));

	filterResults = () => {
		if(this.state.currentFilter === ''){
			this.setState({ stateData: this.props.data })
		} else {
			let newData = this.props.data.filter((item) => {
				if(item.category === this.state.currentFilter){
					return item
				}
			})
			this.setState({ stateData: newData})
		}
	};

	render(){
		const { classes } = this.props;
		const open = this.state.open;
		const handleDrawerOpen = () => {
			this.setState({ open: true })
		};
		const handleDrawerClose = () => {
			this.setState({ open: false })
		};
		const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
		const {
			isClearable,
			isSearchable,
			isDisabled,
			isLoading,
			isRtl,
		} = this.state;
		return (
			<div className={classes.root}>
				<CssBaseline />
				<AppBar position="absolute" className={clsx(classes.appBar, open && classes.appBarShift)}>
					<Toolbar className={classes.toolbar}>
						<IconButton
							edge="start"
							color="inherit"
							aria-label="open drawer"
							onClick={handleDrawerOpen}
							className={clsx(classes.menuButton, open && classes.menuButtonHidden)}
						>
							<MenuIcon />
						</IconButton>
						<Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
							Bills
						</Typography>
						<SelectContainer>
						<Select
							className="basic-single"
							classNamePrefix="select"
							// defaultValue={colourOptions[0]}
							isDisabled={isDisabled}
							isLoading={isLoading}
							isClearable={isClearable}
							isRtl={isRtl}
							isSearchable={isSearchable}
							name="color"
							options={this.props.categories}
							styles={customStyles}
							placeholder='Search'
							onChange={(event) => this.setState({ currentFilter: (event && event.value) || '' }, () => this.filterResults())}
						/>
						</SelectContainer>
					</Toolbar>
				</AppBar>
				<Drawer
					variant="permanent"
					classes={{
						paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
					}}
					open={open}
				>
					<div className={classes.toolbarIcon}>
						<IconButton onClick={handleDrawerClose}>
							<ChevronLeftIcon />
						</IconButton>
					</div>
					<Divider />
					<List>{mainListItems}</List>
				</Drawer>
				<main style={{width: '100%'}}>
					<Container className={classes.cardGrid} maxWidth={false} >
						{/* End hero unit */}
						<Grid container spacing={4}>
							{this.state.stateData && this.state.stateData.length !== 0 &&
							this.state.stateData.map((bill) => (
								<Grid item key={bill.id} xs={12} sm={6} md={4} lg={3}>
									<Card className={classes.card}>
										<CardMedia
											className={classes.cardMedia}
											image="https://source.unsplash.com/random"
											title="Image title"
										/>
										<CardContent className={classes.cardContent}>
											<Typography
												gutterBottom
												variant="h5"
												component="h2"
											>
												{bill.description}
											</Typography>
											<Typography>Category: {bill.category}</Typography>
											<Typography>
												Total: {bill.amount}
											</Typography>
											<Typography>
												Date : {bill.date}
											</Typography>
										</CardContent>
										<CardActions className={classes.MuiCardActionsRoot}>
											<Button
												size="small"
												color="primary"
											>
												Edit Bill
											</Button>
										</CardActions>
									</Card>
								</Grid>
							))}
						</Grid>
					</Container>
				</main>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		 data: billsSelector(state),
		categories: categorySelector(state)
		// loading: state.loading,
	};
};

const mapDispatchToProps = {
	// getData: getData,
};
export default connect(
	mapStateToProps,
	mapDispatchToProps
)(withStyles(styles)(withRouter(Dashboard)));

const SelectContainer = styled.div`
	width: 20%;
`;
