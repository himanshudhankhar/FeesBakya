import React from "react";

class Header extends React.Component {
  render() {
    return <header className="identityCard__header">{this.props.title}</header>;
  }
}

export default Header;
