/* eslint react/no-multi-comp: 0, react/prop-types: 0 */

// Packages
import React from 'react';
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Row,
  Col
} from 'reactstrap';

// Styles
import './ModalRegisterConfirm.scss';

// Content
import content from './content.json';

class ModalRegisterConfirm extends React.Component {
  constructor() {
    super();
    this.state = {
      isOpen: false
    };
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }
  render() {
    return (
      <div>
        <Modal isOpen={this.state.isOpen} toggle={this.toggle.bind(this)} className="modal-xl modal-register-confirm">
          <ModalHeader toggle={this.toggle.bind(this)}></ModalHeader>
          <ModalBody>
            <Row>
              <Col lg="6" xl="4" className="col-download">
                <h4>{content.download.title}</h4>
                <p dangerouslySetInnerHTML={{__html: content.download.content}}></p>
                <div className="mb-3"><img src={window._env_.PUBLIC_URL + "/images/app-store-logos.svg"} alt="App Store Logos" /></div>
                <p dangerouslySetInnerHTML={{__html: content.download.learn}}></p>
                <img src={window._env_.PUBLIC_URL + "/images/device-with-logo.png"} alt="device" className="device-with-logo" />
              </Col>
              <Col lg="6" xl="8" className="col-content">
                <h3>{content.confirmation.title}</h3>
                <div dangerouslySetInnerHTML={{__html: content.confirmation.content}}></div>
                <div className="mt-4">
                  <Button type="button" color="primary" onClick={this.toggle.bind(this)}>{content.confirmation.buttons.learn}</Button>
                  <Button type="button" color="link" className="ml-3" onClick={this.toggle.bind(this)}>{content.confirmation.buttons.close}</Button>
                </div>
              </Col>
            </Row>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

export default ModalRegisterConfirm;
