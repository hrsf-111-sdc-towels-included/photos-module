import React from 'react';
import StyledComp from 'styled-components';

const Modal = StyledComp.div`
  position: fixed;
  display: ${props => props.showMe ? "block" : "none"};
  background-color: black;
  height: 100%;
  width: 100%;
  background-color: grey;
  z-index: 2;
`

const CloseButton = StyledComp.div`
  color: white;
  font-size 20pt;
  right: 80px;
  top: 80px;
  position: absolute;
  z-index: 3;
`

const RightButton = StyledComp.div`
  color: white;
  font-size 20pt;
  right: 80px;
  top: 50%;
  position: absolute;
  z-index: 1;
`

const LeftButton = StyledComp.div`
  color: white;
  font-size 20pt;
  left: 80px;
  top: 50%;
  position: absolute;
  z-index: 1;
`

const PicAndDescriptionContainer = StyledComp.div`
  width: 70%;
  height: 100%;
  margin-left: 15%;
  margin-right: 15%;
  display: flex;
  flex-direction: column;
  justify-content: center;
`
const CenterPicContainer = StyledComp.div`
  background-color: green;
  display: flex;
  align-items: center;
`
const CenterPic = StyledComp.img`
  width: 100%;
  object-fit: contain;
`
const DescriptionContainer = StyledComp.div`
  display: flex;
  flex-direction: row;
`

const Description = StyledComp.div`
  color: white;
  font-size 12pt;
`

const ShowHideListContainer = StyledComp.div`
`

const ShowHideList = StyledComp.div`
  color: white;
  padding: 10px;
  font-size: 12pt;
  text-align: right;
`

const ThumbnailView = StyledComp.div`
  visibility: ${props => props.showState ? "visible" : "hidden"};
`

const Thumb = StyledComp.img`
  width: 10%;
`

class PictureCarousel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      index: 0,
      showHideText: 'Show photo list...',
      showHideState: false,
    };
    this.scrollPicRight = this.scrollPicRight.bind(this);
    this.scrollPicLeft = this.scrollPicLeft.bind(this);
    this.manageCarousel = this.manageCarousel.bind(this);
    this.showPicsHidePics = this.showPicsHidePics.bind(this);
  }

  scrollPicRight() {
    if (this.state.index < this.props.pics.length - 1) {
      this.setState({index: this.state.index + 1});
    } else {
      this.setState({index: 0});
    }
  }

  scrollPicLeft() {
    if (this.state.index > 0) {
      this.setState({index: this.state.index - 1});
    } else {
      this.setState({index: this.props.pics.length - 1});
    }
  }

  showPicsHidePics() {
    if (this.state.showHideState) {
      this.setState({showHideState: false}) 
      this.setState({showHideText: 'Show photo list...'}) 
    } else {
      this.setState({showHideState: true});
      this.setState({showHideText: 'Hide photo list...'}) 
    }  
  }

  manageCarousel() {
    let tuckedArray = [];
    if (this.state.index < this.props.pics.length - 4) {
      tuckedArray = this.props.pics.splice(this.state.index, this.state.index + 7)
    }
    return tuckedArray;
  }
  
  render() {
    return (
      <Modal showMe={this.props.show}>
        <CloseButton onClick={this.props.handleClose}> X </CloseButton>
        <RightButton onClick={this.scrollPicRight}> R </RightButton>
        <LeftButton onClick={this.scrollPicLeft}> L </LeftButton>
        <PicAndDescriptionContainer>
          <CenterPicContainer>
            <CenterPic src={this.props.pics && this.props.pics[this.state.index]} />
          </CenterPicContainer>
          <DescriptionContainer>
            <Description>{this.state.index + 1}/{this.props.texts && this.props.texts.length}: {this.props.texts && this.props.texts[this.state.index]}</Description>
          </DescriptionContainer>
          <ShowHideListContainer>
            <ShowHideList onClick={this.showPicsHidePics}>{this.state.showHideText}</ShowHideList>
            <ThumbnailView showState={this.state.showHideState}>
              {this.props.pics && this.props.pics.map((item, index) => <Thumb src={item} key={index} ></Thumb>)}
            </ThumbnailView>
          </ShowHideListContainer>
        </PicAndDescriptionContainer>
      </Modal>
    )
  }
}
export default PictureCarousel