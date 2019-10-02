import React from 'react';
import PropTypes from 'prop-types';
import { Tab } from 'semantic-ui-react';
import './swipeTabs.css';

import 'react-flex/index.css';

class SwipeTabsComponent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      activeIndex: 0,
      panes: props.tabs.map(({ menuItem, component }) => ({
        menuItem,
        render: () => <div style={{ fontSize: 15 }}>{component}</div>
      }))
    };
  }

  componentDidMount() {
    if (this.props.emitter) {
      this.props.emitter.on('swipedright', () => {
        this.setState({
          activeIndex:
            this.state.activeIndex > 0 ? this.state.activeIndex - 1 : 0
        });
      });
      this.props.emitter.on('swipedleft', () => {
        this.setState({
          activeIndex:
            this.state.activeIndex < this.state.panes.length - 1
              ? this.state.activeIndex + 1
              : this.state.panes.length - 1
        });
      });
    }
  }

  render() {
    return (
      <Tab
        menu={{
          secondary: true,
          pointing: true,
          style: {
            borderBottom: 0,
            display: 'flex',
            justifyContent: 'center'
          }
        }}
        panes={this.state.panes}
        //style={{ display: "flex", flex: 1, justifyContent: "center" }}
        activeIndex={this.state.activeIndex}
        onTabChange={(e, data) =>
          this.setState({ activeIndex: data.activeIndex })
        }
      />
    );
  }
}

SwipeTabsComponent.propTypes = {
  tabs: PropTypes.arrayOf(
    PropTypes.shape({
      menuItem: PropTypes.string,
      component: PropTypes.node
    })
  ).isRequired,
  emitter: PropTypes.func.isRequired
};

export default SwipeTabsComponent;
