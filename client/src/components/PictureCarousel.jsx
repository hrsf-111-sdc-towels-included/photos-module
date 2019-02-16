import React from 'react';
import StyledComp, { keyframes } from 'styled-components';

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
  display: ${props => props.showState ? "inline-block" : "none"};
  vertical-align: middle;
  white-space: nowrap;
  overflow-x: hidden;
  overflow-y: hidden;
`

const Scroller = (start, finish) => keyframes`
  from { transform: translate(${start}); }
  to { transform: translate(${finish}); }
`

const Thumb = StyledComp.img`
  width: 15%;
  animation: ${props => Scroller(props.oldSliderLocation, props.newSliderLocation)} 500ms ease-out forwards;
  filter: ${props => props.mappedPicIndex === props.selectedPicIndex ? "brightness(100%)" : "brightness(35%)"};
`

class PictureCarousel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showHideText: 'Show photo list...',
      showHideState: false,
    };
    this.showPicsHidePics = this.showPicsHidePics.bind(this);
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
  
  render() {
    return (
      <Modal showMe={this.props.show}>
        <CloseButton onClick={this.props.handleClose}> X </CloseButton>
        <RightButton onClick={this.props.scrollPic.bind(null, 1)}> R </RightButton>
        <LeftButton onClick={this.props.scrollPic.bind(null, -1)}> L </LeftButton>
        <PicAndDescriptionContainer>
          <CenterPicContainer>
            <CenterPic src={this.props.pics && this.props.pics[this.props.index]} />
          </CenterPicContainer>
          <DescriptionContainer>
            <Description>{this.props.index + 1}/{this.props.texts && this.props.texts.length}: {this.props.texts && this.props.texts[this.props.index]}</Description>
          </DescriptionContainer>
          <ShowHideListContainer>
            <ShowHideList onClick={this.showPicsHidePics}>{this.state.showHideText}</ShowHideList>
            <ThumbnailView showState={this.state.showHideState}>
              {this.props.pics && this.props.pics.map((item, index) => <Thumb src={item} key={index} mappedPicIndex={index} selectedPicIndex={this.props.index} newSliderLocation={this.props.newSliderLocation} oldSliderLocation={this.props.oldSliderLocation} onClick={this.props.handleClickOnDisplayPic}/>)}
            </ThumbnailView>
          </ShowHideListContainer>
        </PicAndDescriptionContainer>
      </Modal>
    )
  }
}
export default PictureCarousel