import React from 'react';
//import StyledComp, { keyframes } from 'styled-components';
const StyledComp = window.styled;

const Modal = StyledComp.div`
  position: fixed;
  display: ${props => props.showMe ? "block" : "none"};
  background-color: black;
  postition: absolute;
  height: 100%;
  width: 100%;
  background-color: #282828;
  z-index: 2;
`

const CloseButton = StyledComp.div`
  color: white;
  font-size 20pt;
  right: 35px;
  top: 15px;
  position: absolute;
`
const CloseButtonIcon = StyledComp.svg`
  left: 0;
  top: 0;
  width: 30px;
  height: 30px;
  fill: white;
`

const RightButton = StyledComp.div`
  top: 40%;
  right: 1%;
  position: absolute;
`
const RightButtonIcon = StyledComp.svg`
  left: 0;
  top: 0;
  width: 80px;
  height: 80px;
  fill: white;
  @media (max-width: 600px) {
    height: 40px;
    width: 40px;
  }
`

const LeftButton = StyledComp.div`
  top: 40%;
  left: 1%;
  position: absolute;
`
const LeftButtonIcon = StyledComp.svg`
  left: 0;
  top: 0;
  width: 80px;
  height: 80px;
  fill: white;
  @media (max-width: 600px) {
    height: 40px;
    width: 40%;
  }
`

const PicAndDescriptionContainer = StyledComp.div`
  width: 50%;
  height: 100%;
  margin-left: auto;
  margin-right: auto;
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
  font-size 10pt;
  font-weight: 100;
`

const ShowHideListContainer = StyledComp.div`
`

const ShowHideList = StyledComp.div`
  color: white;
  padding: 10px;
  font-size: 10pt;
  font-weight: 100;
  text-align: right;
`

const ThumbnailView = StyledComp.div`
  display: ${props => props.showState ? "inline-block" : "none"};
  vertical-align: middle;
  white-space: nowrap;
  overflow-x: hidden;
  overflow-y: hidden;
`

const Scroller = (start, finish) => window.styled.keyframes`
  from { transform: translate(${start}); }
  to { transform: translate(${finish}); }
`

const Thumb = StyledComp.img`
  width: 19%;
  margin: .5%;
  animation: ${props => Scroller(props.oldSliderLocation, props.newSliderLocation)} 500ms ease-out forwards;
  filter: ${props => props.mappedPicIndex === props.selectedPicIndex ? "brightness(100%)" : "brightness(35%)"};
  border-left: ${props => props.mappedPicIndex === props.selectedPicIndex ? "solid blue 0px" : "none"};
  border-right: ${props => props.mappedPicIndex === props.selectedPicIndex ? "solid blue 0px" : "none"};
`

class PictureCarousel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showHideText: 'Show photo list\u25b2',
      showHideState: false,
    };
    this.showPicsHidePics = this.showPicsHidePics.bind(this);
  }

  showPicsHidePics() {
    if (this.state.showHideState) {
      this.setState({showHideState: false}) 
      this.setState({showHideText: 'Show photo list\u25b2'}) 
    } else {
      this.setState({showHideState: true});
      this.setState({showHideText: 'Hide photo list\u25bc'}) 
    }  
  }
  
  render() {
    return (
      <Modal showMe={this.props.show}>
        <CloseButton onClick={this.props.handleClose}>
          <CloseButtonIcon viewBox="0 0 64 64">
            <path d="M28.94 31.79L.61 60.1a2.01 2.01 0 1 0 2.85 2.85L32 34.42l28.54 28.54a2 2 0 0 0 2.85 0c.79-.78.79-2.06 0-2.85L35.06 31.8 63.41 3.44A2.01 2.01 0 1 0 60.56.59L32 29.15 3.44.59A2.01 2.01 0 0 0 .6 3.44l28.35 28.35z"/>
          </CloseButtonIcon>
        </CloseButton>
        <RightButton onClick={this.props.scrollPic.bind(null, 1)}>
          <RightButtonIcon viewBox="0 0 129 129">
          <path d="m40.4,121.3c-0.8,0.8-1.8,1.2-2.9,1.2s-2.1-0.4-2.9-1.2c-1.6-1.6-1.6-4.2 0-5.8l51-51-51-51c-1.6-1.6-1.6-4.2 0-5.8 1.6-1.6 4.2-1.6 5.8,0l53.9,53.9c1.6,1.6 1.6,4.2 0,5.8l-53.9,53.9z"/>
          </RightButtonIcon>
        </RightButton>
        <LeftButton onClick={this.props.scrollPic.bind(null, -1)}>
          <LeftButtonIcon viewBox="0 0 129 129">
            <path d="m88.6,121.3c0.8,0.8 1.8,1.2 2.9,1.2s2.1-0.4 2.9-1.2c1.6-1.6 1.6-4.2 0-5.8l-51-51 51-51c1.6-1.6 1.6-4.2 0-5.8s-4.2-1.6-5.8,0l-54,53.9c-1.6,1.6-1.6,4.2 0,5.8l54,53.9z"/>
          </LeftButtonIcon>
        </LeftButton>
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
              {this.props.pics && this.props.pics.map((item, index) => <Thumb src={item} key={index} mappedPicIndex={index} selectedPicIndex={this.props.index} newSliderLocation={this.props.newSliderLocation} oldSliderLocation={this.props.oldSliderLocation} onClick={this.props.handleClickOnCarouselPic}/>)}
            </ThumbnailView>
          </ShowHideListContainer>
        </PicAndDescriptionContainer>
      </Modal>
    )
  }
}
export default PictureCarousel