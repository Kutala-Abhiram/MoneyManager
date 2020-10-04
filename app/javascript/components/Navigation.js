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
    justifyContent: 'flex-end',
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

export default function Navigation() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div>
      <Grid container className={classes.borderBottom}>
        <Grid item xs={12} sm={10}>
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
        <Grid item xs={12} sm={2} className={classes.transaction}>
          <div className={classes.transaction}>
            <Button variant="outlined" color="primary">New Transaction</Button>      
          </div>
        </Grid>
      </Grid>
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
    </div>
  );
}
