import React from 'react';
//import StyledComp from 'styled-components';
const StyledComp = window.styled;

const ShareModal = StyledComp.div`
  position: fixed;
  overflow-y: auto;
  display: ${props => props.showMe ? "block" : "none"};
  height: 100%;
  width: 100%;
  background-color: rgb(0,0,0,.6);
  z-index: 2;
`
const MainContainer = StyledComp.div`
  height: 110%;
  width: 100%;
  overflow: scroll;
  display: flex;
  justify-content: center;
  z-index: 2;
`

const CentralContainer = StyledComp.div`
  position: absolute;
  top: 10%;
  height: 100px;
  width: 400px;
  background-color: rgb(255,255,255,1);
  z-index: 2;
  display: flex;
  justify-content: center;
  
`

const CloseButton = StyledComp.div`
  position: absolute;
  top: 15%;
  left: 3.5%;
  width: 40px;
  height: 40px;
`

const Screenshot = StyledComp.img`
  height: 700px;
  object-fit: contain;
  
`

class Share extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  
  render() {
    return (
      <ShareModal showMe={this.props.show}>
        <MainContainer>
        <CentralContainer>
            <CloseButton onClick={this.props.handleClose}>
            </CloseButton>
          <Screenshot src="https://s3-us-west-1.amazonaws.com/ch0psh0p-bread4bed/ShareModal.png" />
        </CentralContainer>
        </MainContainer>
      </ShareModal>
    )
  }
}
export default Share;
