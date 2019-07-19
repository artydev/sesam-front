import React from 'react';
import { Modal, Icon } from 'semantic-ui-react';
import './documents.component';
import PropTypes from 'prop-types';

function DocumentModal(props) {
  return (
    <Modal
      closeIcon={true}
      basic
      open={props.opened}
      onClose={() => {
        props.close();
      }}
    >
      <a href={props.document.document} download={props.document.name}>
        <Icon
          name="download"
          style={{
            cursor: 'pointer',
            position: 'absolute',
            top: '1rem',
            right: '3.5rem',
            zIndex: '1',
            opacity: 0.8,
            fontSize: '1.25em',
            color: '#fff',
            width: '2.25rem',
            height: '2.25rem',
            padding: '.625rem 0 0 0'
          }}
        ></Icon>
      </a>
      <Modal.Header style={{ display: 'flex', justifyContent: 'center' }}>
        {props.document.name}
        <div style={{ justifyContent: 'right' }}></div>
      </Modal.Header>
      <Modal.Content style={{ display: 'flex', justifyContent: 'center' }}>
        <img src={props.document.document} className="image" />
      </Modal.Content>
    </Modal>
  );
}

DocumentModal.propTypes = {
  opened: PropTypes.bool,
  close: PropTypes.func,
  document: PropTypes.object
};

export default DocumentModal;
