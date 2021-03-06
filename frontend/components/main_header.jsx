import React from 'react';
import { Link } from 'react-router-dom';

class MainHeader extends React.Component {

  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.setState = this.setState.bind(this);
  }

  update(field) {
    return (e) => {
      this.setState({[field]:e.target.value});
    };
  }

  componentDidUpdate() {
    this.props.fetchMatches(this.state);
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.fetchBizs(this.state);
    if (this.props.match.path != "/search") {
      this.props.history.push("/search");
    }
  }

  logo () {
    return (
      <div className="logo-default-div">
        <Link to="/" className="logo-default">Eatery</Link>
        <Link to="/">
          <img className="chefPic" id="default-chef" src={window.chefLogo}></img>
        </Link>
      </div>
    );
  }

  sessionLink () {
    return (
      <div className="signup-default-div">
        <Link className="signup-default" to="/signup">Sign Up</Link>
      </div>
    );
  }

  greeter (currentUser) {
    return (
      <div className="greeter-default-div">
        <img className="greeter-default-img" src={currentUser.img_url} />
      </div>
    );
  }

  searchBar () {
    return (
      <form className="search-default-div" onSubmit={this.handleSubmit}>
        <span className="search-default-label" id="search-default-first">Find</span>
        <input
          className="search-default-input"
          type="text"
          onChange={this.update('search')}
          placeholder="category or restaurant name"
          id="filter"
          />
        <span className="search-default-label" id="search-default-second"><p className="short-default-border">Near</p></span>
        <input
          className="search-default-input"
          type="text"
          placeholder="Manhattan, NY"
        />
        <input className="search-default-submit" type="submit" value="Go"/>
      </form>
    );
  }

  mainHeaderSearch (currentUser) {
    const userPresence = currentUser ? this.greeter(currentUser) : this.sessionLink();
    return (
      <div className="header-container-default">
        <img className="star-logo" src={window.starLogo}></img>
        <header className="header-default">
          {this.logo()}
          {this.searchBar()}
          {userPresence}
        </header>
      </div>
    );
  }

  loginButton (currentUser, logout) {
    if (!currentUser) {
      return (
        <Link to="/login" className="header-default-login">Log In</Link>
      );
    } else {
      return (
        <Link className="header-default-login" to="/login" onClick={logout}>Log Out</Link>
      );
    }
  }

  mainHeaderLinks (currentUser, logout) {
    return (
      <div className="header-default-links-container">
        <div className="header-default-links">
          <Link className="header-default-link" id="header-default-link-first"
            to="/search">Search Page</Link>
          <p className="header-default-link-period">.</p>
          <a className="header-default-link about-me"
            href="https://dannam.xyz"
            target="_blank">About Me</a>
          <p className="header-default-link-period">.</p>
          <a className="header-default-link about-me"
            href="https://github.com/dannam83"
            target="_blank">GitHub</a>
          <a className="header-default-link about-me"
            href="https://www.linkedin.com/in/daniel-nam-4032a0b/"
            target="_blank">LinkedIn</a>
          <a className="header-default-link about-me"
            href="https://angel.co/daniel-nam-3?public_profile=1"
            target="_blank">Angel List</a>
          <p className="header-default-link-period">.</p>
          <a className="header-default-link about-me"
            href="https://dannam.xyz/images/resume.pdf"
            target="_blank">Resume</a>
          <a className="header-default-link about-me"
            href="mailto:dannam83@gmail.com">Contact</a>
          <p className="header-default-space"></p>
          {this.loginButton(currentUser, logout)}
        </div>
      </div>
    );
  }

  render () {
    const props = this.props;
    return (
      <div className="header-container-default-master">
        {this.mainHeaderSearch(props.currentUser)}
        {this.mainHeaderLinks(props.currentUser, props.logout)}
      </div>
    );
  }

}

export default MainHeader;
