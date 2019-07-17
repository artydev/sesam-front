import React from 'react';

import Avant from './avant.container';
import Pendant from './pendant.container';
import Apres from './après.container';
import SwipeableViews from 'react-swipeable-views';

import './visite.css';
import PouchDbService from '../../../services/index';
import MyActivityIndicator from '../../../components/myActivityIndicator.component';

import PropTypes from 'prop-types';
import EditComponent from './edit';

class Trame extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      activeIndex: 0,
      isLoading: true,
      trame: [],
      visite: null,
      rev: null
    };
    this.getActiveIndex = this.getActiveIndex.bind(this);
    this.setStatus = this.setStatus.bind(this);
    this.closeEdit = this.closeEdit.bind(this);
    this.setText = this.setText.bind(this);
    this.sendText = this.sendText.bind(this);
  }

  async getTrame() {
    const visite = await PouchDbService.services.visite.getVisiteById(
      this.props.match.params.id
    );

    this.setState({
      visite: visite,
      rev: visite._rev,
      trame: visite.trame,
      isLoading: false
    });
  }

  componentDidMount() {
    this.getTrame();
  }

  async closeEdit() {
    await this.getTrame();
    this.props.close();
  }

  sendText() {
    PouchDbService.services.visite
      .updateTrame(this.state.visite, this.state.rev, this.state.trame)
      .then(res => {
        this.setState({ rev: res.rev });
      });
  }

  setText(newtext, index) {
    let trame = this.state.trame;
    if (this.state.activeIndex === 0) {
      trame.trameAvant[index].innerContent = newtext;
      this.setState({
        trame
      });
    } else if (this.state.activeIndex === 1) {
      trame.tramePendant[index].innerContent = newtext;
      this.setState({
        trame
      });
    } else {
      trame.trameAprès[index].innerContent = newtext;
      this.setState({
        trame
      });
    }
  }

  setStatus(newstatus, index) {
    let trame = this.state.trame;
    if (this.state.activeIndex === 0) {
      trame.trameAvant[index].status = newstatus;
      this.setState({
        trame
      });
    } else if (this.state.activeIndex === 1) {
      trame.tramePendant[index].status = newstatus;
      this.setState({
        trame
      });
    } else {
      trame.trameAprès[index].status = newstatus;
      this.setState({
        trame
      });
    }
    PouchDbService.services.visite
      .updateTrame(this.state.visite, this.state.rev, trame)
      .then(res => {
        this.setState({ rev: res.rev });
      });
  }

  getActiveIndex(e) {
    this.setState({ activeIndex: e });
  }

  render() {
    return this.state.isLoading ? (
      <MyActivityIndicator />
    ) : (
      <div
        style={{
          display: 'flex',
          width: '100%',
          height: '100%',
          justifyContent: 'center',
          overflow: 'hidden'
        }}
      >
        {this.props.editMode ? (
          <EditComponent
            visite={this.state.visite}
            setStatus={this.setStatus}
            isLoading={this.state.isLoading}
            trame={this.state.trame}
            closeEdit={this.closeEdit}
            {...this.props}
          />
        ) : (
          <SwipeableViews
            style={{ width: '100%' }}
            className="hidescrollbar"
            index={this.props.index}
            onChangeIndex={this.props.handleChangeIndex}
            slideClassName="hidescrollbar"
          >
            <Avant
              visite={this.state.visite}
              setStatus={this.setStatus}
              setText={this.setText}
              sendText={this.sendText}
              isLoading={this.state.isLoading}
              trame={this.state.trame}
              closeEdit={this.closeEdit}
              {...this.props}
            />
            <Pendant
              visite={this.state.visite}
              setStatus={this.setStatus}
              setText={this.setText}
              sendText={this.sendText}
              isLoading={this.state.isLoading}
              trame={this.state.trame}
              closeEdit={this.closeEdit}
              {...this.props}
            />
            <Apres
              visite={this.state.visite}
              setStatus={this.setStatus}
              sendText={this.sendText}
              setText={this.setText}
              isLoading={this.state.isLoading}
              trame={this.state.trame}
              closeEdit={this.closeEdit}
              {...this.props}
            />
          </SwipeableViews>
        )}
      </div>
    );
  }
}

Trame.propTypes = {
  match: PropTypes.any,
  handleChangeIndex: PropTypes.func,
  index: PropTypes.number
};

export default Trame;
