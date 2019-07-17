import React, { useState } from 'react';

import { Modal, Header, List, Button } from 'semantic-ui-react';
import PouchDbService from '../../services/index';

import PropTypes from 'prop-types';

function TrameSelectionModal(props) {
  const [selectedTrame, setSelectedTrame] = useState([]);

  async function selectTrame() {
    await PouchDbService.services.visite.associateTrame(
      props.visite,
      selectedTrame
    );
    props.close();
    props.history.push('/visite/' + props.visite.visiteData.VISITE_IDENT);
  }

  return (
    <Modal
      closeIcon={true}
      open={props.opened}
      onClose={() => {
        props.close();
      }}
    >
      <Modal.Header>Pas de trame associée à cette visite.</Modal.Header>
      <Modal.Content>
        <Modal.Description>
          <Header as="h5">Veuillez associer une trame à cette visite.</Header>

          <List
            divided
            relaxed
            verticalAlign="middle"
            style={{
              maxHeight: 200,
              overflow: 'auto'
            }}
          >
            {props.trames.map((trame, i) => (
              <List.Item
                onClick={() => setSelectedTrame(trame)}
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  padding: 15,
                  cursor: 'pointer',
                  backgroundColor: selectedTrame === trame && '#f2f2f2'
                }}
                key={i}
              >
                <Header as="h5">{trame.name}</Header>
              </List.Item>
            ))}
          </List>
        </Modal.Description>
        <div
          style={{ display: 'flex', marginTop: 10, justifyContent: 'flex-end' }}
        >
          <Button
            color="green"
            disabled={selectedTrame.length === 0}
            onClick={() => selectTrame()}
          >
            Sélectionner
          </Button>
        </div>
      </Modal.Content>
    </Modal>
  );
}

TrameSelectionModal.propTypes = {
  history: PropTypes.any,
  visite: PropTypes.object,
  close: PropTypes.func,
  opened: PropTypes.bool,
  trames: PropTypes.array
};

export default TrameSelectionModal;
