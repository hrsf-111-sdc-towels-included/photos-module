import React from 'react';
import StyledComp from 'styled-components';

const Modal = StyledComp.div`
  position: fixed;
  display: ${props => props.showMe ? "block" : "none"};
  background-color: black;
  height: 100%;
  width: 100%;
  opacity: 0.975;
  z-index: 2;
`
const CloseButton = StyledComp.div`
  color: white;
  display: flex;
  right: 20px;
  top: 20px;
  position: absolute;
  z-index: 1;
`

class PictureCarousel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  
  render() {
    return (
      <Modal showMe={this.props.show}>
        <CloseButton onClick={this.props.handleClose}>X</CloseButton>
      </Modal>
    )
  }
}
export default PictureCarousel