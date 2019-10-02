// @ts-nocheck
import React from 'react';
import m from'mithril'
import b from 'bss'
import '@webcomponents/custom-elements'


/************************ NavBar *****************************************************/
const border = (side='left') =>  `border-${side} 1px solid rgba(255, 255, 255, 0.24)`

b.css('.itemR', b`
  d flex
  fd column
  ai center
  ${border()}
  pl 8
  pr 8
  pt 6
`.$hover(b`
    cursor pointer
    bc rgba(255,255,255, 0.10)
    `
))

b.css('.itemL', b`
  d flex
  fd column
  ai center
  pt 6
  pl 15
  pr 15
  ${border()}
`.$hover(b`
		cursor pointer
		bc rgba(255,255,255, 0.10)`))

const divNavbar = 'div' + b`
  bc rgba(60, 69, 134, 1)
  d flex
  jc space-between
  ai center
  h 55
	c white
	fw 600
  m 0
	p 0
	position absolute
	top 0
	left 0
	z-index 400
	width 100%
	position fixed
`

const divNavbarLeft = 'div' + b`d flex; w 310;`
const divNavbarRight = 'div' + b`d flex; w 310; jc right; pr 3`

const NavBarLeft = {
  view: () => m(divNavbarLeft, [
      m(''
        , m('.itemL'
            , m('i.angle.left.icon' + b`fs 25`, '')
            , m('', 'Retour')))
    , m("" 
        , m('.itemL'+ b`${border('right')}`
          , m('i.home.icon' + b`fs 25`, '')
          , m('', 'Menu')))
   
  ])
}

const NavBarCenter = {
  view: () => m('', 'CENTER')
}

const NavBarRight = {
  view: () => m(divNavbarRight, [
     m('' 
        , m('.itemR'
          , m('i.file.icon' + b`fs 25`, '')
          , m('', 'Mes Dossiers')))
    , m(''
        , m('.itemR'
          , m('i.building.outline.icon' + b`fs 25`, '')
          , m('', 'Etablissements')))
    , m(''
        , m('.itemR'
          , m('i.setting.icon' + b`fs 25`, '')
          , m('', 'Préférences')))
  ])
}
/*************************End NavBar**************************** */

/******* Content*************/
const MainContent = function () {
	return  {
		view: () => m("", [
			m(""
				,m("", "LoginPage")
			)
			, m(""
				, m("", "Menu")
				,	m("", "PageOne")
				,	m("", "PageTwo")
				, m("", "pageThree"))
		])
	}
}
/********End content*********/

const App = function () {
  return  {
    view: () => [
      m(divNavbar, [
				m(NavBarLeft)
      , m(NavBarCenter)
      , m(NavBarRight)
    ]), 
      m(MainContent)
    ]
  }
}

const Test = {
	view: () => "TEST"
}

class SesamApp extends HTMLElement {
  constructor () {
    super()
  }
  connectedCallback() {
		document.getElementsByClassName("responsiveHeight")[0].style.display = "none"
		//m.mount(this, App)
		m.route.prefix = ''
		m.route(this, "/#/devcomp", {
		
			"/#/devcomp": App,
			"/#/devcomp/test" : {

			}
		
		})
  }
}

window.customElements.define('sesam-app', SesamApp);



export default class DevComp extends React.Component {
	render () {
		return <sesam-app />
	}	
}