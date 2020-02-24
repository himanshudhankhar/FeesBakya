import React from "react";

class Footer extends React.Component {
  render() {
    const { rollnumber ,year} = this.props;

    return (
      <footer className="identityCard__footer">
        <div className="filled">
          <span>Roll Number:{rollnumber}</span>
        </div>
        <div className="filled">
          <span>
             Issued In:{year}
             
          </span>
        </div>
      </footer>
    );
  }
}

export default Footer;
