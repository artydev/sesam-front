import React from 'react';
import {
  Container,
  Button,
  Icon,
  Input,
  Responsive,
  Popup
} from 'semantic-ui-react';
import { PropTypes } from 'prop-types';
import {
  changeNameOfPage,
  changeBackUrl,
  changeActivePage
} from '../../navbar/actions';
import { connect } from 'react-redux';

import TrameComponent from './trame';

import PouchDBServices from '../../../services/index';

import SwipeableViews from 'react-swipeable-views';

import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import MyActivityIndicator from '../../../components/myActivityIndicator.component';
import { Tabs, Tab } from '@material-ui/core';
import TrameList from './trameList';

function mapStateToProps() {
  return {};
}

function mapDispatchToProps(dispatch) {
  return {
    changeNameOfPage: () => dispatch(changeNameOfPage('Création de trame')),
    changeBackUrl: () => dispatch(changeBackUrl('/preferences')),
    changeActivePage: () =>
      dispatch(changeActivePage('mesDossiers', '/creation-trame'))
  };
}

class TrameCreationComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      taskListAvant: [],
      taskListPendant: [],
      taskListAprès: [],
      index: 0,
      id: 0,
      trameName: '',
      isLoading: true,
      _id: null,
      _rev: null,
      activeIndex: 0,
      locked: false
    };
    this.validateName = this.validateName.bind(this);
    this.changeType = this.changeType.bind(this);
    this.handleTextChange = this.handleTextChange.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
    this.deleteTask = this.deleteTask.bind(this);
    this.addDocument = this.addDocument.bind(this);
    this.deleteDocument = this.deleteDocument.bind(this);
    this.saveTrame = this.saveTrame.bind(this);
    this.addForm = this.addForm.bind(this);
  }

  async saveTrame() {
    if (window.confirm('Voulez-vous sauvegarder cette trame?')) {
      try {
        await PouchDBServices.services.trame.postDocument(
          !this.state._id
            ? {
                name: this.state.trameName,
                trameAvant: this.state.taskListAvant,
                tramePendant: this.state.taskListPendant,
                trameAprès: this.state.taskListAprès
              }
            : {
                name: this.state.trameName,
                trameAvant: this.state.taskListAvant,
                tramePendant: this.state.taskListPendant,
                trameAprès: this.state.taskListAprès,
                _id: this.state._id,
                _rev: this.state._rev
              }
        );
        this.props.history.push('/preferences');
      } catch (e) {
        console.log(e);
      }
    }
  }

  handleChange = (event, value) => {
    this.setState({
      activeIndex: value
    });
  };

  handleChangeIndex = value => {
    this.setState({
      activeIndex: value
    });
  };
  componentDidMount() {
    this.props.changeNameOfPage();
    this.props.changeBackUrl();
    this.props.changeActivePage();

    if (this.props.match.params.id) {
      this.getTrame(this.props.match.params.id);
    } else {
      this.setState({ isLoading: false });
    }
  }

  async getTrame(trameid) {
    try {
      const trame = (await PouchDBServices.services.trame.getTrameById(
        trameid
      ))[0];

      this.setState({
        taskListAvant: trame.trameAvant,
        taskListPendant: trame.tramePendant,
        taskListAprès: trame.trameAprès,
        trameName: trame.name,
        _id: trame._id,
        index:
          Math.max.apply(
            Math,
            trame.trameAvant.map(function(o) {
              return o.index;
            })
          ) +
          Math.max.apply(
            Math,
            trame.tramePendant.map(function(o) {
              return o.index;
            })
          ) +
          Math.max.apply(
            Math,
            trame.trameAprès.map(function(o) {
              return o.index;
            })
          ),
        id:
          Math.max.apply(
            Math,
            trame.trameAvant.map(function(o) {
              return o.id;
            })
          ) +
          Math.max.apply(
            Math,
            trame.tramePendant.map(function(o) {
              return o.id;
            })
          ) +
          Math.max.apply(
            Math,
            trame.trameAprès.map(function(o) {
              return o.id;
            })
          ),
        isLoading: false,
        _rev: trame._rev
      });
    } catch (e) {
      console.log(e);
    }
  }

  deleteTask(task) {
    this.state.activeIndex === 0
      ? this.setState({
          taskListAvant: this.state.taskListAvant.filter(t => {
            return t != task;
          })
        })
      : this.state.activeIndex === 1
      ? this.setState({
          taskListPendant: this.state.taskListPendant.filter(t => {
            return t != task;
          })
        })
      : this.setState({
          taskListAprès: this.state.taskListAprès.filter(t => {
            return t != task;
          })
        });
  }

  addDocument(task, file) {
    this.state.activeIndex === 0
      ? this.setState({
          taskListAvant: this.state.taskListAvant.filter(t => {
            if (t == task) {
              t.innerContent = file;
            }
            return t;
          })
        })
      : this.state.activeIndex === 1
      ? this.setState({
          taskListPendant: this.state.taskListPendant.filter(t => {
            if (t == task) {
              t.innerContent = file;
            }
            return t;
          })
        })
      : this.setState({
          taskListAprès: this.state.taskListAprès.filter(t => {
            if (t == task) {
              t.innerContent = file;
            }
            return t;
          })
        });
  }

  deleteDocument(task) {
    this.state.activeIndex === 0
      ? this.setState({
          taskListAvant: this.state.taskListAvant.filter(t => {
            if (t == task) {
              t.innerContent = '';
            }
            return t;
          })
        })
      : this.state.activeIndex === 1
      ? this.setState({
          taskListPendant: this.state.taskListPendant.filter(t => {
            if (t == task) {
              t.innerContent = '';
            }
            return t;
          })
        })
      : this.setState({
          taskListAprès: this.state.taskListAprès.filter(t => {
            if (t == task) {
              t.innerContent = '';
            }
            return t;
          })
        });
  }

  validateName(task, name) {
    this.state.activeIndex === 0
      ? this.setState({
          taskListAvant: this.state.taskListAvant.filter(t => {
            if (t == task) {
              t.title = name;
            }

            return t;
          })
        })
      : this.state.activeIndex === 1
      ? this.setState({
          taskListPendant: this.state.taskListPendant.filter(t => {
            if (t == task) {
              t.title = name;
            }

            return t;
          })
        })
      : this.setState({
          taskListAprès: this.state.taskListAprès.filter(t => {
            if (t == task) {
              t.title = name;
            }

            return t;
          })
        });
  }

  handleNameChange(e, data) {
    this.setState({ trameName: data.value });
  }

  addForm(task) {
    this.state.activeIndex === 0
      ? this.setState({
          taskListAvant: this.state.taskListAvant.filter(t => {
            if (t == task) {
              t.innerContent = 'form1&9';
            }

            return t;
          })
        })
      : this.state.activeIndex === 1
      ? this.setState({
          taskListPendant: this.state.taskListPendant.filter(t => {
            if (t == task) {
              t.innerContent = 'form1&9';
            }

            return t;
          })
        })
      : this.setState({
          taskListAprès: this.state.taskListAprès.filter(t => {
            if (t == task) {
              t.innerContent = 'form1&9';
            }

            return t;
          })
        });
  }

  handleTextChange(task, text) {
    this.state.activeIndex === 0
      ? this.setState({
          taskListAvant: this.state.taskListAvant.filter(t => {
            if (t == task) {
              t.innerContent = text;
            }

            return t;
          })
        })
      : this.state.activeIndex === 1
      ? this.setState({
          taskListPendant: this.state.taskListPendant.filter(t => {
            if (t == task) {
              t.innerContent = text;
            }

            return t;
          })
        })
      : this.setState({
          taskListAprès: this.state.taskListAprès.filter(t => {
            if (t == task) {
              t.innerContent = text;
            }

            return t;
          })
        });
  }

  changeType(task, type) {
    this.state.activeIndex === 0
      ? this.setState({
          taskListAvant: this.state.taskListAvant.filter(t => {
            if (t == task) {
              t.type = type;
            }

            return t;
          })
        })
      : this.state.activeIndex === 1
      ? this.setState({
          taskListPendant: this.state.taskListPendant.filter(t => {
            if (t == task) {
              t.type = type;
            }

            return t;
          })
        })
      : this.setState({
          taskListAprès: this.state.taskListAprès.filter(t => {
            if (t == task) {
              t.type = type;
            }

            return t;
          })
        });
  }

  addTask() {
    //de 3 types: basic, text, ou document.

    this.state.activeIndex === 0
      ? this.setState({
          taskListAvant: [
            ...this.state.taskListAvant,
            {
              title: 'Nouvelle tâche' + this.state.index,
              type: 'basic',
              innerContent: '',
              index: this.state.index,
              id: this.state.id
            }
          ],
          index: this.state.index + 1,
          id: this.state.id + 1
        })
      : this.state.activeIndex === 1
      ? this.setState({
          taskListPendant: [
            ...this.state.taskListPendant,
            {
              title: 'Nouvelle tâche' + this.state.index,
              type: 'basic',
              innerContent: '',
              index: this.state.index,
              id: this.state.id
            }
          ],
          index: this.state.index + 1,
          id: this.state.id + 1
        })
      : this.setState({
          taskListAprès: [
            ...this.state.taskListAprès,
            {
              title: 'Nouvelle tâche' + this.state.index,
              type: 'basic',
              innerContent: '',
              index: this.state.index,
              id: this.state.id
            }
          ],
          index: this.state.index + 1,
          id: this.state.id + 1
        });
  }

  onDragEnd = result => {
    const { destination, source } = result;

    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    let taskList;
    this.state.activeIndex === 0
      ? (taskList = this.state.taskListAvant)
      : this.state.activeIndex === 1
      ? (taskList = this.state.taskListPendant)
      : (taskList = this.state.taskListAprès);

    const res = Array.from(taskList);

    const [removed] = res.splice(result.source.index, 1);
    res.splice(result.destination.index, 0, removed);

    this.state.activeIndex === 0
      ? this.setState({ taskListAvant: res })
      : this.state.activeIndex === 1
      ? this.setState({ taskListPendant: res })
      : this.setState({ taskListAprès: res });
  };

  render() {
    return (
      <div
        className="hidescrollbar"
        style={{
          display: 'flex',
          height: '100%',
          width: '100%',

          backgroundColor: '#f2f2f2',
          overflow: 'hidden'
        }}
      >
        <div
          style={{
            width: '100%',
            justifyContent: 'center',
            textAlign: 'center'
          }}
        >
          <Container style={{ height: '100%' }}>
            {this.state.isLoading ? (
              <MyActivityIndicator />
            ) : (
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  overflow: 'hidden',
                  height: '100%'
                }}
              >
                <div
                  style={{
                    position: 'fixed',
                    zIndex: 10,
                    width: '100%',
                    backgroundColor: '#f2f2f2',
                    display: 'flex',
                    flexDirection: 'column',

                    padding: 20
                  }}
                >
                  <div style={{ display: 'flex', flexDirection: 'row' }}>
                    <Responsive minWidth={400}>
                      <div style={{ flex: 0.3 }}></div>
                    </Responsive>
                    <div style={{ flex: 1 }}>
                      <Input
                        style={{ width: 150 }}
                        placeholder="Nom de la trame..."
                        value={this.state.trameName}
                        onChange={this.handleNameChange}
                      ></Input>
                      <Button
                        style={{ marginLeft: 5 }}
                        color="teal"
                        icon
                        onClick={() => this.addTask()}
                      >
                        <Icon name="plus" color="white"></Icon>
                      </Button>
                    </div>
                    <div
                      style={{
                        flex: 0.3,
                        justifyContent: 'flex-end',
                        display: 'flex'
                      }}
                    >
                      <Button
                        onClick={this.saveTrame}
                        color="red"
                        disabled={
                          this.state.trameName.length === 0 ||
                          this.state.taskListAvant.length +
                            this.state.taskListPendant.length +
                            this.state.taskListAprès.length ===
                            0
                        }
                        icon
                      >
                        <Icon name="save" color="white"></Icon>
                      </Button>
                    </div>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <Tabs
                      value={this.state.activeIndex}
                      fullWidth
                      onChange={this.handleChange}
                    >
                      <Tab label="Avant" />
                      <Tab label="Pendant" />
                      <Tab label="Après" />
                    </Tabs>
                    <Button
                      icon
                      onClick={() =>
                        this.setState({ locked: !this.state.locked })
                      }
                      style={{
                        backgroundColor: this.state.locked ? 'grey' : null
                      }}
                    >
                      {this.state.locked ? (
                        <Popup
                          trigger={
                            <Icon name="lock" style={{ color: 'white' }}></Icon>
                          }
                          position="bottom center"
                          content="La liste est verrouillée. Vous ne pouvez pas balayer celle-ci entre les différentes étapes, en revanche vous pouvez déplacer les items de la trame à votre convenance avec la souris ou votre doigt."
                        ></Popup>
                      ) : (
                        <Popup
                          trigger={<Icon name="unlock" color="grey"></Icon>}
                          position="bottom center"
                          content="La liste est déverrouillée. Vous ne pouvez plus réorganiser les items de la liste, vous pouvez en revanche balayer celle-ci entre les différentes étapes."
                        ></Popup>
                      )}
                    </Button>
                  </div>
                </div>

                <div
                  style={{
                    flex: 10,
                    overflowY: 'auto',
                    marginTop: 120,

                    width: '100%'
                  }}
                  className="hidescrollbar"
                >
                  <TrameList
                    locked={this.state.locked}
                    activeIndex={this.state.activeIndex}
                    handleChangeIndex={this.handleChangeIndex}
                    onDragEnd={this.onDragEnd}
                    validateName={this.validateName}
                    taskListAvant={this.state.taskListAvant}
                    taskListPendant={this.state.taskListPendant}
                    taskListAprès={this.state.taskListAprès}
                    changeType={this.changeType}
                    handleTextChange={this.handleTextChange}
                    deleteTask={this.deleteTask}
                    addForm={this.addForm}
                    addDocument={this.addDocument}
                    deleteDocument={this.deleteDocument}
                  />
                </div>
              </div>
            )}
          </Container>
        </div>
      </div>
    );
  }
}

TrameCreationComponent.propTypes = {
  changeNameOfPage: PropTypes.func.isRequired,
  changeBackUrl: PropTypes.func.isRequired,
  changeActivePage: PropTypes.func.isRequired
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TrameCreationComponent);
