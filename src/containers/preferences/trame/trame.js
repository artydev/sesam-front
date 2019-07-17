import React, { Component } from 'react';
import {
  List,
  Icon,
  TextArea,
  Form,
  Button,
  Responsive,
  Popup
} from 'semantic-ui-react';

import PropTypes from 'prop-types';
import MyDraggable from './draggable';
import FormModal from '../../../components/visites/formModal.component';

function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}

class TrameComponent extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      taskEdited: null,
      taskName: null,
      activeDropdowns: [],

      opened: false
    };
    this.handleChangeName = this.handleChangeName.bind(this);
    this.clickCount = null;
    this.singleClickTimer = '';
  }

  fileInputRef = React.createRef();

  handleTextChange(e, data, task) {
    this.props.handleTextChange(task, data.value);
  }

  addForm(task) {
    this.props.addForm(task);
  }

  handleDoubleClick = document => {
    this.editName(document);
  };
  handleClicks(document) {
    this.clickCount++;
    if (this.clickCount === 1) {
      this.singleClickTimer = setTimeout(
        function() {
          this.clickCount = 0;
        }.bind(this),
        300
      );
    } else if (this.clickCount === 2) {
      clearTimeout(this.singleClickTimer);
      this.clickCount = 0;
      this.handleDoubleClick(document);
    }
  }

  getColor(type) {
    if (type.includes('image')) {
      return ['teal', 'file image'];
    } else if (type.includes('pdf')) {
      return ['red', 'file pdf'];
    } else if (type.includes('sheet')) {
      return ['green', 'file excel'];
    } else if (type.includes('word') || type.includes('opendocument.text')) {
      return ['blue', 'file word'];
    } else {
      return ['grey', 'file'];
    }
  }

  async fileChange(task, e) {
    const file = e.target.files[0];
    const file64 = await getBase64(file);

    this.props.addDocument(task, {
      document: file64,
      name: file.name,
      type: file.type
    });
  }

  handleChangeName(event) {
    this.setState({ taskName: event.target.value.toUpperCase() });
  }

  handleClick(index) {
    const i = this.state.activeDropdowns.indexOf(index);
    i === -1
      ? this.setState({
          activeDropdowns: [...this.state.activeDropdowns, index]
        })
      : this.setState({
          activeDropdowns: this.state.activeDropdowns.filter(e => e !== index)
        });
  }

  validateName(task, name) {
    this.props.validateName(task, name);
    this.setState({ taskEdited: null, taskName: null });
  }

  editName(task) {
    this.setState({
      taskEdited: task,
      taskName: task.title.toUpperCase()
    });
  }

  closeModal() {
    this.setState({ opened: !this.state.opened });
  }

  render() {
    return (
      <>
        <FormModal
          {...this.props}
          opened={this.state.opened}
          close={() => this.closeModal()}
        />

        <List
          className="responsivepadding"
          relaxed
          style={{ textAlign: 'left' }}
        >
          {this.props.taskList.map((task, i) => (
            <MyDraggable {...this.props} key={i} task={task} index={i}>
              <div
                style={{
                  borderRadius: 3,
                  borderBottom: '3px solid #c0c1c4',

                  margin: 15,
                  boxShadow: '6px 1px 12px 2px #cfcfcf',
                  position: 'relative'
                }}
              >
                <List.Item
                  style={{
                    borderTopLeftRadius: 3,
                    borderTopRightRadius: 3,
                    padding: 15,
                    backgroundColor: '#4286f4'
                  }}
                  key={task.title}
                  // onClick={() => task.documentToFill && this.handleClick(i)}
                >
                  <Icon
                    name="times circle"
                    style={{
                      position: 'absolute',
                      top: '0',
                      left: '0',

                      color: 'red',
                      cursor: 'pointer',
                      fontSize: '1em'
                    }}
                    onClick={() => this.props.deleteTask(task)}
                  ></Icon>
                  <div
                    style={{
                      display: 'flex',
                      width: '100%'
                    }}
                  >
                    <div style={{ flex: 1 }}>
                      {/* {this.getIconFromStatus(task.status)} */}
                    </div>
                    <div
                      style={{
                        flex: 8,
                        color: 'white',
                        flexDirection: 'row',
                        display: 'flex'
                      }}
                    >
                      <div
                        onClick={() => {
                          this.handleClicks(task);
                        }}
                        style={{ width: '100%' }}
                      >
                        {task != this.state.taskEdited ? (
                          <div
                            style={{
                              background: 'transparent',
                              border: '0',
                              outline: 'none',
                              color: 'white',
                              width: '100%'
                            }}
                          >
                            {task.title.toUpperCase()}
                          </div>
                        ) : (
                          <input
                            disabled={task != this.state.taskEdited}
                            type="text"
                            style={{
                              fontFamily: 'inherit',
                              background: 'transparent',
                              border: '0',
                              outline: 'none',
                              color: 'white',
                              width: '100%'
                            }}
                            value={
                              task != this.state.taskEdited
                                ? task.title.toUpperCase()
                                : this.state.taskName
                            }
                            onChange={this.handleChangeName}
                          ></input>
                        )}
                      </div>
                      {task != this.state.taskEdited ? (
                        <Icon
                          style={{ marginLeft: 10, cursor: 'pointer' }}
                          onClick={() => this.editName(task)}
                          name="pencil"
                          color="white"
                        ></Icon>
                      ) : (
                        <Icon
                          style={{ marginLeft: 10, cursor: 'pointer' }}
                          onClick={() =>
                            this.validateName(task, this.state.taskName)
                          }
                          name="check"
                          color="white"
                        ></Icon>
                      )}
                    </div>
                    <div
                      style={{
                        flex: 1,
                        textAlign: 'right'
                      }}
                    >
                      {task.type === 'basic' ? (
                        <Icon
                          name="ellipsis horizontal"
                          style={{ cursor: 'pointer', color: 'white' }}
                          onClick={() => this.props.changeType(task, 'text')}
                        ></Icon>
                      ) : task.type === 'text' ? (
                        <Icon
                          name="text cursor"
                          style={{ cursor: 'pointer', color: 'white' }}
                          onClick={() =>
                            this.props.changeType(task, 'document')
                          }
                        ></Icon>
                      ) : (
                        <Icon
                          name="file"
                          style={{ cursor: 'pointer', color: 'white' }}
                          onClick={() => this.props.changeType(task, 'basic')}
                        ></Icon>
                      )}

                      {task.type === 'text' || task.type === 'document' ? (
                        this.state.activeDropdowns.includes(task.index) ? (
                          <List.Icon
                            onClick={() => this.handleClick(task.index)}
                            name="caret up"
                            style={{ color: 'white', cursor: 'pointer' }}
                          ></List.Icon>
                        ) : (
                          <List.Icon
                            onClick={() => this.handleClick(task.index)}
                            name="caret down"
                            style={{ color: 'white', cursor: 'pointer' }}
                          ></List.Icon>
                        )
                      ) : (
                        <List.Icon
                          color="grey"
                          name="caret down"
                          style={{ cursor: 'pointer' }}
                        ></List.Icon>
                      )}
                    </div>
                  </div>
                </List.Item>
                <List.Item>
                  {this.state.activeDropdowns.includes(task.index) && (
                    <div style={{ padding: 15 }}>
                      {task.type === 'text' ? (
                        <Form>
                          <TextArea
                            value={task.innerContent}
                            onChange={(e, data) =>
                              this.handleTextChange(e, data, task)
                            }
                          />
                          <div
                            style={{
                              width: '100%',
                              display: 'flex',
                              justifyContent: 'flex-end',
                              marginTop: 10
                            }}
                          ></div>
                        </Form>
                      ) : task.innerContent ? (
                        <div
                          style={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center'
                          }}
                        >
                          <div style={{ flex: 0.1 }}></div>
                          <div
                            style={{
                              flex: 1,
                              display: 'flex',
                              justifyContent: 'center'
                            }}
                          >
                            {task.innerContent === 'form1&9' ? (
                              <Popup
                                trigger={
                                  <Button
                                    color="red"
                                    labelPosition="right"
                                    icon
                                  >
                                    Formulaire à remplir{' '}
                                    <Icon name="file pdf"></Icon>
                                  </Button>
                                }
                                position="bottom center"
                                content="Ce formulaire sera à remplir dans la trame de la visite."
                              ></Popup>
                            ) : !task.innerContent.type.includes('image') ? (
                              <Button
                                as="a"
                                href={
                                  !task.innerContent.type.includes('image')
                                    ? task.innerContent.document
                                    : undefined
                                }
                                download={task.innerContent.name}
                                onClick={() => {
                                  task.innerContent.type.includes('image') &&
                                    this.showModal(document);
                                }}
                                icon
                                labelPosition="right"
                                color={this.getColor(task.innerContent.type)[0]}
                                basic
                              >
                                {task.innerContent.name}
                                <Icon
                                  style={{ background: 'none' }}
                                  name={
                                    this.getColor(task.innerContent.type)[1]
                                  }
                                ></Icon>
                              </Button>
                            ) : (
                              <img
                                style={{ maxHeight: 200, maxWidth: '100%' }}
                                src={task.innerContent.document}
                              ></img>
                            )}
                          </div>
                          <div style={{ flex: 0.1 }}>
                            <Button
                              color="red"
                              onClick={() => this.props.deleteDocument(task)}
                              icon
                            >
                              <Icon name="times" color="white"></Icon>
                            </Button>
                          </div>
                        </div>
                      ) : (
                        <div
                          style={{
                            display: 'flex',
                            justifyContent: 'center'
                          }}
                        >
                          <Button.Group>
                            <Button
                              style={{
                                background: '#3C4586',
                                color: 'white'
                              }}
                              content={
                                <Responsive minWidth={540}>
                                  Ajouter un document
                                </Responsive>
                              }
                              labelPosition="left"
                              icon="file"
                              onClick={() => this.fileInputRef.current.click()}
                            />
                            <input
                              ref={this.fileInputRef}
                              type="file"
                              hidden
                              onChange={e => this.fileChange(task, e)}
                            />

                            <Button.Or text="ou" />
                            <Button
                              style={{
                                background: 'red',
                                color: 'white'
                              }}
                              onClick={() => this.addForm(task)}
                              content={
                                <Responsive minWidth={540}>
                                  Formulaire à remplir
                                </Responsive>
                              }
                              labelPosition="right"
                              icon="file pdf"
                            />
                          </Button.Group>
                        </div>
                      )}
                    </div>
                  )}
                </List.Item>
              </div>
            </MyDraggable>
          ))}
        </List>
      </>
    );
  }
}

TrameComponent.propTypes = {
  taskList: PropTypes.array,
  changeType: PropTypes.func,
  validateName: PropTypes.func,
  deleteTask: PropTypes.func,
  addDocument: PropTypes.func,
  deleteDocument: PropTypes.func
};

export default TrameComponent;
