import React from 'react';
import PropTypes from 'prop-types';
import { Button, Icon, Grid } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

class MenuButtonComponent extends React.Component {
  render() {
    return (
      <Grid.Row style={{ padding: '20px' }}>
        <Button
          as={Link}
          to={this.props.link}
          icon
          basic
          fluid
          color={this.props.color}
          size="massive"
          labelPosition="left"
        >
          <Icon name={this.props.icon} />
          {this.props.name}
        </Button>
      </Grid.Row>
    );
  }
}

MenuButtonComponent.propTypes = {
  link: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired
};

export default MenuButtonComponent;
