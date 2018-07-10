import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { toggleModal } from "../../actions/actions";

import { Modal, ModalHeader } from "reactstrap";

class Success extends Component {
    constructor() {
        super();

        this.closeModal = this.closeModal.bind(this);
    }

    closeModal() {
        this.props.toggleModal();
    }

    render() {
        return (
            <Modal isOpen={this.props.isOpen} toggle={this.closeModal}>
                <ModalHeader toggle={this.closeModal}>Success!</ModalHeader>
            </Modal>
        );
    }
}

Success.propTypes = {
    toggleModal: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    isOpen: state.openModal === "successModal"
});

export default connect(
    mapStateToProps,
    { toggleModal }
)(Success);
