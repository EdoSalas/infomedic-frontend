import React, { useState, createContext, useContext } from "react";
import PropTypes from "prop-types";

import { Modal, Box } from "rbx";

const initialState = {
  isModalOpen: false,
  modalContent: "",
};

export const ModalContext = createContext(initialState);

export const ModalConsumer = () => (
  <ModalContext.Consumer>
    {({ isModalOpen, modalContent, setModalOpen }) => (
      <Modal
        clipped
        closeOnEsc
        active={isModalOpen}
        onClose={() => setModalOpen(false, "")}
      >
        <Modal.Background />
        <Modal.Content>
          <Box>{modalContent}</Box>
        </Modal.Content>
        <Modal.Close />
      </Modal>
    )}
  </ModalContext.Consumer>
);

ModalConsumer.propTypes = {};

export const ModalProvider = ({ children }) => {
  const [state, setState] = useState(initialState);

  const setModalOpen = (isModalOpen, modalContent) => {
    setState({ isModalOpen, modalContent });
  };

  return (
    <ModalContext.Provider value={{ ...state, setModalOpen }}>
      {children}
      <ModalConsumer />
    </ModalContext.Provider>
  );
};

ModalProvider.propTypes = {
  children: PropTypes.node,
};

ModalProvider.defaultProps = {
  children: null,
};
export const useModal = () => useContext(ModalContext);

export default ModalContext;
