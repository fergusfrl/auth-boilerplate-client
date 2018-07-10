import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import classnames from "classnames";

import { toggleModal, changePassword } from "../../actions/actions";

import {
    Button,
    Form,
    FormGroup,
    Input,
    Label,
    Modal,
    ModalBody,
    ModalFooter,
    ModalHeader
} from "reactstrap";

class ChangePassword extends Component {
    constructor() {
        super();
        this.state = {
            password: "",
            newPassword: "",
            newPassword2: "",
            errors: {}
        };

        this.closeModal = this.closeModal.bind(this);
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    componentDidMount() {
        if (this.props.auth.isAuthenticated) {
            // Close modal
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.errors) {
            this.setState({ errors: nextProps.errors });
        }
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    onSubmit(e) {
        e.preventDefault();

        console.log(this.props.auth.user.email);

        const updateUser = {
            email: this.props.auth.user.email,
            password: this.state.password,
            newPassword: this.state.newPassword,
            newPassword2: this.state.newPassword2
        };

        this.props.changePassword(updateUser, this.props.history);
    }

    closeModal() {
        this.props.toggleModal();
    }

    render() {
        const { errors } = this.state;

        return (
            <Modal isOpen={this.props.isOpen} toggle={this.closeModal}>
                <ModalHeader toggle={this.closeModal}>
                    Pick A New Password
                </ModalHeader>
                <Form onSubmit={this.onSubmit}>
                    <ModalBody>
                        <FormGroup>
                            <Label for="password">Current Password</Label>
                            <Input
                                className={classnames("", {
                                    "is-invalid":
                                        errors.data && errors.data.password
                                })}
                                type="password"
                                name="password"
                                id="password"
                                value={this.state.password}
                                onChange={this.onChange}
                            />
                            {errors.data &&
                                errors.data.password && (
                                    <div className="invalid-feedback">
                                        {errors.data.password}
                                    </div>
                                )}
                        </FormGroup>
                        <FormGroup>
                            <Label for="newPassword">New Password</Label>
                            <Input
                                className={classnames("", {
                                    "is-invalid":
                                        errors.data && errors.data.newPassword
                                })}
                                type="password"
                                name="newPassword"
                                id="newPassword"
                                value={this.state.newPassword}
                                onChange={this.onChange}
                            />
                            {errors.data &&
                                errors.data.newPassword && (
                                    <div className="invalid-feedback">
                                        {errors.data.newPassword}
                                    </div>
                                )}
                        </FormGroup>
                        <FormGroup>
                            <Label for="newPassword2">
                                Confirm New Password
                            </Label>
                            <Input
                                className={classnames("", {
                                    "is-invalid":
                                        errors.data && errors.data.newPassword2
                                })}
                                type="password"
                                name="newPassword2"
                                id="newPassword2"
                                value={this.state.newPassword2}
                                onChange={this.onChange}
                            />
                            {errors.data &&
                                errors.data.newPassword2 && (
                                    <div className="invalid-feedback">
                                        {errors.data.newPassword2}
                                    </div>
                                )}
                        </FormGroup>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" type="submit">
                            Update Password
                        </Button>{" "}
                        <Button color="secondary" onClick={this.closeModal}>
                            Cancel
                        </Button>
                    </ModalFooter>
                </Form>
            </Modal>
        );
    }
}

ChangePassword.propTypes = {
    toggleModal: PropTypes.func.isRequired,
    changePassword: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    isOpen: state.openModal === "changePasswordModal",
    auth: state.auth,
    errors: state.errors
});

export default connect(
    mapStateToProps,
    { toggleModal, changePassword }
)(ChangePassword);
