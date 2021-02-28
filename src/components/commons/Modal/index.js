import React from 'react';
import PropTypes from 'prop-types';
import styled, { createGlobalStyle, css } from 'styled-components';
import { motion } from 'framer-motion';

const ModalWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  background: rgba(0, 0, 0, 0.1);
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
  overflow: scroll;
  transition: 0.3s;
  z-index: 100;

  ${({ isOpen }) => {
    if (isOpen) {
      return css`
        opacity: 1;
        pointer-events: all;
        overflow: hidden;
        scrollbar-width: none;
      `;
    }
    return css`
      opacity: 0;
      pointer-events: none;
      overflow: hidden;
      scrollbar-width: none;
    `;
  }}
`;

const LockScroll = createGlobalStyle`
  body{
    scrollbar-width: none;
    overflow: hidden;
  }
`;

function CloseIconButton({ onClose }) {
  return (
    <button
      type="button"
      style={{
        position: 'absolute',
        top: '30px',
        right: '30px',
        border: 'none',
        background: 'transparent',
        fontSize: 0,
        cursor: 'pointer',
      }}
      onClick={() => onClose()}
    >
      <img src="/images/close.svg" alt="close-icon" />
    </button>
  );
}

function Modal({ isOpen, onClose, children }) {
  return (
    <>
      <ModalWrapper
        isOpen={isOpen}
        onClick={(event) => {
          const isSafeArea = event.target.closest(
            '[data-modal-safe-area="true"]'
          );
          if (!isSafeArea) {
            onClose();
          }
        }}
      >
        {isOpen && <LockScroll />}
        <motion.div
          variants={{
            open: {
              x: 0,
            },
            closed: {
              x: '100%',
            },
          }}
          transition={{ duration: 0.5 }}
          animate={isOpen ? 'open' : 'closed'}
          style={{
            display: 'flex',
            flex: 1,
          }}
        >
          <CloseIconButton onClose={onClose} />
          {children({
            'data-modal-safe-area': true,
          })}
        </motion.div>
      </ModalWrapper>
    </>
  );
}

CloseIconButton.propTypes = {
  onClose: PropTypes.func.isRequired,
};

Modal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  children: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default Modal;
