import React from "react";
import './IDCard/styles.css';
import Header from "./IDCard/Header";
import Profile from "./IDCard/Profile";
import Footer from "./IDCard/Footer";
class IdentityCard extends React.Component {
  render() {
    const { rollnumber, doe, } = this.props.user;

    return (
      <div className="identityCard bodys">
        <Header title="Ekta High School" />
        <Profile user={this.props.user} />
        <Footer rollnumber={rollnumber} year={new Date(doe).getFullYear()} />
      </div>
    );
  }
}

export default IdentityCard;
