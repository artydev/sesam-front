import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Menu, Dropdown, Icon, Responsive } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router/esm/react-router';

import './navbar.css';
function mapPropsToState(state) {
  return {
    nameOfPage: state.navbarReducer.nameOfPage,
    backPage: state.navbarReducer.backPage,
    mesDossiersLink: state.navbarReducer.activePages.mesDossiers,
    etablissementLink: state.navbarReducer.activePages.etablissements,
    preferencesLink: state.navbarReducer.activePages.preferences
  };
}


function setNavBarColor () {
	const hostname = "" + window.location.hostname;
	const localhost =  hostname.indexOf("localhost") >= 0
	const mtest = hostname.indexOf("m-test") >= 0
	const mprod = hostname.indexOf("m.dgccrf") >= 0
	return (
		localhost && (document.title = 'SESAM-localhost') && "#500045" ) 
		|| (mtest && (document.title = 'SESAM-TEST') && "#008000")
		|| (mprod && (document.title = 'SESAM') && "rgb(60, 69, 134)")
}

class NavBarComponent extends React.Component {
  render() {
    return (
      <div
        className="responsiveHeight"
        style={{
          flexGrow: 0,
          flexShrink: 1,
          flexBasis: 'auto',
          overflow: 'hidden'
        }}
      >
        <Menu
          as={Responsive}
          minWidth={500}
          fixed="top"
          style={{ position: 'fixed', backgroundColor: setNavBarColor() }}
          inverted
          icon="labeled"
        >
          <Menu.Item
            as="a"
            onClick={() => this.props.history.push(this.props.backPage)}
          >
            <Icon style={{ margin: '0' }} name="angle left" />
            Retour
          </Menu.Item>
          <Menu.Item as={Link} to="/menu">
            <Icon name="home" /> Menu
          </Menu.Item>
          <Menu.Item style={{ flex: '1', verticalAlign: 'middle', height:'100%' }}>
            <p style={{ fontSize: '20px' }}>{this.props.nameOfPage}</p>
          </Menu.Item>
          <Menu.Menu position="right">
            <Menu.Item as={Link} to={this.props.mesDossiersLink}>
              <Icon name="file" /> Mes Dossiers
            </Menu.Item>
            <Menu.Item as={Link} to={this.props.etablissementLink}>
              <Icon name="building outline" />
              Établissements
            </Menu.Item>
            <Menu.Item as={Link} to={this.props.preferencesLink}>
              <Icon name="setting"></Icon>Préférences
            </Menu.Item>
          </Menu.Menu>
        </Menu>
        <Menu
          as={Responsive}
          maxWidth={500}
          fixed="top"
          style={{ position: 'fixed', backgroundColor: setNavBarColor() }}
          color="blue"
          inverted
          size="large"
        >
          <Menu.Item as="a" onClick={() => this.props.history.goBack()}>
            <Icon style={{ margin: '0' }} name="angle left" />
          </Menu.Item>
          <Menu.Item style={{ flex: '1' }}>
            <p style={{ flex: '1', textAlign: 'center' }}>
              {this.props.nameOfPage}
            </p>
          </Menu.Item>
          <Menu.Menu position="right">
            <Dropdown item simple icon="list layout">
              <Dropdown.Menu>
                <Dropdown.Item as={Link} to="/menu">
                  <Icon name="home" /> Menu
                </Dropdown.Item>
                <Dropdown.Item as={Link} to={this.props.mesDossiersLink}>
                  <Icon name="file" /> Mes Dossiers
                </Dropdown.Item>
                <Dropdown.Item as={Link} to={this.props.etablissementLink}>
                  <Icon name="building outline" />
                  Établissements
                </Dropdown.Item>
                <Dropdown.Item as={Link} to={this.props.preferencesLink}>
                  <Icon name="setting"></Icon>Préférences
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Menu.Menu>
        </Menu>
      </div>
    );
  }
}

NavBarComponent.propTypes = {
  history: PropTypes.shape({
    goBack: PropTypes.func,
    push: PropTypes.func
  }),
  nameOfPage: PropTypes.string.isRequired,
  backPage: PropTypes.string.isRequired,
  mesDossiersLink: PropTypes.string.isRequired,
  etablissementLink: PropTypes.string,
  preferencesLink: PropTypes.string
};

export default connect(mapPropsToState)(withRouter(NavBarComponent));
