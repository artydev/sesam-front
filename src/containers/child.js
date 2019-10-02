import React from 'react';
import m from'mithril'
import b from 'bss'
import '@webcomponents/custom-elements'

var Home = {
	view: function() {
			return "Welcome"
	}
}

export default class Child extends React.Component {
	constructor(props) {
			super(props)
			this.root = React.createRef()
	}

	componentDidMount() {
		m.route(this.root, "/", {
			"/": Home, // defines `https://localhost/#!/home`
	})
	}

	componentDidUnmount() {
			m.mount(this.root, null)
	}

	render() {
			return <div ref={this.root} />
	}
}
