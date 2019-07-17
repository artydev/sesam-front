import React from 'react';
import { Grid, Icon } from 'semantic-ui-react';
import propTypes from 'prop-types';

class EntrepriseAttribute extends React.Component {
  render() {
    return (
      <Grid.Row style={this.props.style}>
        <Grid.Column verticalAlign="middle" mobile={3} tablet={1} computer={1}>
          <Icon
            circular
            name={this.props.icon}
            className="mybutton"
            style={{
              marginRight: '10px',
              color: 'white',
              backgroundColor: '#3C4586'
            }}
          ></Icon>
        </Grid.Column>
        <Grid.Column verticalAlign="middle" tablet={5} computer={5} mobile={13}>
          <div style={{ fontSize: '15px' }}>
            <span style={{ fontWeight: 'bold' }}>{this.props.name}</span>
          </div>
        </Grid.Column>
        <Grid.Column only="mobile" mobile={3}></Grid.Column>
        <Grid.Column
          verticalAlign="middle"
          tablet={10}
          computer={10}
          mobile={13}
        >
          <p
            style={{
              fontSize: '15px'
            }}
          >
            {this.props.value}
          </p>
        </Grid.Column>
      </Grid.Row>
    );
  }
}

EntrepriseAttribute.propTypes = {
  icon: propTypes.string.isRequired,
  name: propTypes.string.isRequired,
  value: propTypes.element.isRequired,
  style: propTypes.element
};

export default EntrepriseAttribute;
