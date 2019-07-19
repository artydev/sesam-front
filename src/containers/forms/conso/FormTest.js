import React, { Component } from 'react';

import SignatureCanvas from 'react-signature-canvas';
import { Card, Container, Header } from 'semantic-ui-react';

import moment from 'moment';

import 'moment/locale/fr';

export default class FormTest extends Component {
  lieu = 'PARIS 15E ARRONDISSEMENT';
  date = '23 mai 2015';
  hour = ' 15:03 ';
  quality = 'Responsable qualité';

  name = 'Delphine PIERSON';

  nameResponsible = 'Antoine AWAIDA';

  declaration =
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.';

  documents = [
    'Papier Canson 100g',
    'Imprimante 3D',
    'Papier Canson 100g',
    'Imprimante 3D',
    'Papier Canson 100g',
    'Imprimante 3D',
    'Papier Canson 100g',
    'Imprimante 3D'
  ];

  render() {
    const date = moment('16-07-2019 11:51', 'DD-MM-YYYY hh:mm');

    return (
      <div>
        <title />
        <meta httpEquiv="Content-Type" content="text/html; charset=UTF-8" />
        <br />
        <style
          type="text/css"
          dangerouslySetInnerHTML={{
            __html:
              '\n      <!--\n      \tp {margin: 0; padding: 0;}\t.ft10{font-size:14px;font-family:Times;color:#000000;}\n      \t.ft11{font-size:9px;font-family:Times;color:#7f7f7f;}\n      \t.ft12{font-size:7px;font-family:Times;color:#7f7f7f;}\n      \t.ft13{font-size:9px;font-family:Times;color:#000000;}\n      \t.ft14{font-size:13px;font-family:Times;color:#000000;}\n      \t.ft15{font-size:27px;font-family:Times;color:#000000;}\n      \t.ft16{font-size:16px;font-family:Times;color:#000000;}\n      \t.ft17{font-size:14px;font-family:Times;color:#000000;}\n      \t.ft18{font-size:8px;font-family:Times;color:#000000;}\n      \t.ft19{font-size:9px;line-height:14px;font-family:Times;color:#000000;}\n      \t.ft110{font-size:9px;line-height:13px;font-family:Times;color:#000000;}\n      \t.ft111{font-size:14px;line-height:19px;font-family:Times;color:#000000;}\n      \t.ft112{font-size:14px;line-height:18px;font-family:Times;color:#000000;}\n      -->\n    '
          }}
        />
        <div
          id="page1-div"
          style={{ position: 'relative', width: '892px', height: '1263px' }}
        >
          <img
            width={892}
            height={1263}
            src={require('./target001.png')}
            alt="background image"
          />
          <p
            style={{
              position: 'absolute',
              top: '55px',
              left: '204px',
              whiteSpace: 'nowrap'
            }}
            className="ft10"
          >
            &nbsp;
          </p>
          <p
            style={{
              position: 'absolute',
              top: '1171px',
              left: '140px',
              whiteSpace: 'nowrap'
            }}
            className="ft11"
          >
            <i>
              <b>F</b>
            </i>
          </p>
          <p
            style={{
              position: 'absolute',
              top: '1173px',
              left: '148px',
              whiteSpace: 'nowrap'
            }}
            className="ft12"
          >
            <i>
              <b>ORMULAIRE&nbsp;</b>
            </i>
          </p>
          <p
            style={{
              position: 'absolute',
              top: '1171px',
              left: '209px',
              whiteSpace: 'nowrap'
            }}
            className="ft11"
          >
            <i>
              <b>SORA</b>
            </i>
          </p>
          <p
            style={{
              position: 'absolute',
              top: '1173px',
              left: '240px',
              whiteSpace: 'nowrap'
            }}
            className="ft12"
          >
            <i>
              <b>&nbsp;</b>
            </i>
          </p>
          <p
            style={{
              position: 'absolute',
              top: '1171px',
              left: '242px',
              whiteSpace: 'nowrap'
            }}
            className="ft11"
          >
            <i>
              <b>&nbsp;</b>
            </i>
          </p>
          <p
            style={{
              position: 'absolute',
              top: '1171px',
              left: '396px',
              whiteSpace: 'nowrap'
            }}
            className="ft11"
          >
            <i>
              <b>P</b>
            </i>
          </p>
          <p
            style={{
              position: 'absolute',
              top: '1173px',
              left: '403px',
              whiteSpace: 'nowrap'
            }}
            className="ft12"
          >
            <i>
              <b>ROCES&nbsp;VERBAL</b>
            </i>
          </p>
          <p
            style={{
              position: 'absolute',
              top: '1171px',
              left: '476px',
              whiteSpace: 'nowrap'
            }}
            className="ft11"
          >
            <i>
              <b>&nbsp;</b>
            </i>
          </p>
          <p
            style={{
              position: 'absolute',
              top: '1171px',
              left: '650px',
              whiteSpace: 'nowrap'
            }}
            className="ft11"
          >
            <i>
              <b>EN/3D/JUR/003/V03&nbsp;</b>
            </i>
          </p>
          <p
            style={{
              position: 'absolute',
              top: '1185px',
              left: '55px',
              whiteSpace: 'nowrap'
            }}
            className="ft13"
          >
            &nbsp;
          </p>
          <p
            style={{
              position: 'absolute',
              top: '151px',
              left: '483px',
              whiteSpace: 'nowrap'
            }}
            className="ft10"
          >
            &nbsp;
          </p>
          <p
            style={{
              position: 'absolute',
              top: '180px',
              left: '286px',
              whiteSpace: 'nowrap'
            }}
            className="ft13"
          >
            MINISTÈRE&nbsp;DE&nbsp;L'ECONOMIE&nbsp;ET&nbsp;DES&nbsp;FINANCES&nbsp;
          </p>
          <p
            style={{
              position: 'absolute',
              top: '87px',
              left: '769px',
              whiteSpace: 'nowrap'
            }}
            className="ft10"
          >
            &nbsp;
          </p>
          <p
            style={{
              position: 'absolute',
              top: '119px',
              left: '743px',
              whiteSpace: 'nowrap'
            }}
            className="ft14"
          >
            Page&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;/&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          </p>
          <p
            style={{
              position: 'absolute',
              top: '208px',
              left: '30px',
              whiteSpace: 'nowrap'
            }}
            className="ft110"
          >
            DIRECTION&nbsp;DEPARTEMENTALE&nbsp;DE&nbsp;LA&nbsp;PROTECTION&nbsp;DES&nbsp;POPULATIONS&nbsp;
            <br />
            &nbsp;
            <br />
            &nbsp;
            <br />
            8,&nbsp;RUE&nbsp;FROISSART&nbsp;
            <br />
            &nbsp;
            <br />
            75153&nbsp;PARIS&nbsp;CEDEX&nbsp;03&nbsp;
            <br />
            &nbsp;
            <br />
            Téléphone&nbsp;&nbsp;:&nbsp;&nbsp;01&nbsp;40&nbsp;27&nbsp;16&nbsp;00&nbsp;
            <br />
            Télécopie&nbsp;&nbsp;:&nbsp;&nbsp;01&nbsp;42&nbsp;71&nbsp;09&nbsp;14&nbsp;
            <br />
            Courriel&nbsp;
          </p>
          <p
            style={{
              position: 'absolute',
              top: '332px',
              left: '87px',
              whiteSpace: 'nowrap'
            }}
            className="ft13"
          >
            :&nbsp;&nbsp;ddpp@paris.gouv.fr&nbsp;
          </p>
          <p
            style={{
              position: 'absolute',
              top: '346px',
              left: '30px',
              whiteSpace: 'nowrap'
            }}
            className="ft10"
          >
            &nbsp;
          </p>
          <p
            style={{
              position: 'absolute',
              top: '235px',
              left: '555px',
              whiteSpace: 'nowrap'
            }}
            className="ft15"
          >
            <b>PROCES-VERBAL&nbsp;</b>
          </p>
          <p
            style={{
              position: 'absolute',
              top: '270px',
              left: '500px',
              whiteSpace: 'nowrap'
            }}
            className="ft15"
          >
            <b>DE&nbsp;DECLARATION&nbsp;ET&nbsp;DE&nbsp;</b>
          </p>
          <p
            style={{
              position: 'absolute',
              top: '304px',
              left: '539px',
              whiteSpace: 'nowrap'
            }}
            className="ft15"
          >
            <b>PRISE&nbsp;DE&nbsp;COPIE&nbsp;DE&nbsp;</b>
          </p>
          <p
            style={{
              position: 'absolute',
              top: '339px',
              left: '586px',
              whiteSpace: 'nowrap'
            }}
            className="ft15"
          >
            <b>DOCUMENTS&nbsp;</b>
          </p>
          <p
            style={{
              position: 'absolute',
              top: '372px',
              left: '673px',
              whiteSpace: 'nowrap'
            }}
            className="ft16"
          >
            <b>(1)</b>
          </p>
          <p
            style={{
              position: 'absolute',
              top: '374px',
              left: '694px',
              whiteSpace: 'nowrap'
            }}
            className="ft10"
          >
            &nbsp;
          </p>
          <p
            style={{
              position: 'absolute',
              top: '393px',
              left: '522px',
              whiteSpace: 'nowrap'
            }}
            className="ft17"
          >
            <b>
              réalisée(s)&nbsp;en&nbsp;application&nbsp;des&nbsp;articles&nbsp;&nbsp;L.&nbsp;512-8
            </b>
          </p>
          <p
            style={{
              position: 'absolute',
              top: '392px',
              left: '845px',
              whiteSpace: 'nowrap'
            }}
            className="ft18"
          >
            <b>&nbsp;</b>
          </p>
          <p
            style={{
              position: 'absolute',
              top: '412px',
              left: '539px',
              whiteSpace: 'nowrap'
            }}
            className="ft17"
          >
            <b>
              et&nbsp;&nbsp;L.&nbsp;512-10&nbsp;du&nbsp;code&nbsp;de&nbsp;la&nbsp;consommation
            </b>
            &nbsp;
          </p>
          <p
            style={{
              position: 'absolute',
              top: '431px',
              left: '140px',
              whiteSpace: 'nowrap'
            }}
            className="ft10"
          >
            &nbsp;
          </p>
          <p
            style={{
              position: 'absolute',
              top: '450px',
              left: '98px',
              whiteSpace: 'nowrap'
            }}
            className="ft111"
          >
            Nous,&nbsp;soussigné(e)&nbsp; &nbsp;
            {this.name}
            <br />
            &nbsp;
            <br />
            de&nbsp;la&nbsp;Concurrence,&nbsp;de&nbsp;la&nbsp;Consommation&nbsp;et&nbsp;de&nbsp;la&nbsp;Répression&nbsp;des&nbsp;Fraudes,&nbsp;
            <br />
            &nbsp;
            <br />
            &nbsp;
            <br />
            &nbsp;
            <br />
            agissant&nbsp;sous&nbsp;l’autorité&nbsp;du&nbsp;DIRECTEUR&nbsp;DE&nbsp;LA&nbsp;PROTECTION&nbsp;DES&nbsp;POPULATIONS&nbsp;de&nbsp;PARIS&nbsp;
            <br />
            &nbsp;
            <br />
            &nbsp;
            <br />
            &nbsp;
            <br />
            le&nbsp;&nbsp;
            {this.date}
          </p>
          <p
            style={{
              position: 'absolute',
              top: '640px',
              left: '438px',
              whiteSpace: 'nowrap'
            }}
            className="ft10"
          >
            à&nbsp;&nbsp;
            {this.hour}
          </p>
          <p
            style={{
              position: 'absolute',
              top: '640px',
              left: '587px',
              whiteSpace: 'nowrap'
            }}
            className="ft10"
          >
            heures,&nbsp;
          </p>
          <p
            style={{
              position: 'absolute',
              top: '659px',
              left: '98px',
              whiteSpace: 'nowrap'
            }}
            className="ft111"
          >
            &nbsp;
            <br />
            à&nbsp;[lieu]&nbsp; &nbsp;
            {this.lieu}
            <br />
            &nbsp;
          </p>
          <p
            style={{
              position: 'absolute',
              top: '715px',
              left: '98px',
              whiteSpace: 'nowrap'
            }}
            className="ft10"
          >
            &nbsp;
          </p>
          <p
            style={{
              position: 'absolute',
              top: '733px',
              left: '98px',
              whiteSpace: 'nowrap'
            }}
            className="ft10"
          >
            après&nbsp;nous&nbsp;être&nbsp;présenté,&nbsp;avoir&nbsp;justifié&nbsp;de&nbsp;notre&nbsp;qualité&nbsp;et&nbsp;indiqué&nbsp;l'objet&nbsp;de&nbsp;notre&nbsp;enquête.&nbsp;
          </p>
          <p
            style={{
              position: 'absolute',
              top: '751px',
              left: '98px',
              whiteSpace: 'nowrap'
            }}
            className="ft10"
          >
            &nbsp;
          </p>
          <p
            style={{
              position: 'absolute',
              top: '769px',
              left: '98px',
              whiteSpace: 'nowrap'
            }}
            className="ft10"
          >
            entendons&nbsp;M.&nbsp;&nbsp;en&nbsp;sa&nbsp;qualité&nbsp;de&nbsp;
            &nbsp;
            {this.quality}
          </p>
          <p
            style={{
              position: 'absolute',
              top: '787px',
              left: '98px',
              whiteSpace: 'nowrap'
            }}
            className="ft10"
          >
            &nbsp;
          </p>
          <p
            style={{
              position: 'absolute',
              top: '805px',
              left: '98px',
              whiteSpace: 'nowrap'
            }}
            className="ft10"
          >
            &nbsp;
          </p>
          <p
            style={{
              position: 'absolute',
              top: '823px',
              left: '98px',
              whiteSpace: 'nowrap'
            }}
            className="ft10"
          >
            qui&nbsp;nous&nbsp;déclare&nbsp;ce&nbsp;qui&nbsp;suit&nbsp;:&nbsp;
          </p>
          <p
            style={{
              position: 'absolute',
              top: '841px',
              left: '98px'
            }}
            className="ft111"
          >
            <br />
            &nbsp;
            {this.declaration}
            &nbsp;
            <br />
            &nbsp;
            <br />
            &nbsp;
            <br />
            &nbsp;
            <br />
            &nbsp;
            <br />
            &nbsp;
            <br />
            &nbsp;
            <br />
            &nbsp;
            <br />
            &nbsp;
            <br />
            &nbsp;
            <br />
            &nbsp;
            <br />
            &nbsp;
            <br />
            &nbsp;
            <br />
            &nbsp;
            <br />
            &nbsp;
          </p>
          <p
            style={{
              position: 'absolute',
              top: '841px',
              left: '98px',
              whiteSpace: 'nowrap'
            }}
            className="ft111"
          >
            &nbsp;
            <br />
            &nbsp;
            <br />
            &nbsp;
            <br />
            &nbsp;
            <br />
            &nbsp;
            <br />
            &nbsp;
            <br />
            &nbsp;
            <br />
            &nbsp;
            <br />
            &nbsp;
            <br />
            &nbsp;
            <br />
            &nbsp;
            <br />
            &nbsp;
            <br />
            &nbsp;
            <br />
            &nbsp;
            <br />
            &nbsp;
            <br />
            &nbsp;
          </p>
          <p
            style={{
              position: 'absolute',
              top: '841px',
              left: '98px',
              whiteSpace: 'nowrap'
            }}
            className="ft111"
          >
            &nbsp;
            <br />
            &nbsp;
            <br />
            &nbsp;
            <br />
            &nbsp;
            <br />
            &nbsp;
            <br />
            &nbsp;
            <br />
            &nbsp;
            <br />
            &nbsp;
            <br />
            &nbsp;
            <br />
            &nbsp;
            <br />
            &nbsp;
            <br />
            &nbsp;
            <br />
            &nbsp;
            <br />
            &nbsp;
            <br />
            &nbsp;
            <br />
            &nbsp;
          </p>
          <p
            style={{
              position: 'absolute',
              top: '841px',
              left: '98px',
              whiteSpace: 'nowrap'
            }}
            className="ft111"
          >
            &nbsp;
            <br />
            &nbsp;
            <br />
            &nbsp;
            <br />
            &nbsp;
            <br />
            &nbsp;
            <br />
            &nbsp;
            <br />
            &nbsp;
            <br />
            &nbsp;
            <br />
            &nbsp;
            <br />
            &nbsp;
            <br />
            &nbsp;
            <br />
            &nbsp;
            <br />
            &nbsp;
            <br />
            &nbsp;
            <br />
            &nbsp;
            <br />
            &nbsp;
          </p>
        </div>
        <div
          id="page2-div"
          style={{ position: 'relative', width: '892px', height: '1263px' }}
        >
          <img
            width={892}
            height={1263}
            src={require('./target002.png')}
            alt="background image"
          />
          <p
            style={{
              position: 'absolute',
              top: '55px',
              left: '777px',
              whiteSpace: 'nowrap'
            }}
            className="ft10"
          >
            Page&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;/&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          </p>
          <p
            style={{
              position: 'absolute',
              top: '1199px',
              left: '157px',
              whiteSpace: 'nowrap'
            }}
            className="ft11"
          >
            <i>
              <b>F</b>
            </i>
          </p>
          <p
            style={{
              position: 'absolute',
              top: '1201px',
              left: '165px',
              whiteSpace: 'nowrap'
            }}
            className="ft12"
          >
            <i>
              <b>ORMULAIRE&nbsp;</b>
            </i>
          </p>
          <p
            style={{
              position: 'absolute',
              top: '1199px',
              left: '226px',
              whiteSpace: 'nowrap'
            }}
            className="ft11"
          >
            <i>
              <b>SORA</b>
            </i>
          </p>
          <p
            style={{
              position: 'absolute',
              top: '1201px',
              left: '257px',
              whiteSpace: 'nowrap'
            }}
            className="ft12"
          >
            <i>
              <b>&nbsp;</b>
            </i>
          </p>
          <p
            style={{
              position: 'absolute',
              top: '1199px',
              left: '260px',
              whiteSpace: 'nowrap'
            }}
            className="ft11"
          >
            <i>
              <b>&nbsp;</b>
            </i>
          </p>
          <p
            style={{
              position: 'absolute',
              top: '1199px',
              left: '413px',
              whiteSpace: 'nowrap'
            }}
            className="ft11"
          >
            <i>
              <b>P</b>
            </i>
          </p>
          <p
            style={{
              position: 'absolute',
              top: '1201px',
              left: '420px',
              whiteSpace: 'nowrap'
            }}
            className="ft12"
          >
            <i>
              <b>ROCES&nbsp;VERBAL&nbsp;</b>
            </i>
          </p>
          <p
            style={{
              position: 'absolute',
              top: '1199px',
              left: '495px',
              whiteSpace: 'nowrap'
            }}
            className="ft11"
          >
            <i>
              <b>&nbsp;</b>
            </i>
          </p>
          <p
            style={{
              position: 'absolute',
              top: '1199px',
              left: '672px',
              whiteSpace: 'nowrap'
            }}
            className="ft11"
          >
            <i>
              <b>EN/3D/JUR/003/V03&nbsp;</b>
            </i>
          </p>
          <p
            style={{
              position: 'absolute',
              top: '85px',
              left: '98px',
              whiteSpace: 'nowrap'
            }}
            className="ft14"
          >
            avons&nbsp;demandé&nbsp;communication&nbsp;des&nbsp;documents&nbsp;énumérés&nbsp;ci-après&nbsp;à&nbsp;M.&nbsp;
            &nbsp;
            {this.nameResponsible}
            <br />
            pour&nbsp;en&nbsp;prendre&nbsp;copie&nbsp;:&nbsp;
            <br />
            &nbsp;
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <ul>
                {this.documents.map((document, i) => (
                  <li key={i}>{document}</li>
                ))}
              </ul>
            </div>
            <br />
            &nbsp;
            <br />
            &nbsp;
            <br />
            &nbsp;
            <br />
            &nbsp;
            <br />
            &nbsp;
            <br />
            &nbsp;
            <br />
            &nbsp;
            <br />
            &nbsp;
            <br />
            &nbsp;
            <br />
            &nbsp;
            <br />
            &nbsp;
            <br />
            &nbsp;
            <br />
            &nbsp;
            <br />
            &nbsp;
            <br />
            &nbsp;
            <br />
            &nbsp;
            <br />
            &nbsp;
            <br />
            &nbsp;
            <br />
            &nbsp;
            <br />
            &nbsp;
            <br />
            &nbsp;
            <br />
            &nbsp;
            <br />
            &nbsp;
            <br />
            &nbsp;
            <br />
            &nbsp;
          </p>
          <p
            style={{
              position: 'absolute',
              top: '616px',
              left: '98px',
              whiteSpace: 'nowrap'
            }}
            className="ft13"
          >
            nombre&nbsp;de&nbsp;mot(s)&nbsp;:&nbsp;&nbsp;
          </p>
          <p
            style={{
              position: 'absolute',
              top: '616px',
              left: '353px',
              whiteSpace: 'nowrap'
            }}
            className="ft13"
          >
            ligne(s) :&nbsp;&nbsp;
          </p>
          <p
            style={{
              position: 'absolute',
              top: '616px',
              left: '523px',
              whiteSpace: 'nowrap'
            }}
            className="ft13"
          >
            rayés nuls&nbsp;
          </p>
          <p
            style={{
              position: 'absolute',
              top: '635px',
              left: '98px',
              whiteSpace: 'nowrap'
            }}
            className="ft15"
          >
            &nbsp;
            <br />
            &nbsp;
            <br />
            &nbsp;
          </p>
          <p
            style={{
              position: 'absolute',
              top: '690px',
              left: '98px',
              whiteSpace: 'nowrap'
            }}
            className="ft13"
          >
            clos&nbsp;le&nbsp;&nbsp;
          </p>
          <p
            style={{
              position: 'absolute',
              top: '690px',
              left: '438px',
              whiteSpace: 'nowrap'
            }}
            className="ft13"
          >
            à&nbsp;&nbsp;
          </p>
          <p
            style={{
              position: 'absolute',
              top: '690px',
              left: '587px',
              whiteSpace: 'nowrap'
            }}
            className="ft13"
          >
            heures&nbsp;
          </p>
          <p
            style={{
              position: 'absolute',
              top: '710px',
              left: '98px',
              whiteSpace: 'nowrap'
            }}
            className="ft14"
          >
            &nbsp;
            <br />
            &nbsp;
            <br />
            &nbsp;
            <br />
            &nbsp;
          </p>
          <p
            style={{
              position: 'absolute',
              top: '784px',
              left: '98px',
              whiteSpace: 'nowrap'
            }}
            className="ft13"
          >
            Signature&nbsp;de&nbsp;(des)&nbsp;l'auteur(s)&nbsp;
          </p>
          <p
            style={{
              position: 'absolute',
              top: '784px',
              left: '523px',
              whiteSpace: 'nowrap'
            }}
            className="ft13"
          >
            &nbsp;
          </p>
          <p
            style={{
              position: 'absolute',
              top: '784px',
              left: '566px',
              whiteSpace: 'nowrap'
            }}
            className="ft13"
          >
            Signature&nbsp;de&nbsp;l'intéressé,&nbsp;
          </p>
          <p
            style={{
              position: 'absolute',
              top: '802px',
              left: '98px',
              whiteSpace: 'nowrap'
            }}
            className="ft13"
          >
            du&nbsp;procès-verbal,&nbsp;
          </p>
          <p
            style={{
              position: 'absolute',
              top: '820px',
              left: '98px',
              whiteSpace: 'nowrap'
            }}
            className="ft13"
          >
            &nbsp;
          </p>
        </div>
      </div>
    );
  }
}
