import React from 'react';
//import StyledComp, { keyframes } from 'styled-components';
import axios from 'axios';
import PictureCarousel from './PictureCarousel.jsx';
import Share from './Share.jsx';
import Save from './Save.jsx';

const StyledComp = window.styled;

const Fade = () =>  window.styled.keyframes`
  0% {
    filter: blur(20px);
  }
  100% {
    filter: blur(0px);
  }
`

const PictureElement = StyledComp.img`
  transition: transform 0.45s;
  background-size:cover;
  background-image: url(${props => props.wait ? props.srcThumb : props.srcBig});
  width: 100%;
  height: 100%;
  object-fit: cover;
  animation: ${Fade} 300ms ease-in-out 0s forwards;
  transform:scale(1.01, 1.01);
  &:hover {
    transform:scale(1.11, 1.11);
  }
`

const PictureGrid = StyledComp.div`
  border: .5px solid grey;
  overflow: hidden;
  height: 50%;
  width: 100%;
`

const PrimaryPic = StyledComp.div`
  height: 100%;
  width: 50%;
  border: 1px solid grey;
  overflow: hidden;
  @media (max-width: 1200px) {
    width: 66%;
  }
  @media (max-width: 800px) {
    width: 100%;
  }
`

const SecondaryPics = StyledComp.div`
  height: 100%;
  width: 25%;
  @media (max-width: 1200px) {
    width: 34%;
  }
  @media (max-width: 800px) {
    width: 0%;
  }
  &:hover {
    > ${PictureGrid} {
      filter: brightness(.4);
    }
  }
  &:hover {
    > ${PictureGrid}:hover {
      filter: brightness(1);
    }
  }
}
`
const TertiaryPics = StyledComp.div`
  height: 100%;
  width: 25%;
  @media (max-width: 1200px) {
    width: 0%;
  }
  &:hover {
    > ${PictureGrid} {
      filter: brightness(.4);
    }
  }
  &:hover {
    > ${PictureGrid}:hover {
      filter: brightness(1);
    }
  }
`

const PictureView = StyledComp.div`
  display: flex;
  flex-fit: column;
  font-family: Circular,-apple-system,BlinkMacSystemFont,Roboto,Helvetica Neue,sans-serif;
  letter-spacing: normal;
  font-size: 13.5px;
  position: relative;
  height: 300px;
  cursor: pointer;
  &:hover {
    > ${PrimaryPic} {
      filter: brightness(.6);
    }
  }
  &:hover {
    > ${PrimaryPic}:hover {
      filter: brightness(1);
    }
  }
  &:hover {
    > ${SecondaryPics} {
      filter: brightness(.6);
    }
  }
  &:hover {
    > ${SecondaryPics}:hover {
      filter: brightness(1);
    }
  }
  &:hover {
    > ${TertiaryPics} {
      filter: brightness(.6);
    }
  }
  &:hover {
    > ${TertiaryPics}:hover {
      filter: brightness(1);
    }
  }
`

const PicsButton = StyledComp.div`
  border: 1px solid grey;
  border-radius: 5px;
  background-color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 35px;
  width: 110px;
  right: 20px;
  bottom: 20px;
  position: absolute;
  z-index: 1;
`
const ShareButton = StyledComp.div`
  border: 1px solid grey;
  border-radius: 5px;
  background-color: white;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  height: 35px;
  width: 90px;
  right: 130px;
  top: 20px;
  position: absolute;
  z-index: 1;
`
const ShareButtonIcon = StyledComp.svg`
  left: 0;
  top: 0;
  width: 16px;
  height: 16px;
  fill: grey;
`

const SaveButton = StyledComp.div`
  border: 1px solid grey;
  border-radius: 5px;
  background-color: white;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  height: 35px;
  width: 90px;
  right: 20px;
  top: 20px;
  position: absolute;
  z-index: 1;
`
const SaveButtonIcon = StyledComp.svg`
  left: 0;
  top: 0;
  width: 16px;
  height: 16px;
  fill: grey;
`

class Module extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      wait: true,
      showPictureModal: false,
      showShareModal: false,
      showSaveModal: false,
      index: 0,
      oldSliderLocation: '0%',
      newSliderLocation: '0%',
    };
    this.getPics = this.getPics.bind(this);
    this.sortAndStorePicsArray = this.sortAndStorePicsArray.bind(this);
    this.showHidePictureCarousel = this.showHidePictureCarousel.bind(this);
    this.showHideShareModal = this.showHideShareModal.bind(this);
    this.showHideSaveModal = this.showHideSaveModal.bind(this);
    this.handleClickOnDisplayPic = this.handleClickOnDisplayPic.bind(this);
    this.handleClickOnCarouselPic = this.handleClickOnCarouselPic.bind(this);
    this.scrollPic = this.scrollPic.bind(this);
    this.generateCarouselLocation = this.generateCarouselLocation.bind(this);
  }

  getPics(homeId) {
    let that = this;
    axios.get(`http://ec2-3-84-131-113.compute-1.amazonaws.com/pictures/${homeId}`)
    .then(function (response) {
      that.setState({homeArray: response.data})
      that.sortAndStorePicsArray();
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  sortAndStorePicsArray() {
    let sortedPicsArray = [];
    let sortedThumbsArray = []
    let sortedTextArray = [];
    let k;
    for (k = 0; k < this.state.homeArray.length; k += 1) {
      if (this.state.homeArray[k].is_primary) {
        sortedPicsArray = [this.state.homeArray[k].url].concat(sortedPicsArray);
        sortedThumbsArray = [this.state.homeArray[k].thumb_url].concat(sortedThumbsArray);
        sortedTextArray = [this.state.homeArray[k].description].concat(sortedTextArray);
      } else {
        sortedPicsArray.push(this.state.homeArray[k].url);
        sortedThumbsArray.push(this.state.homeArray[k].thumb_url);
        sortedTextArray.push(this.state.homeArray[k].description);
      }
    }
    this.setState({sortedPicsArray: sortedPicsArray, sortedThumbsArray: sortedThumbsArray, sortedTextArray: sortedTextArray})
  }

  showHidePictureCarousel() {
    this.setState({showPictureModal: !this.state.showPictureModal})
  }

  showHideShareModal() {
    this.setState({showShareModal: !this.state.showShareModal})
  }

  showHideSaveModal() {
    this.setState({showSaveModal: !this.state.showSaveModal})
  }

  handleClickOnDisplayPic(i, event) {
    this.setState({
      oldSliderLocation: this.generateCarouselLocation(i, 0),
    });
    this.setState({
      index: i,
      showPictureModal: true,
      newSliderLocation: this.generateCarouselLocation(i, 0),
    });
  }

  handleClickOnCarouselPic(event) {
    this.setState({
      oldSliderLocation: this.generateCarouselLocation(this.state.index, 0),
    });
    this.setState({
      index: this.state.sortedPicsArray.indexOf(event.target.src),
      showPictureModal: true,
      newSliderLocation: this.generateCarouselLocation(this.state.sortedPicsArray.indexOf(event.target.src), 0),
    });
  }

  scrollPic(direction) {
    this.setState({oldSliderLocation: this.generateCarouselLocation(this.state.index, 0)});
    if (this.state.index + direction > this.state.sortedPicsArray.length -  1) {
      this.setState({index: 0, newSliderLocation: '0%'});
    } else if (this.state.index + direction < 0) {
      this.setState({index: this.state.sortedPicsArray.length -  1, newSliderLocation: this.generateCarouselLocation(this.state.sortedPicsArray.length -  1, 0)});
    } else {
      this.setState({index: this.state.index + direction, newSliderLocation: (this.generateCarouselLocation(this.state.index, direction))});
    }
  }

  generateCarouselLocation(index, direction) {
    if (index + direction < 2) {
      return 0 * -100 + '%';
    } else if (index + direction > this.state.sortedPicsArray.length -  4) {
      return (5 * -100) - 25 + '%';
    } else {
      return (index  + direction - 2) * -100 + '%';
    } 
  }

  componentDidMount() {
    let homeId = new URLSearchParams(window.location.search).get('homeId');
    let paramId;
    if (window.location.href.split('?')[1]) {
      paramId = window.location.href.split('?')[1];
     } else {
      window.location = window.location.href + "?100";
     }
    this.getPics(paramId);
    setTimeout(function() {this.setState({wait: false})}.bind(this), 200);
  }
  
  render() {
    return (
      <PictureView>
        <PictureCarousel show={this.state.showPictureModal} handleClose={this.showHidePictureCarousel} 
           scrollPic={this.scrollPic} handleClickOnCarouselPic={this.handleClickOnCarouselPic}
           oldSliderLocation={this.state.oldSliderLocation} newSliderLocation={this.state.newSliderLocation}
           index={this.state.index} pics={this.state.sortedPicsArray} texts={this.state.sortedTextArray}/>
        <Share show={this.state.showShareModal} handleClose={this.showHideShareModal}/>
        <Save show={this.state.showSaveModal} handleClose={this.showHideSaveModal}/>
        <PrimaryPic>
          <PictureElement srcThumb={this.state.sortedThumbsArray && this.state.sortedThumbsArray[0]} srcBig={this.state.sortedPicsArray && this.state.sortedPicsArray[0]} wait={this.state.wait} onClick={this.handleClickOnDisplayPic.bind(null, 0)}/>
        </PrimaryPic>
        <SecondaryPics>
          <PictureGrid>
            <PictureElement srcThumb={this.state.sortedThumbsArray && this.state.sortedThumbsArray[1]} srcBig={this.state.sortedPicsArray && this.state.sortedPicsArray[1]} wait={this.state.wait} onClick={this.handleClickOnDisplayPic.bind(null, 1)}/>
          </PictureGrid>
          <PictureGrid>
            <PictureElement srcThumb={this.state.sortedThumbsArray && this.state.sortedThumbsArray[2]} srcBig={this.state.sortedPicsArray && this.state.sortedPicsArray[2]} wait={this.state.wait} onClick={this.handleClickOnDisplayPic.bind(null, 2)}/>
          </PictureGrid>
        </SecondaryPics>
        <TertiaryPics>
          <PictureGrid>
            <PictureElement srcThumb={this.state.sortedThumbsArray && this.state.sortedThumbsArray[3]} srcBig={this.state.sortedPicsArray && this.state.sortedPicsArray[3]} wait={this.state.wait} onClick={this.handleClickOnDisplayPic.bind(null, 3)}/>
          </PictureGrid>
          <PictureGrid>
            <PictureElement srcThumb={this.state.sortedThumbsArray && this.state.sortedThumbsArray[4]} srcBig={this.state.sortedPicsArray && this.state.sortedPicsArray[4]} wait={this.state.wait} onClick={this.handleClickOnDisplayPic.bind(null, 4)}/>
          </PictureGrid>
        </TertiaryPics>
        <ShareButton onClick={this.showHideShareModal}><ShareButtonIcon viewBox="0 0 477.07 477.07">
        <path d="M358.39 159.97h-38.9c-7.5 0-13.5 6-13.5 13.5s6 13.5 13.5 13.5h38.9c19.1 0 34.7 15.6 34.7 34.7v193.8c0 19.1-15.6 34.7-34.7 34.7h-239.8c-19.1 0-34.7-15.6-34.7-34.7v-193.9c0-19.1 15.6-34.7 34.7-34.7h38.9c7.5 0 13.5-6 13.5-13.5s-6-13.5-13.5-13.5h-38.9c-34 0-61.7 27.7-61.7 61.7v193.8c0 34 27.7 61.7 61.7 61.7h239.9c34 0 61.7-27.7 61.7-61.7v-193.8c-.1-34-27.8-61.6-61.8-61.6z"/>
        <path d="M166.99 104.17l58-58v218c0 7.5 6 13.5 13.5 13.5s13.5-6 13.5-13.5v-218l58 58c2.6 2.6 6.1 4 9.5 4s6.9-1.3 9.5-4c5.3-5.3 5.3-13.8 0-19.1l-81.1-81.1c-5.3-5.3-13.8-5.3-19.1 0l-81.1 81.1c-5.3 5.3-5.3 13.8 0 19.1 5.5 5.3 14 5.3 19.3 0z"></path>
        </ShareButtonIcon>Share</ShareButton>
        <SaveButton onClick={this.showHideSaveModal}><SaveButtonIcon viewBox="0 0 129 129">
        <path d="M121.6 40.1c-3.3-16.6-15.1-27.3-30.3-27.3-8.5 0-17.7 3.5-26.7 10.1-9.1-6.8-18.3-10.3-26.9-10.3-15.2 0-27.1 10.8-30.3 27.6-4.8 24.9 10.6 58 55.7 76a4.01 4.01 0 0 0 3 0c45-18.4 60.3-51.4 55.5-76.1zm-57 67.9C25 91.6 11.3 63 15.4 41.7c2.4-12.7 11.2-21 22.3-21 7.5 0 15.9 3.6 24.3 10.5 1.5 1.2 3.6 1.2 5.1 0C75.5 24.5 83.8 21 91.3 21c11.1 0 19.8 8.1 22.3 20.7 4.1 21.1-9.5 49.6-49 66.3z"/>
        </SaveButtonIcon>Save</SaveButton>
        <PicsButton onClick={this.showHidePictureCarousel}>View Photos</PicsButton>
      </PictureView>
    );
  }
}




export default Module