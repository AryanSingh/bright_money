import React from 'react';
import clsx from 'clsx';
import { connect } from 'react-redux';
import styled from 'styled-components';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import Select from 'react-select';
import {
  billsSelector,
  categorySelector,
  sortedAmountSelector,
} from '../selectors';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';

import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Bill from './Bill';
import { withStyles } from '@material-ui/core/styles';
import { withRouter } from 'react-router';
import Modal from '@material-ui/core/Modal';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import AddIcon from '@material-ui/icons/Add';
import TimelineIcon from '@material-ui/icons/Timeline';
import DateFnsAdapter from '@date-io/date-fns';
import Timeline from './Timeline';
var moment = require('moment');

var Loader = require('react-loader');

function getModalStyle() {
  const top = 30;
  const left = 50;

  return {
    position: 'relative',
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${50}%, -${left}%)`,
    background: '#FFFFFF',
    width: '50%',
  };
}

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
    width: '100%',
  },
  MuiCardActionsRoot: {
    justifyContent: 'center',
  },
  MuiFilledInputRoot: {
    backgroundColor: '#FFFFFF',
  },
});

const customStyles = {
  option: (provided, state) => ({
    ...provided,
    borderBottom: '1px dotted pink',
    color: state.isSelected ? 'red' : 'blue',
    padding: 20,
  }),
};

class Dashboard extends React.Component {
  constructor() {
    super();
    this.state = {
      open: true,
      searchStr: '',
      isClearable: true,
      isDisabled: false,
      isLoading: false,
      isRtl: false,
      isSearchable: true,
      currentFilter: '',
      stateData: [],
      modalOpen: false,
      editing: false,
      creating: true,
      bill: null,
      timeModal: false,
      budget: null,
      budgetIndices: [],
    };
  }

  componentDidMount() {
    if (this.props.data && this.props.data.length !== 0) {
      this.setState({ stateData: this.props.data });
    }

    // console.log('props', this.props);
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps !== this.props) {
      // console.log('props', this.props);
      this.setState({ stateData: this.props.data });
    }
    if (prevState.budget !== this.state.budget) {
      console.log('updated state', this.state);
      this.findHighlighted();
    }
  }

  findHighlighted = () => {
    let tempArr = [];
    let currSum = 0;
    let budget = this.state.budget;
    // debugger
    for (let i = 0; i < this.props.sortedData.length; i++) {
      if (currSum < budget) {
        if (currSum + this.props.sortedData[i].amount <= budget) {
          currSum += this.props.sortedData[i].amount;
          // debugger
          tempArr.push(this.props.sortedData[i].id);
        } else if (currSum + this.props.sortedData[i].amount > budget) {
          continue;
        }
      }
    }
    this.setState({ budgetIndices: tempArr });
  };

  toggleModal = () => {
    this.setState({
      modalOpen: !this.state.modalOpen,
      creating: false,
      editing: false,
      bill: null,
    });
  };

  toggleTimeModal = () => {
    this.setState({
      timeModal: !this.state.timeModal,
    });
  };

  setEditedBill = (bill) => {
    let categoryIndex = this.props.categories.indexOf(
      this.props.categories.filter((item) => item.value === bill.category)[0]
    );
    bill.categoryIndex = categoryIndex;
    this.setState({
      bill: bill,
      editing: true,
      creating: false,
      modalOpen: true,
    });
  };

  filterResults = () => {
    if (this.state.currentFilter === '') {
      this.setState({ stateData: this.props.data });
    } else {
      let newData = this.props.data.filter((item) => {
        if (item.category === this.state.currentFilter) {
          return item;
        }
      });
      this.setState({ stateData: newData });
    }
  };

  renderModal = () => {
    return (
      <Modal
        open={this.state.modalOpen}
        onClose={this.toggleModal}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <div style={getModalStyle()}>
          <Bill
            creating={this.state.creating}
            editing={this.state.editing}
            bill={this.state.bill}
            toggleModal={this.toggleModal}
          />
        </div>
      </Modal>
    );
  };

  renderTimeModal = () => {
    return (
      <Modal
        open={this.state.timeModal}
        onClose={this.toggleTimeModal}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <Timeline />
      </Modal>
    );
  };

  render() {
    const { classes } = this.props;
    const open = this.state.open;
    const handleDrawerOpen = () => {
      this.setState({ open: true });
    };
    const dateFns = new DateFnsAdapter();
    const handleDrawerClose = () => {
      this.setState({ open: false });
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
        <AppBar
          position="absolute"
          className={clsx(classes.appBar, open && classes.appBarShift)}
        >
          <Toolbar className={classes.toolbar}>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              className={clsx(
                classes.menuButton,
                open && classes.menuButtonHidden
              )}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              className={classes.title}
            >
              Bills
            </Typography>
            <StyledInput
              placeholder="Budget"
              type="number"
              id="lname"
              name="lname"
              value={String(this.state.budget)}
              onChange={(event) =>
                this.setState({ budget: Number(event.target.value) })
              }
              className={classes.MuiFilledInputRoot}
            />

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
                placeholder="Search"
                onChange={(event) =>
                  this.setState(
                    { currentFilter: (event && event.value) || '' },
                    () => this.filterResults()
                  )
                }
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
          <List>
            <div>
              <ListItem
                button
                onClick={() => {
                  this.setState({
                    creating: true,
                    editing: false,
                    modalOpen: true,
                  });
                }}
              >
                <ListItemIcon>
                  <AddIcon color="primary" />
                </ListItemIcon>
                <ListItemText primary="Create New Bill" />
              </ListItem>
              <ListItem
                button
                onClick={() => this.setState({ timeModal: true })}
              >
                <ListItemIcon>
                  <TimelineIcon />
                </ListItemIcon>
                <ListItemText primary="Timeline" />
              </ListItem>
            </div>
          </List>
        </Drawer>
        <main style={{ width: '100%' }}>
          {this.renderModal()}
          {this.renderTimeModal()}
          <Container className={classes.cardGrid} maxWidth={false}>
            {/* End hero unit */}
            <Grid container spacing={4}>
              {this.state.stateData &&
                this.state.stateData.length !== 0 &&
                this.state.stateData.map((bill) => (
                  <Grid item key={bill.id} xs={12} sm={6} md={4} lg={3}>
                    <StyledCard
                      className={classes.card}
                      selected={
                        this.state.budgetIndices.indexOf(bill.id) !== -1
                      }
                    >
                      <CardMedia
                        className={classes.cardMedia}
                        image="https://source.unsplash.com/random"
                        title="Image title"
                      />
                      <CardContent className={classes.cardContent}>
                        <Typography gutterBottom variant="h5" component="h2">
                          {bill.description}
                        </Typography>
                        <Typography>Category: {bill.category}</Typography>
                        <Typography>Total: {bill.amount}</Typography>
                        <Typography>
                          Date : {moment(bill.date).format('DD-MM-YYYY')}
                        </Typography>
                      </CardContent>
                      <CardActions className={classes.MuiCardActionsRoot}>
                        <StyledButton
                          size="small"
                          color="primary"
                          selected={
                            this.state.budgetIndices.indexOf(bill.id) !== -1
                          }
                          onClick={() => this.setEditedBill(bill)}
                        >
                          Edit Bill
                        </StyledButton>
                      </CardActions>
                    </StyledCard>
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
    categories: categorySelector(state),
    sortedData: sortedAmountSelector(state),
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

const StyledCard = styled(Card)`
  background: ${(props) => (props.selected ? '#3F51B5' : 'White')};
  color: ${(props) => (props.selected ? '#FFFFFF' : 'inherit')};
`;

const StyledButton = styled(Button)`
  color: ${(props) => (props.selected ? '#FFFFFF' : '#3F51B5')};
`;

const StyledInput = styled.input`
  height: 38px;
  font-size: 16px;
  webkit-align-items: center;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  background-color: hsl(0, 0%, 100%);
  border-color: hsl(0, 0%, 80%);
  border-radius: 4px;
  border-style: solid;
  border-width: 1px;
  cursor: default;
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  -webkit-flex-wrap: wrap;
  -ms-flex-wrap: wrap;
  flex-wrap: wrap;
  -webkit-box-pack: justify;
  -webkit-justify-content: space-between;
  -ms-flex-pack: justify;
  justify-content: space-between;
  min-height: 38px;
  outline: 0 !important;
  position: relative;
  -webkit-transition: all 100ms;
  transition: all 100ms;
  box-sizing: border-box;
  width: 20%;
  margin-right: 4px;
`;
