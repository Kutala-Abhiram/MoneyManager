import React from "react";
import PropTypes from "prop-types";
import Navigation from "./Navigation.js";

class ReactHome extends React.Component {
	constructor(props) {
		super(props);
	}

  render () {
    return (
      <React.Fragment>
			 	<Navigation />
      </React.Fragment>
    );
  }
}

export default ReactHome;
