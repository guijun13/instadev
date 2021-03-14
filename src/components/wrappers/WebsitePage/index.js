import React, { createContext, useState } from 'react';
import PropTypes from 'prop-types';
import Footer from '../../commons/Footer';
import Menu from '../../commons/Menu';
import Modal from '../../commons/Modal';
import Box from '../../foundation/layout/Box';
import RegisterForm from '../../patterns/RegisterForm';

export const WebsitePageContext = createContext({
  toggleRegisterModal: () => {},
});

export default function WebsitePageWrapper({
  children,
  pageBoxProps,
  menuProps,
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <WebsitePageContext.Provider
      value={{
        toggleRegisterModal: () => {
          setIsModalOpen(!isModalOpen);
        },
      }}
    >
      <Box
        flex={1}
        display="flex"
        flexWrap="wrap"
        flexDirection="column"
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...pageBoxProps}
      >
        <Modal
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
          }}
        >
          {(modalProps) => <RegisterForm modalProps={modalProps} />}
        </Modal>
        {menuProps.display && (
          <Menu onRegisterClick={() => setIsModalOpen(true)} />
        )}

        {children}
        <Footer />
      </Box>
    </WebsitePageContext.Provider>
  );
}

WebsitePageWrapper.defaultProps = {
  // seoProps: {},
  pageBoxProps: {},
  menuProps: {
    display: true,
  },
};

WebsitePageWrapper.propTypes = {
  // seoProps: PropTypes.shape({
  //   headTitle: PropTypes.string,
  // }),
  menuProps: PropTypes.shape({
    display: PropTypes.bool,
  }),
  pageBoxProps: PropTypes.shape({
    backgroundImage: PropTypes.string,
    backgroundRepeat: PropTypes.string,
    backgroundPosition: PropTypes.string,
  }),
  children: PropTypes.node.isRequired,
};
