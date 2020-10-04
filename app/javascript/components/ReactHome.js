import React from "react";
import PropTypes from "prop-types";
import Navigation from "./Navigation.js";

class ReactHome extends React.Component {
	constructor(props) {
		super(props);
    this.state = {isMobile: window.innerWidth <= 760};
    this.resizeScreen = this.resizeScreen.bind(this); 
	}

  componentDidMount() {
    window.addEventListener("resize", this.resizeScreen());
  }

  resizeScreen() {
    this.setState({isMobile: window.innerWidth <= 760});
  }

  render () {
    return (
      <React.Fragment>
			 	<Navigation isMobile={this.state.isMobile} />
      </React.Fragment>
    );
  }
}

export default ReactHome;
