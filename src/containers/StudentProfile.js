// import React from 'react';
// import { connect } from 'react-redux';
// import { getData } from '../actions';
// import AppBar from '@material-ui/core/AppBar';
// import CssBaseline from '@material-ui/core/CssBaseline';
// import Toolbar from '@material-ui/core/Toolbar';
// import Typography from '@material-ui/core/Typography';
// import Container from '@material-ui/core/Container';
// import Link from '@material-ui/core/Link';
// import { withStyles } from '@material-ui/core/styles';
// import { fade } from '@material-ui/core/styles';
// import { studentsTotalSelector } from '../selectors';
// import { withRouter } from 'react-router';
// import { Bar } from 'react-chartjs-2';
// import { Link as NavigationLink } from 'react-router-dom';
//
// function Copyright() {
//   return (
//     <Typography variant="body2" color="textSecondary" align="center">
//       {'Copyright © '}
//       <Link color="inherit" href="https://material-ui.com/">
//         Your Website
//       </Link>{' '}
//       {new Date().getFullYear()}
//       {'.'}
//     </Typography>
//   );
// }
//
// const styles = (theme) => ({
//   icon: {
//     marginRight: theme.spacing(2),
//   },
//   heroContent: {
//     backgroundColor: theme.palette.background.paper,
//     padding: theme.spacing(16, 0, 6),
//     marginTop: theme.spacing(8),
//   },
//   heroButtons: {
//     marginLeft: theme.spacing(2),
//   },
//   cardGrid: {
//     paddingTop: theme.spacing(8),
//     paddingBottom: theme.spacing(8),
//   },
//   card: {
//     height: '100%',
//     display: 'flex',
//     flexDirection: 'column',
//   },
//   cardMedia: {
//     paddingTop: '56.25%', // 16:9
//   },
//   cardContent: {
//     flexGrow: 1,
//   },
//   footer: {
//     backgroundColor: theme.palette.background.paper,
//     padding: theme.spacing(6),
//   },
//
//   grow: {
//     flexGrow: 1,
//   },
//   menuButton: {
//     marginRight: theme.spacing(2),
//   },
//   title: {
//     display: 'none',
//     [theme.breakpoints.up('sm')]: {
//       display: 'block',
//     },
//   },
//   Id: {
//     [theme.breakpoints.up('sm')]: {
//       display: 'block',
//     },
//     fontSize: '20px',
//     fontWeight: '500',
//   },
//   total: {
//     [theme.breakpoints.up('sm')]: {
//       display: 'block',
//     },
//     fontSize: '20px',
//     fontWeight: '500',
//     marginBottom: theme.spacing(1),
//   },
//   MuiToolbarRoot: {
//     justifyContent: 'center',
//   },
//
//   search: {
//     position: 'relative',
//     borderRadius: theme.shape.borderRadius,
//     backgroundColor: fade(theme.palette.common.white, 0.15),
//     '&:hover': {
//       backgroundColor: fade(theme.palette.common.white, 0.25),
//     },
//     alignSelf: 'center',
//     width: '100%',
//     [theme.breakpoints.up('sm')]: {
//       marginLeft: theme.spacing(3),
//       width: 'auto',
//     },
//   },
//   searchIcon: {
//     padding: theme.spacing(0, 2),
//     height: '100%',
//     position: 'absolute',
//     pointerEvents: 'none',
//     display: 'flex',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   inputRoot: {
//     color: 'inherit',
//   },
//   inputInput: {
//     padding: theme.spacing(1, 1, 1, 0),
//     // vertical padding + font size from searchIcon
//     paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
//     transition: theme.transitions.create('width'),
//     width: '100%',
//     [theme.breakpoints.up('md')]: {
//       width: '20ch',
//     },
//   },
//   sectionDesktop: {
//     display: 'none',
//     [theme.breakpoints.up('md')]: {
//       display: 'flex',
//     },
//   },
//   sectionMobile: {
//     display: 'flex',
//     [theme.breakpoints.up('md')]: {
//       display: 'none',
//     },
//   },
//
//   MuiCardActionsRoot: {
//     justifyContent: 'center',
//   },
//   backText: {},
//
//   NotFound: {
//     fontSize: '24px',
//   },
// });
//
// class StudentProfile extends React.Component {
//   constructor() {
//     super();
//     this.state = {
//       student: {},
//     };
//   }
//
//   componentDidMount() {
//     if (this.props.data.length === 0) {
//       this.props.getData();
//     } else {
//       this.findStudent();
//     }
//   }
//
//   componentDidUpdate(prevProps, prevState) {
//     if (prevProps.data !== this.props.data) {
//       this.findStudent();
//     }
//   }
//
//   findStudent() {
//     console.log('findStudent', this.props);
//     const student = this.props.data.filter(
//       (item) => item.student_id.toString() === this.props.match.params.id
//     )[0];
//     console.log('student', student);
//     this.setState({ student });
//   }
//
//   render() {
//     const { classes } = this.props;
//     let data;
//     if (this.state.student && this.state.student.marks) {
//       data = {
//         labels: Object.keys(this.state.student.marks),
//         datasets: [
//           {
//             label: 'Marks',
//             backgroundColor: 'rgba(255,99,132,0.2)',
//             borderColor: 'rgba(255,99,132,1)',
//             borderWidth: 1,
//             hoverBackgroundColor: 'rgba(255,99,132,0.4)',
//             hoverBorderColor: 'rgba(255,99,132,1)',
//             data: Object.values(this.state.student.marks),
//           },
//         ],
//       };
//     }
//
//     return (
//       <React.Fragment>
//         <CssBaseline />
//         <AppBar position="fixed">
//           <Toolbar className={classes.MuiToolbarRoot}>
//             <NavigationLink
//               to="/dashboard"
//               style={{
//                 color: '#FFFFFF',
//                 alignSelf: 'center',
//                 cursor: 'pointer',
//                 left: 0,
//                 position: 'absolute',
//                 marginLeft: '8px',
//                 textDecoration: 'none',
//               }}
//             >
//               <Typography variant="h6" className={classes.backText}>
//                 Back
//               </Typography>
//             </NavigationLink>
//             <Typography variant="h6" className={classes.title}>
//               {(this.state.student && this.state.student.name) || 'Student'}
//             </Typography>
//           </Toolbar>
//         </AppBar>
//         {!this.state.student ? (
//           <div className={classes.heroContent}>
//             <Container maxWidth="sm">
//               <Typography variant="p" className={classes.NotFound}>
//                 Student Not found
//               </Typography>
//             </Container>
//           </div>
//         ) : (
//           <main>
//             <div className={classes.heroContent}>
//               <Container maxWidth="sm">
//                 <Typography variant="p" className={classes.Id}>
//                   Id: {this.state.student && this.state.student.student_id}
//                 </Typography>
//                 <Typography variant="p" className={classes.total}>
//                   Total Marks: {this.state.student && this.state.student.total}
//                 </Typography>
//               </Container>
//               <Container maxWidth="sm">
//                 <Bar
//                   data={data}
//                   width={100}
//                   height={250}
//                   options={{
//                     maintainAspectRatio: false,
//                   }}
//                 />
//               </Container>
//             </div>
//           </main>
//         )}
//       </React.Fragment>
//     );
//   }
// }
//
// const mapStateToProps = (state) => {
//   return {
//     data: studentsTotalSelector(state),
//   };
// };
//
// const mapDispatchToProps = {
//   getData: getData,
// };
//
// export default connect(
//   mapStateToProps,
//   mapDispatchToProps
// )(withStyles(styles)(withRouter(StudentProfile)));
