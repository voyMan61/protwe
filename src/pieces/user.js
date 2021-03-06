import React from "react";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
import Paper from '@material-ui/core/Paper';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';

import Dashboard from './Dashboard.js'
import Patterns from './pattern/pattern.js'
import StaffTots from './staffTotals.js'
import Offerings from './offer/offer.js'

const styles = theme => ({
  AppBar: {
    position: 'absolute',
    background: '#600718'
  },
  root: {
    flexGrow: 1,
    zindex: '-1',
    minHeight: 620,
    width: '100%',
    background: 'linear-gradient(155deg, #ad0025  10%, #82001b  60%, #5b0013   90%)'
  },
  aa: {
    background: 'linear-gradient(55deg, #003796  10%, #004b96  60%,  #003296 90%)'
  }
});

function TabContainer(props) {
  return (<Typography component="div" style={{
      padding: 11 * 3
    }}>
    {props.children}
  </Typography>);
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired
};

class USerView extends React.Component {
  state = {
    value: 0,
    auth: true,
    anchorEl: null,
    currentUser: "user",
    Ida: []
  };
  handleChange = (event, value) => {
    this.setState({value});
  };

  handleClose = () => {
    this.setState({anchorEl: null});
  };
  handleClickListItem = event => {
    this.setState({anchorEl: event.currentTarget});
  };

  handleMenuItemClick = (event, index) => {
    this.setState({selectedIndex: index, anchorEl: null});
  };

  handleClose = () => {
    this.setState({anchorEl: null});
  };

  render() {
    const {classes} = this.props;
    const {value} = this.state;
    return (<Paper className={classes.root}>
      <AppBar className={classes.aa} position="static">
        <Tabs value={value} onChange={this.handleChange}>
          <Tab label="Dashboard"/>
          <Tab label="Offerings"/> {
            this.props.linfo > 2
              ? (<Tab label="Staff Totals"/>)
              : (<div></div>)
          }
          <Tab label="Patterns"/>
        </Tabs>

    </AppBar>
    {value === 0 && <TabContainer><Dashboard lin ={this.props.linfo} sid = {this.props.ls} /></TabContainer>}
    {value === 1 && <TabContainer><Offerings lin ={this.props.linfo}/></TabContainer>}
    { this.props.linfo > 2 && value === 2 && <TabContainer><StaffTots/></TabContainer>}
    {value === 3 && <TabContainer><Patterns lin ={this.props.linfo}/></TabContainer>}
  </Paper>);



  }
}

USerView.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(USerView);
