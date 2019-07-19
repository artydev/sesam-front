import React from 'react';
import { List, Icon, Button, TextArea, Form } from 'semantic-ui-react';

import './visite.css';
import FormModal from '../../../components/visites/formModal.component';

export default class DossierComponent extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.state = {
      activeDropdowns: [],
      textModified: null,
      opened: false
    };
  }

  showFormModal() {
    this.setState({ opened: true });
  }

  closeModal() {
    this.setState({ opened: !this.state.opened });
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

  handleTextChange(e, data, i) {
    this.props.setText(data.value, i);
  }

  modifyText(i) {
    this.state.textModified
      ? this.setState({ textModified: null })
      : this.setState({ textModified: i });
  }

  saveText() {
    this.props.sendText();
    this.setState({ textModified: null });
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

  setStatus(e, newstatus, index) {
    e.stopPropagation();
    e.nativeEvent.stopImmediatePropagation();
    this.props.setStatus(newstatus, index);
  }

  getIconFromStatus(status, index) {
    return {
      done: (
        <List.Icon
          style={{ cursor: 'pointer' }}
          onClick={e => this.setStatus(e, 'problem', index)}
          name="check"
          color="green"
          size="large"
          verticalAlign="middle"
        />
      ),
      'on-progress': (
        <List.Icon
          style={{ cursor: 'pointer' }}
          onClick={e => this.setStatus(e, 'done', index)}
          name="circle"
          color="orange"
          size="large"
          verticalAlign="middle"
        />
      ),
      problem: (
        <List.Icon
          style={{ cursor: 'pointer' }}
          onClick={e => this.setStatus(e, 'on-progress', index)}
          name="warning circle"
          color="red"
          size="large"
          verticalAlign="middle"
        />
      ),
      undefined: (
        <List.Icon
          style={{ cursor: 'pointer' }}
          onClick={e => this.setStatus(e, 'on-progress', index)}
          name="warning circle"
          color="red"
          size="large"
          verticalAlign="middle"
        />
      )
    }[status];
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
          style={{
            textAlign: 'left'
          }}
        >
          {this.props.taskList.map((task, i) => (
            <div
              key={i}
              style={{
                borderRadius: 3,
                borderBottom: '3px solid #c0c1c4',
                margin: 15,
                boxShadow: '6px 1px 12px 2px #cfcfcf'
              }}
            >
              <List.Item
                style={{
                  borderTopLeftRadius: 3,
                  borderTopRightRadius: 3,
                  padding: 15,
                  backgroundColor: '#4286f4',
                  cursor: task.innerContent && 'pointer'
                }}
                key={task.title}
                onClick={() => task.innerContent && this.handleClick(i)}
              >
                <div
                  style={{
                    display: 'flex',
                    width: '100%'
                  }}
                >
                  <div style={{ flex: 1 }}>
                    {this.getIconFromStatus(task.status, i)}
                  </div>
                  <div style={{ flex: 8, color: 'white' }}>
                    {task.title.toUpperCase()}
                  </div>
                  <div
                    style={{
                      flex: 1,
                      textAlign: 'right'
                    }}
                  >
                    {task.innerContent &&
                      (this.state.activeDropdowns.includes(i) ? (
                        <List.Icon
                          name="caret up"
                          style={{ color: 'white' }}
                        ></List.Icon>
                      ) : (
                        <List.Icon
                          name="caret down"
                          style={{ color: 'white' }}
                        ></List.Icon>
                      ))}
                  </div>
                </div>
              </List.Item>
              <List.Item>
                {this.state.activeDropdowns.includes(i) &&
                  (task.type === 'text' ? (
                    <div style={{ padding: 15 }}>
                      <div style={{ display: 'flex' }}>
                        <div style={{ flex: 10, marginRight: 10 }}>
                          {this.state.textModified ? (
                            <Form>
                              <TextArea
                                value={task.innerContent}
                                onChange={(e, data) =>
                                  this.handleTextChange(e, data, i)
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
                          ) : (
                            task.innerContent
                          )}
                        </div>
                        <div style={{ flex: 1 }}>
                          {this.state.textModified ? (
                            <Icon
                              style={{ cursor: 'pointer', color: '#4286f4' }}
                              name="check"
                              onClick={() => this.saveText()}
                            ></Icon>
                          ) : (
                            <Icon
                              style={{ cursor: 'pointer', color: '#4286f4' }}
                              name="pencil"
                              onClick={() => this.modifyText(i)}
                            ></Icon>
                          )}
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        padding: 15
                      }}
                    >
                      {task.innerContent === 'form1&9' ? (
                        <Button
                          color="red"
                          labelPosition="right"
                          icon
                          onClick={() => this.showFormModal()}
                        >
                          Remplir un formulaire <Icon name="file pdf"></Icon>
                        </Button>
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
                            name={this.getColor(task.innerContent.type)[1]}
                          ></Icon>
                        </Button>
                      ) : (
                        <img
                          style={{ maxHeight: 200, maxWidth: '100%' }}
                          src={task.innerContent.document}
                        ></img>
                      )}
                    </div>
                  ))}
              </List.Item>
            </div>
          ))}
        </List>
      </>
    );
  }
}
