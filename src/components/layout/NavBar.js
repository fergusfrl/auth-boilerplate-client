import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { toggleModal, logoutUser } from "../../actions/actions";

import {
    Button,
    Col,
    Nav,
    Navbar,
    NavbarBrand,
    NavItem,
    NavLink,
    Row
} from "reactstrap";

import Register from "../auth/Register";
import Login from "../auth/Login";
import Welcome from "../auth/Welcome";

export class NavBar extends Component {
    openModal(modalName) {
        this.props.toggleModal(modalName);
    }

    onLogoutClick(e) {
        e.preventDefault();
        this.props.logoutUser();
    }

    render() {
        const { isAuthenticated } = this.props.auth;

        const authLinks = (
            <Nav>
                <NavItem>
                    <NavLink>
                        <Button
                            outline
                            color="info"
                            onClick={this.onLogoutClick.bind(this)}
                        >
                            Logout
                        </Button>
                    </NavLink>
                </NavItem>
                <p
                    className="text-info"
                    style={{
                        marginTop: "15px",
                        marginLeft: "10px"
                    }}
                >
                    {this.props.auth.user.name}
                </p>
                {this.props.auth && this.props.auth.user.avatar ? (
                    <img
                        src={this.props.auth.user.avatar}
                        height="30px"
                        width="30px"
                        alt="User Avatar"
                        style={{
                            borderRadius: "20px",
                            marginTop: "13px",
                            marginLeft: "25px",
                            marginRight: "15px"
                        }}
                    />
                ) : (
                    ""
                )}
            </Nav>
        );

        const guestLinks = (
            <Nav>
                <NavItem>
                    <NavLink href="#">
                        <Button
                            outline
                            color="info"
                            onClick={this.openModal.bind(this, "registerModal")}
                        >
                            Register
                        </Button>
                    </NavLink>
                </NavItem>
                <NavItem>
                    <NavLink href="#">
                        <Button
                            outline
                            color="info"
                            onClick={this.openModal.bind(this, "loginModal")}
                        >
                            Login
                        </Button>
                    </NavLink>
                </NavItem>
                <Register />
                <Login />
                <Welcome />
            </Nav>
        );

        return (
            <Navbar color="dark">
                <NavbarBrand href="#">
                    <Row>
                        <Col>
                            <h1 className="text-info">App Title</h1>
                        </Col>
                    </Row>
                </NavbarBrand>
                {isAuthenticated ? authLinks : guestLinks}
            </Navbar>
        );
    }
}

NavBar.propTypes = {
    toggleModal: PropTypes.func.isRequired,
    logoutUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    openModal: state.openModal,
    auth: state.auth
});

export default connect(
    mapStateToProps,
    { toggleModal, logoutUser }
)(NavBar);
