import React, { Component, useState, Fragment } from 'react';

import { Link } from 'react-router-dom';
import TrameSelectionModal from './trameSelectionModal';

export default function MyLink(props) {
  const [modal, setModal] = useState(false);

  function close() {
    setModal(!modal);
  }
  return !props.visite.visiteData.new_visite ? (
    <>{props.children}</>
  ) : props.visite.visiteData.trame._id != 0 ? (
    <Link as={Fragment} to={'/visite/' + props.visite.visiteData.VISITE_IDENT}>
      {props.children}
    </Link>
  ) : (
        <>
          <TrameSelectionModal
            {...props}
            visite={props.visite}
            trames={props.trames}
            opened={modal}
            close={() => close()}
          />
          <Fragment onClick={() => setModal(!modal)} style={{ cursor: 'pointer' }}>
            {props.children}
          </Fragment>
        </>
      );
}
