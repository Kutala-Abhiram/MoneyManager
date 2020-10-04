import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Dashboard from './Dashboard.js';
import Transactions from './Transactions.js';
import Settings from './Settings.js';
import Support from './Support.js';
import { Button } from '@material-ui/core';
import { Grid } from '@material-ui/core';
import { Modal } from '@material-ui/core';
import TransactionForm from './TransactionForm.js';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

const NewTransaction = (props) => {
  const {classes, showModal, ...other} = props;

  return (
    <Grid item xs={6} sm={2} className={classes.transaction}>
      <div className={classes.transaction}>
        <Button variant="outlined" color="primary" onClick={showModal} >New Transaction</Button> 
      </div>
    </Grid>     
  );
}

const TransactionModal = (props) => {
  const {handleClose, show, ...others} = props;

  return (
    <Modal open={show} onClose={handleClose} aria-labelledby="simple-modal-title" aria-describedby="simple-modal-description">
      <div>
        <TransactionForm />
      </div>
    </Modal>
  );
}

const MobileView = (props) => {
  const {classes, value, handleChange, ...other} = props;
  const [show, setShow] = React.useState(false);

  const showModal = (event) => {
    setShow(true);
  };

  const hideModal = (event) => {
    setShow(false);
  };

  return (
    <main>
      <Grid container className={classes.borderBottom}>
        <Grid item xs={6} sm={1}>
        </Grid>
        <NewTransaction classes={classes} showModal={showModal} />
        <AppGrid classes={classes} value={value} handleChange={handleChange} />
      </Grid>
      <TabPanels classes={classes} value={value} handleChange={handleChange} />   
      <TransactionModal handleClose={hideModal} show={show} />   
    </main>
  );
}

const WebView = (props) => {
  const {classes, value, handleChange, ...other} = props;
  const [show, setShow] = React.useState(false);

  const showModal = (event) => {
    setShow(true);
  };

  const hideModal = (event) => {
    setShow(false);
  };

  return (
    <main>
      <Grid container className={classes.borderBottom}>
        <Grid item xs={6} sm={1}>
        </Grid>
        <AppGrid classes={classes} value={value} handleChange={handleChange} />
        <NewTransaction classes={classes} showModal={showModal} />
      </Grid>
      <TabPanels classes={classes} value={value} handleChange={handleChange} /> 
      <TransactionModal handleClose={hideModal} show={show} />        
    </main>
  );
}

const AppGrid = (props) => {
  const {classes, value, handleChange, ...other} = props;

  return (
    <Grid item xs={12} sm={9}>
      <div className={classes.root}>
        <AppBar position="static" className={classes.tabsRoot}>
          <Tabs value={value} onChange={handleChange} aria-label="Navigation Bar">
            <Tab label="Board" {...a11yProps(0)} />
            <Tab label="Transactions" {...a11yProps(1)} />
            <Tab label="Settings" {...a11yProps(2)} />
            <Tab label="Support" {...a11yProps(2)} />
          </Tabs>
        </AppBar>
      </div>  
    </Grid>
  );
}

const TabPanels = (props) => {
  const {classes, value, handleChange, ...other} = props;

  return (
    <div>
      <TabPanel value={value} index={0}>
        < Dashboard />
      </TabPanel>
      <TabPanel value={value} index={1}>
        < Transactions />
      </TabPanel>
      <TabPanel value={value} index={2}>
        < Settings />
      </TabPanel>
      <TabPanel value={value} index={3}>
        < Support />
      </TabPanel>
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
  },
  transaction: {
    display: 'flex',
    height: 'inherit',
    justifyContent: 'space-evenly',
    padding: '5px'
  },
  tabsRoot: {
    backgroundColor: 'white',
    color: 'black',
  },
  borderBottom: {
    borderBottom: '1px solid #ebebeb'
  }
}));

export default function Navigation(props) {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const [mobile, setMobile] = React.useState(props.isMobile);


  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return mobile ? (<MobileView classes={classes} value={value} handleChange={handleChange} />) : (<WebView classes={classes} value={value} handleChange={handleChange} /> )
}