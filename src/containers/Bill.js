import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import ReceiptIcon from '@material-ui/icons/Receipt';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { withRouter } from 'react-router';
import styled from 'styled-components';
import { billsSelector, categorySelector } from '../selectors';
import { connect } from 'react-redux';
import { createBill, editBill } from '../actions/index';
import CreatableSelect from 'react-select/creatable';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';

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
  },
});

class Bill extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      modalOpen: false,
      date: new Date(),
      description: '',
      category: '',
      amount: '',
      categoryIndex: this.props.bill && this.props.bill.categoryIndex,
    };
  }

  componentDidMount() {
    console.log(this.props);
    if (this.props.editing) {
      this.setState(
        {
          date: this.props.bill.date,
          description: this.props.bill.description,
          category: this.props.bill.category,
          amount: this.props.bill.amount,
          categoryIndex: this.props.bill.categoryIndex,
        },
        () => console.log(this.state)
      );
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState !== this.state) {
      console.log('updated bill state', this.state);
    }
  }

  createBillAction = () => {
    this.props.createBill({
      description: this.state.description,
      date: this.state.date,
      category: this.state.category,
      amount: this.state.amount,
      id: this.props.data.length + 1 || 1,
    });
    this.setState({
      description: '',
      date: new Date(),
      category: '',
      amount: '',
    });
  };

  editBillAction = () => {
    this.props.editBill({
      description: this.state.description,
      date: this.state.date,
      category: this.state.category,
      amount: this.state.amount,
      id: this.props.bill.id,
    });
    this.setState({
      description: '',
      date: new Date(),
      category: '',
      amount: '',
    });
  };

  render() {
    const { classes } = this.props;
    let { editing, creating, bill } = this.props;

    return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <ReceiptIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            {this.props.creating ? 'Create Bill' : 'Edit Bill'}
          </Typography>
          <form className={classes.form} noValidate>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={12}>
                <TextField
                  autoComplete="fname"
                  name="firstName"
                  variant="outlined"
                  required
                  fullWidth
                  id="Description"
                  value={this.state.description}
                  onChange={(event) =>
                    this.setState({ description: event.target.value })
                  }
                  label="Description"
                  autoFocus
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="amount"
                  label="Amount"
                  name="amount"
                  autoComplete="amount"
                  value={this.state.amount}
                  onChange={(event) =>
                    this.setState({ amount: event.target.value })
                  }
                />
              </Grid>
              <Grid item xs={12}>
                <Container className={classes.container}>
                  <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <KeyboardDatePicker
                      disableToolbar
                      variant="inline"
                      format="dd/MM/yyyy"
                      margin="normal"
                      id="date-picker-inline"
                      label="Date"
                      className={classes.MuiFormControlMarginNormal}
                      value={this.state.date}
                      onChange={(date) => this.setState({ date: date })}
                      KeyboardButtonProps={{
                        'aria-label': 'change date',
                      }}
                    />
                  </MuiPickersUtilsProvider>
                </Container>
              </Grid>
              <Grid item xs={12} sm={12}>
                <SelectContainer>
                  <CreatableSelect
                    className="basic-single"
                    classNamePrefix="select"
                    defaultValue={
                      this.props.categories[this.state.categoryIndex]
                    }
                    isDisabled={false}
                    isLoading={false}
                    isClearable={true}
                    isRtl={false}
                    isSearchable={true}
                    name="color"
                    options={this.props.categories}
                    styles={customStyles}
                    placeholder="Category"
                    onChange={(event) =>
                      this.setState({ category: (event && event.value) || '' })
                    }
                  />
                </SelectContainer>
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={(event) => {
                event.preventDefault();
                if (this.props.creating) {
                  this.createBillAction();
                } else if (this.props.editing) {
                  this.editBillAction();
                }
                this.props.toggleModal();
              }}
            >
              {this.props.creating ? 'Create' : 'Edit'}
            </Button>
          </form>
        </div>
      </Container>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    data: billsSelector(state),
    categories: categorySelector(state),
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
)(withStyles(styles)(withRouter(Bill)));

// export default withStyles(styles)((withRouter(Bill)));

const SelectContainer = styled.div`
  width: 100%;
  z-index: 9000;
  background: #ffffff;
`;
