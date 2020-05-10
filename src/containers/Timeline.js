import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { withRouter } from 'react-router';
import styled from 'styled-components';
import {
  billsSelector,
  categorySelector,
  sortedBillsSelector,
} from '../selectors';
import { connect } from 'react-redux';
import { createBill, editBill } from '../actions/index';
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from 'recharts';

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

const customStyles = {
  option: (provided, state) => ({
    ...provided,
    borderBottom: '1px dotted pink',
    color: state.isSelected ? 'red' : 'blue',
    padding: 20,
    zIndex: 1000,
  }),
};

function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const styles = (theme) => ({
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
  ModalContainer: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  MuiFormControlMarginNormal: {
    width: '100%',
  },
  container: {
    width: '100%',
    padding: 0,
    background: '#FFFFFF',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 'fit-content',
    padding: '20px',
  },
});

class Timeline extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    console.log('timeline props', this.props);
  }

  componentDidUpdate(prevProps, prevState) {}

  renderLineChart = () => (
    <LineChart width={600} height={300} data={this.props.sortedBills}>
      <Line type="monotone" dataKey="amount" stroke="#8884d8" />
      <CartesianGrid stroke="#ccc" />
      <XAxis dataKey="date" />
      <YAxis />
      <Tooltip />
      <Legend />
    </LineChart>
  );

  render() {
    const { classes } = this.props;
    let {} = this.props;

    return (
      <Container component="main" maxWidth="lg" className={classes.container}>
        <CssBaseline />
        {this.renderLineChart()}
      </Container>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    data: billsSelector(state),
    categories: categorySelector(state),
    sortedBills: sortedBillsSelector(state),
    // loading: state.loading,
  };
};

// const mapDispatchToProps = {
// 	createBill: (data) => dispatch(createBill(data))
// };

const mapDispatchToProps = (dispatch) => {
  return {
    createBill: (data) => dispatch(createBill(data)),
    editBill: (data) => dispatch(editBill(data)),
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(withRouter(Timeline)));

// export default withStyles(styles)((withRouter(Timeline)));

const SelectContainer = styled.div`
  width: 100%;
  z-index: 9000;
  background: #ffffff;
`;
