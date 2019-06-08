import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import './Header.css';

class Header extends Component {
    renderContent() {
        switch (this.props.auth) {
            case false:
                return [
                    <li key="3" style={{ margin: "0 10px" }}>
                        <Link to="/auth/login">Login</Link>
                    </li>,
                    <li key="2">
                        <Link to="/auth/register">Register</Link>
                    </li>
                ];
            default:
                return [
                    <li key="3" style={{ margin: "0 10px" }}>
                        <Link to="/blogs">My Blogs</Link>
                    </li>,
                    <li key="2">
                        <Link to="/auth/logout">Logout</Link>
                    </li>
                ];
        }
    }

    render() {
        return (
            <nav>
                <div className="nav-wrapper">
                    <Link
                        to={this.props.auth ? "/blogs" : "/"}
                        className="left brand-logo"
                        style={{ marginLeft: "10px" }}
                    >
                        Blogger
                    </Link>
                    <ul className="right">{this.renderContent()}</ul>
                </div>
            </nav>
        );
    }
}

const mapStateToProps = ({ auth }) => {
    return { auth };
}

export default connect(mapStateToProps)(Header);
