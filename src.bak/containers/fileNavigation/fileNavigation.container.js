import React from 'react';
import { Menu, Icon, Button, Grid } from 'semantic-ui-react';
import { PropTypes } from 'prop-types';
import './fileNavigation.css';

class FileNavigationComponent extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Grid textAlign="center">
        <Menu
          style={{ zIndex: '0', backgroundColor: 'white' }}
          fixed="bottom"
          fluid
          borderless
          widths={2}
        >
          <Menu.Item
            style={{
              zIndex: -1
            }}
            className="myMenuItem"
            name="trame"
            active={this.props.activeItem === 0}
            onClick={() => this.props.setActiveTab(0)}
          >
            <div style={{ flexDirection: 'column', marginRight: '50px' }}>
              <Icon name="list" size="large" color="white" />
              <p style={{ marginTop: '5px', color: 'white' }}>Trame</p>
            </div>
          </Menu.Item>
          <Menu.Item
            style={{
              zIndex: 2,
              bottom: '0',
              position: 'absolute',
              marginBottom: '-30px',
              overflow: 'hidden',
              width: '103px',
              textAlign: 'center'
            }}
            onClick={() => this.props.setActiveTab(1)}
          >
            <div
              style={{
                flexDirection: 'column'
              }}
            >
              <Button
                color={this.props.activeItem === 1 ? 'white' : '#3C4586'}
                style={{ fontSize: 40, zIndex: 2, margin: 0 }}
                circular
                size="massive"
                icon="photo"
              ></Button>
            </div>
          </Menu.Item>
          <Menu.Item
            style={{ zIndex: -1 }}
            className="myMenuItem"
            name="documents"
            color="#3C4586"
            active={this.props.activeItem === 2}
            onClick={() => this.props.setActiveTab(2)}
          >
            <div style={{ flexDirection: 'column', marginLeft: '50px' }}>
              <Icon name="file" size="large" />
              <p style={{ marginTop: '5px' }}>Documents</p>
            </div>
          </Menu.Item>
        </Menu>
      </Grid>
    );
  }
}

FileNavigationComponent.propTypes = {
  activeItem: PropTypes.number.isRequired,
  setActiveTab: PropTypes.func.isRequired
};

export default FileNavigationComponent;
