import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';

import PatternCreator from './pattern/patternCreator.js'
import PatternDetails from './pattern/patternDetails.js'
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';


const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
  },
  paper: {
    margin: theme.spacing.unit,
    position: 'absolute',
    width: theme.spacing.unit * 150,
    height: theme.spacing.unit * 50,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 4,
  },

});

const toolbarStyles = theme => ({
    root: {
      paddingRight: theme.spacing.unit,
    },
    spacer: {
      flex: '1 1 100%',
    },
    actions: {
      color: '#00838F',
    },
    title: {
      flex: '0 0 auto',
    },
  });

class EnhancedTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      creating: false,
      creatorOpen: false,
    };
  }
  handleChange = () => {
    this.setState(state => ({ checked: !state.checked }));
  };


  handleCreator = () => {
    console.log('create');
    this.setState({ creatorOpen: true });
  };

  handleChange = event => {
    const patternID = this.state.patternData.find(item => item.code === event.target.value).id;
    sessionStorage.setItem('patternCode', event.target.value);
    sessionStorage.setItem('patternID', patternID);
    this.setState({ [event.target.name]: event.target.value });
};

handleClick = () => {
  this.setState(state => ({
    Copen: !state.open,
  }));
};

handleClickAway = () => {
  this.setState({
    Copen: false,
    patterAct: false,
  });
};

viewerClosed() {
  this.setState({
    currentCount: this.state.currentCount+1,
    patterAct: false
  }),
  console.log('rrrrr')
};

handleOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

creatorClosed() {
    this.setState({
      creatorOpen: false
    }),
    console.log('rrrrr')
  };
  
componentDidMount() {

}

  render() {
  const { classes } = this.props;
  const { creatorOpen, creating} = this.state;

  if(creatorOpen){
      return(
        <Paper>
        <Toolbar>
                <Typography style={{position: 'absolute', left: 60}} variant="title" id="tableTitle">
                    Patterns
                </Typography> 
        </Toolbar>
        <PatternCreator cclosed={this.creatorClosed.bind(this)}/>
        <PatternDetails/>
        </Paper>
      );}
  else{
    return (
        <Paper>
        <Toolbar>
            
                <Typography style={{position: 'absolute', left: 60}} variant="title" id="tableTitle">
                    Patterns
                </Typography> 
                    <Button style={{position: 'absolute', right: 60}} variant="contained" size="large" color="secondary" onClick={this.handleCreator}>
                        Create new pattern
                    </Button>
        </Toolbar>
        <PatternDetails/>
        </Paper>
      );

    }
}
}

EnhancedTable.propTypes = {
  classes: PropTypes.object.isRequired,
};
export default withStyles(styles)(EnhancedTable);