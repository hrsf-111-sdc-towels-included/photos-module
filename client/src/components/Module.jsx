import React from 'react';
import StyledComp from 'styled-components';
import axios from 'axios';
import PictureCarousel from './PictureCarousel.jsx';

const PictureView = StyledComp.div`
  display: flex;
  flex-fit: column;
  position: relative;
  height: 300px;
  background-color: black;
  cursor: pointer;
`
const PrimaryPic = StyledComp.div`
  height: 100%;
  width: 50%;
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
`
const TertiaryPics = StyledComp.div`
  height: 100%;
  width: 25%;
  @media (max-width: 1200px) {
    width: 0%;
  }
`
const PictureGrid = StyledComp.div`
  height: 50%;
  width: 100%;
`
const PictureElement = StyledComp.img`
  object-fit: cover;
  width: 100%;
  height: 100%;
  &:hover {
    > ${PictureView} {
      filter: brightness(35%);
    }
    filter: brightness(100%)
  }
  
`
const PicsButton = StyledComp.div`
  border: 1px solid grey;
  border-radius: 5px;
  background-color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 30px;
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
  justify-content: center;
  align-items: center;
  height: 30px;
  width: 90px;
  right: 20px;
  top: 20px;
  position: absolute;
  z-index: 1;
`
const SaveButton = StyledComp.div`
  border: 1px solid grey;
  border-radius: 5px;
  background-color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 30px;
  width: 90px;
  right: 130px;
  top: 20px;
  position: absolute;
  z-index: 1;
`

class Module extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      index: 0,
      oldSliderLocation: '0%',
      newSliderLocation: '0%',
    };
    this.getPics = this.getPics.bind(this);
    this.sortAndStorePicsArray = this.sortAndStorePicsArray.bind(this);
    this.showHidePictureCarousel = this.showHidePictureCarousel.bind(this);
    this.handleClickOnDisplayPic = this.handleClickOnDisplayPic.bind(this);
    this.scrollPic = this.scrollPic.bind(this);
  }

  getPics(homeId) {
    let that = this;
    axios.get(`/pictures/${homeId}`)
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
    let sortedTextArray = [];
    let k;
    for (k = 0; k < this.state.homeArray.length; k += 1) {
      if (this.state.homeArray[k].is_primary) {
        sortedPicsArray = [this.state.homeArray[k].url].concat(sortedPicsArray);
        sortedTextArray = [this.state.homeArray[k].description].concat(sortedTextArray);
      } else {
        sortedPicsArray.push(this.state.homeArray[k].url);
        sortedTextArray.push(this.state.homeArray[k].description);
      }
    }
    this.setState({sortedPicsArray: sortedPicsArray})
    this.setState({sortedTextArray: sortedTextArray})
  }

  showHidePictureCarousel() {
    this.setState({showModal: !this.state.showModal})
  }

  handleClickOnDisplayPic(event) {
    this.setState({
      oldSliderLocation: this.state.index * -100 + '%',
    });
    this.setState({
      index: this.state.sortedPicsArray.indexOf(event.target.src),
      showModal: true,
      newSliderLocation: this.state.sortedPicsArray.indexOf(event.target.src) * -100 + '%',
    });
  }

  scrollPic(direction) {
    this.setState({oldSliderLocation: this.state.index * -100 + '%'});
    if (this.state.index + direction > this.state.sortedPicsArray.length -  1) {
      this.setState({index: 0, newSliderLocation: '0%'});
    } else if (this.state.index + direction < 0) {
      this.setState({index: this.state.sortedPicsArray.length -  1, newSliderLocation: this.state.sortedPicsArray.length -  1 * -100 + '%'});
    } else {
      this.setState({index: this.state.index + direction, newSliderLocation: (this.state.index + direction) * -100 + '%'});
    }
  }

  componentDidMount() {
    this.getPics(142);
  }
  
  render() {
    return (
      <PictureView>
        <PictureCarousel show={this.state.showModal} handleClose={this.showHidePictureCarousel} 
           scrollPic={this.scrollPic} handleClickOnDisplayPic={this.handleClickOnDisplayPic}
           oldSliderLocation={this.state.oldSliderLocation} newSliderLocation={this.state.newSliderLocation}
           index={this.state.index} pics={this.state.sortedPicsArray} texts={this.state.sortedTextArray}/>
        <PrimaryPic>
          <PictureElement src={this.state.sortedPicsArray && this.state.sortedPicsArray[0]} onClick={this.handleClickOnDisplayPic}/>
        </PrimaryPic>
        <SecondaryPics>
          <PictureGrid>
            <PictureElement src={this.state.sortedPicsArray && this.state.sortedPicsArray[1]} onClick={this.handleClickOnDisplayPic}/>
          </PictureGrid>
          <PictureGrid>
            <PictureElement src={this.state.sortedPicsArray && this.state.sortedPicsArray[2]} onClick={this.handleClickOnDisplayPic}/>
          </PictureGrid>
        </SecondaryPics>
        <TertiaryPics>
          <PictureGrid>
            <PictureElement src={this.state.sortedPicsArray && this.state.sortedPicsArray[3]} onClick={this.handleClickOnDisplayPic}/>
          </PictureGrid>
          <PictureGrid>
            <PictureElement src={this.state.sortedPicsArray && this.state.sortedPicsArray[4]} onClick={this.handleClickOnDisplayPic}/>
          </PictureGrid>
        </TertiaryPics>
        <ShareButton>Share</ShareButton>
        <SaveButton>Save</SaveButton>
        <PicsButton onClick={this.showHidePictureCarousel}>View Photos</PicsButton>
      </PictureView>
    );
  }
}




export default Module