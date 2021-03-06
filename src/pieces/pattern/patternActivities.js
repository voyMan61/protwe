import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import {withStyles} from '@material-ui/core/styles';

import LinearProgress from '@material-ui/core/LinearProgress';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import URL from '../ui/url.json'
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';

const CustomTableCell = withStyles(theme => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
    fontSize: 13,
    textAlign: 'center'
  },
  body: {
    fontSize: 12
  }
}))(TableCell);

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 2,
    overflowX: 'auto'
  },
  table: {
    maxWidth: 700
  },
  row: {
    '&:nth-of-type(odd)': {
      backgroundColor: 'theme.palette.background.default'
    }
  },
  button: {
    alignContent: 'center'
  }
});

class CustomizedTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      classes: this.props.classes,
      activityLookupLoaded: false,
      activityLookupData: this.props.activityLookupData,
      frAct: [],
      psAct: [],
      ptAct: [],
      totalfr: 0,
      totalps: 0,
      totalpt: 0,
      open: true,
      scroll: 'paper'
    }
  }

  progress = () => {
    const {completed} = this.state;
    if (completed > 100) {
      this.setState({completed: 0, buffer: 10});
    } else {
      const diff = Math.random() * 10;
      const diff2 = Math.random() * 10;
      this.setState({
        completed: completed + diff,
        buffer: completed + diff + diff2
      });
    }
  };

  handleClickOpen = scroll => () => {
    this.setState({open: true, scroll});
  };

  handleClose = () => {
    this.setState({open: false});
  };
  handleStuff = () => {
    this.setState({open: false});
  }

  componentDidMount() {
    var activityLookupObj;
    var calfr = 0;
    var calps = 0;
    var calpt = 0;
    fetch(URL.url + 'activitylookup/' + this.props.Pid, {
      //mode: 'no-cors',
      method: 'GET',
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    },).then(response => {
      if (response.ok) {
        response.json().then(json => {
          activityLookupObj = json;
          for (var i = 0; i < activityLookupObj.length; i++) {
            if (activityLookupObj[i].type === "fr") {
              this.state.frAct.push(activityLookupObj[i])
              calfr += activityLookupObj[i].hour
            } else if (activityLookupObj[i].type === "pt") {
              this.state.ptAct.push(activityLookupObj[i])
              calpt += activityLookupObj[i].hour
            } else if (activityLookupObj[i].type === "ps") {
              this.state.psAct.push(activityLookupObj[i])
              calps += activityLookupObj[i].hour
            }
          }
          this.setState({activityLookupLoaded: true, activityLookupData: activityLookupObj, totalfr: calfr, totalps: calps, totalpt: calpt})
        });
      }
    });

  }

  render() {
    const {classes} = this.props;
    if (this.state.activityLookupLoaded === true) {
      //console.log(this.state.frAct)
      //console.log(this.state.psAct)
      //console.log(this.state.ptAct)
      return (<Paper className={this.state.classes.root}>

        <Dialog open={this.state.open} scroll={this.state.scroll} aria-labelledby="scroll-dialog-title">

          <DialogTitle id="scroll-dialog-title">
            <div style={{
                padding: 1,
                maxWidth: 300
              }}>
              <Typography variant="subheading" gutterBottom="gutterBottom" noWrap="noWrap">
                Pattern Activities
              </Typography>
              <Typography style={{
                  position: 'absolute',
                  top: '2%',
                  left: '33%'
                }} gutterBottom="gutterBottom" align="right" variant="display1">
                {this.props.Pcode}
              </Typography>
            </div>

            <Button variant="fab" color="secondary" style={{
                position: 'absolute',
                top: '1%',
                right: '2%'
              }} className={classes.button} onClick={this.props.viewed}>
              <CloseIcon/>
            </Button>

          </DialogTitle>
          <DialogContent style={{
              padding: 4,
              minWidth: 400,
              background: 'linear-gradient(55deg, #e2e2e2  10%, #fdfff9 90%)'
            }}>
            <DialogContentText>

              <Table className={this.state.classes.table} style={{
                  background: 'linear-gradient(55deg, #f2f2f2  10%, #fdfff9 90%)'
                }}>
                {
                  this.state.frAct.length !== 0 && <TableHead>
                      <TableRow>
                        <CustomTableCell>Flat rate activities</CustomTableCell>
                        <CustomTableCell>Total Number of Hours: {this.state.totalfr}</CustomTableCell>
                      </TableRow>
                    </TableHead>
                }
                <TableBody>
                  {
                    this.state.frAct.map(n => {

                      return (<TableRow className={this.state.classes.row} key={n.id}>
                        <CustomTableCell component="th" scope="row">
                          {n.name}
                        </CustomTableCell>
                        <CustomTableCell style={{
                            textAlign: 'center'
                          }}>{n.hour}</CustomTableCell>
                      </TableRow>);
                    })
                  }
                </TableBody>

                {
                  this.state.ptAct.length !== 0 && <TableHead>
                      <TableRow>
                        <CustomTableCell>Per tutorial/group activities</CustomTableCell>
                        <CustomTableCell>Total Number of Hours: {this.state.totalpt}</CustomTableCell>
                      </TableRow>
                    </TableHead>
                }
                <TableBody>
                  {
                    this.state.ptAct.map(n => {
                      return (<TableRow className={this.state.classes.row} key={n.id}>
                        <CustomTableCell component="th" scope="row">
                          {n.name}
                        </CustomTableCell>
                        <CustomTableCell style={{
                            textAlign: 'center'
                          }}>{n.hour}</CustomTableCell>
                      </TableRow>);
                    })
                  }
                </TableBody>
                {
                  this.state.psAct.length !== 0 && <TableHead>
                      <TableRow>
                        <CustomTableCell>Per student activities</CustomTableCell>
                        <CustomTableCell style={{
                            textAlign: 'center'
                          }}>Total Number of Hours: {this.state.totalps}</CustomTableCell>
                      </TableRow>
                    </TableHead>
                }
                <TableBody>
                  {
                    this.state.psAct.map(n => {
                      return (<TableRow className={this.state.classes.row} key={n.id}>
                        <CustomTableCell component="th" scope="row">
                          {n.name}
                        </CustomTableCell>
                        <CustomTableCell style={{
                            textAlign: 'center'
                          }}>{n.hour}</CustomTableCell>
                      </TableRow>);
                    })
                  }
                </TableBody>
              </Table>
            </DialogContentText>
          </DialogContent>
        </Dialog>
      </Paper>);
    } else {
      return (<Paper className={this.state.classes.root}>
        <Dialog open={this.state.open} scroll={this.state.scroll} aria-labelledby="scroll-dialog-title">
          <DialogTitle id="scroll-dialog-title">Loading Pattern - {this.props.Pcode}
          </DialogTitle>
          <DialogContent>
            <DialogContentText>

              <LinearProgress color="primary" variant="query"/>

            </DialogContentText>
          </DialogContent>
        </Dialog>
      </Paper>)
    }
  }
}

export default withStyles(styles)(CustomizedTable);
