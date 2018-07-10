import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { toggleModal } from "../../actions/actions";

import {
    Button,
    Col,
    DropdownItem,
    DropdownMenu,
    DropdownToggle,
    Nav,
    Navbar,
    NavbarBrand,
    NavItem,
    NavLink,
    Row,
    UncontrolledDropdown
} from "reactstrap";

import Register from "../auth/Register";
import Login from "../auth/Login";
import Welcome from "../auth/Welcome";
import ChangePassword from "../auth/ChangePassword";
import Success from "../util/Success";
import Logout from "../auth/Logout";

export class NavBar extends Component {
    openModal(modalName) {
        this.props.toggleModal(modalName);
    }

    render() {
        const { isAuthenticated } = this.props.auth;

        const authLinks = (
            <Nav>
                <UncontrolledDropdown
                    nav
                    inNavbar
                    style={{
                        display: "inline",
                        marginRight: "1.2em"
                    }}
                >
                    <DropdownToggle color="dark">
                        <p
                            className="text-info"
                            style={{
                                marginTop: "1.3em",
                                marginRight: "1.2em",
                                display: "inline"
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
                                    display: "inline"
                                }}
                            />
                        ) : (
                            ""
                        )}
                    </DropdownToggle>
                    <DropdownMenu right>
                        <DropdownItem
                            onClick={this.openModal.bind(
                                this,
                                "changePasswordModal"
                            )}
                        >
                            Change Password
                        </DropdownItem>
                        <DropdownItem divider />
                        <DropdownItem
                            onClick={this.openModal.bind(this, "logoutModal")}
                        >
                            Logout
                        </DropdownItem>
                    </DropdownMenu>
                </UncontrolledDropdown>
                <ChangePassword />
                <Success />
                <Logout />
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
                            <h1 className="text-info">App Tittle</h1>
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
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    openModal: state.openModal,
    auth: state.auth
});

export default connect(
    mapStateToProps,
    { toggleModal }
)(NavBar);
