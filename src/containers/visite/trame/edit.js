import React from 'react';
import { Container, Button, Icon, Responsive } from 'semantic-ui-react';
import { PropTypes } from 'prop-types';

import PouchDBServices from '../../../services/index';

import TrameList from '../../preferences/trame/trameList';

class EditComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      taskListAvant: this.props.trame.trameAvant,
      taskListPendant: this.props.trame.tramePendant,
      taskListAprès: this.props.trame.trameAprès,
      activeIndex: 0,
      index: this.calculateIndex(),
      id: this.calculateIndex(),
      isLoading: true,
      _id: this.props.trame._id,
      _rev: this.props.visite._rev,
      locked: false
    };
    this.validateName = this.validateName.bind(this);
    this.changeType = this.changeType.bind(this);
    this.handleTextChange = this.handleTextChange.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
    this.deleteTask = this.deleteTask.bind(this);
    this.addDocument = this.addDocument.bind(this);
    this.deleteDocument = this.deleteDocument.bind(this);
    this.addForm = this.addForm.bind(this);
  }

  async saveTrame() {
    if (window.confirm('Voulez-vous sauvegarder cette trame?')) {
      try {
        await PouchDBServices.services.visite.updateTrame(
          this.props.visite,
          this.state._rev,
          {
            ...this.props.trame,
            trameAvant: this.state.taskListAvant,
            tramePendant: this.state.taskListPendant,
            trameAprès: this.state.taskListAprès
          }
        );

        this.props.closeEdit();
      } catch (e) {
        console.log(e);
      }
    }
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

  calculateIndex() {
    return (
      Math.max(
        this.props.trame.trameAvant.length === 0
          ? 0
          : parseInt(
              Math.max.apply(
                Math,
                this.props.trame.trameAvant.map(function(o) {
                  return o.index;
                })
              )
            ),
        this.props.trame.tramePendant.length === 0
          ? 0
          : parseInt(
              Math.max.apply(
                Math,
                this.props.trame.tramePendant.map(function(o) {
                  return o.index;
                })
              )
            ),
        this.props.trame.trameAprès.length === 0
          ? 0
          : parseInt(
              Math.max.apply(
                Math,
                this.props.trame.trameAprès.map(function(o) {
                  return o.index;
                })
              )
            )
      ) + 1
    );
  }

  deleteTask(task) {
    this.props.index === 0
      ? this.setState({
          taskListAvant: this.state.taskListAvant.filter(t => {
            return t != task;
          })
        })
      : this.props.index === 1
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
    this.props.index === 0
      ? this.setState({
          taskListAvant: this.state.taskListAvant.filter(t => {
            if (t == task) {
              t.innerContent = file;
            }
            return t;
          })
        })
      : this.props.index === 1
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
    this.props.index === 0
      ? this.setState({
          taskListAvant: this.state.taskListAvant.filter(t => {
            if (t == task) {
              t.innerContent = '';
            }
            return t;
          })
        })
      : this.props.index === 1
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
    this.props.index === 0
      ? this.setState({
          taskListAvant: this.state.taskListAvant.filter(t => {
            if (t == task) {
              t.title = name;
            }

            return t;
          })
        })
      : this.props.index === 1
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

  handleTextChange(task, text) {
    this.props.index === 0
      ? this.setState({
          taskListAvant: this.state.taskListAvant.filter(t => {
            if (t == task) {
              t.innerContent = text;
            }

            return t;
          })
        })
      : this.props.index === 1
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

  changeType(task, type) {
    this.props.index === 0
      ? this.setState({
          taskListAvant: this.state.taskListAvant.filter(t => {
            if (t == task) {
              t.type = type;
              if (type === 'text' || type === 'document') {
                t.innerContent = '';
              }
            }
            return t;
          })
        })
      : this.props.index === 1
      ? this.setState({
          taskListPendant: this.state.taskListPendant.filter(t => {
            if (t == task) {
              t.type = type;
              if (type === 'text' || type === 'document') {
                t.innerContent = '';
              }
            }
            return t;
          })
        })
      : this.setState({
          taskListAprès: this.state.taskListAprès.filter(t => {
            if (t == task) {
              t.type = type;
              if (type === 'text' || type === 'document') {
                t.innerContent = '';
              }
            }
            return t;
          })
        });
  }

  addTask() {
    //de 3 types: basic, text, ou document.

    this.props.index === 0
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
      : this.props.index === 1
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
    this.props.index === 0
      ? (taskList = this.state.taskListAvant)
      : this.props.index === 1
      ? (taskList = this.state.taskListPendant)
      : (taskList = this.state.taskListAprès);

    const res = Array.from(taskList);

    const [removed] = res.splice(result.source.index, 1);
    res.splice(result.destination.index, 0, removed);

    this.props.index === 0
      ? this.setState({ taskListAvant: res })
      : this.props.index === 1
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
                  <div
                    style={{
                      flex: 1,
                      display: 'flex',
                      justifyContent: 'flex-end'
                    }}
                  >
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
                      flex: 1,
                      justifyContent: 'flex-end',
                      display: 'flex'
                    }}
                  >
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
                        <Icon name="lock" style={{ color: 'white' }}></Icon>
                      ) : (
                        <Icon name="unlock" color="grey"></Icon>
                      )}
                    </Button>
                    <Button
                      onClick={() => this.saveTrame()}
                      color="red"
                      disabled={
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
                  visite={this.props.visite}
                  locked={this.state.locked}
                  activeIndex={this.props.index}
                  handleChangeIndex={this.props.handleChangeIndex}
                  onDragEnd={this.onDragEnd}
                  validateName={this.validateName}
                  taskListAvant={this.state.taskListAvant}
                  taskListPendant={this.state.taskListPendant}
                  taskListAprès={this.state.taskListAprès}
                  changeType={this.changeType}
                  handleTextChange={this.handleTextChange}
                  deleteTask={this.deleteTask}
                  addDocument={this.addDocument}
                  deleteDocument={this.deleteDocument}
                  visiteTrame={true}
                  addForm={this.addForm}
                />
              </div>
            </div>
          </Container>
        </div>
      </div>
    );
  }
}

EditComponent.propTypes = {
  trame: PropTypes.object,
  index: PropTypes.number
};

export default EditComponent;
