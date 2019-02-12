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
  :hover {
    opacity: 1;
    filter: grayscale(0%);
  }
  ${PictureView}:hover & {
    opacity: 0.4;
    filter: grayscale(100%);
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
    };
    this.getPics = this.getPics.bind(this);
    this.showPictureCarousel = this.showPictureCarousel.bind(this);
    this.closePictureCarousel = this.closePictureCarousel.bind(this);
  }

  getPics(homeId) {
    let that = this;
    axios.get(`/pictures/${homeId}`)
    .then(function (response) {
      that.setState({homeArray: response.data, primaryPic: response.data[0].url})
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  showPictureCarousel() {
    this.setState({showModal: true})
  }

  closePictureCarousel() {
    this.setState({showModal: false})
  }

  componentDidMount() {
    this.getPics(127);
  }
  
  render() {
    return (
      <PictureView>

        <PictureCarousel show={this.state.showModal} handleClose={this.closePictureCarousel} />

        <PrimaryPic>
          <PictureElement src={this.state.homeArray && this.state.homeArray[0].url}/>
        </PrimaryPic>
        <SecondaryPics>
          <PictureGrid>
            <PictureElement src={this.state.homeArray && this.state.homeArray[1].url}/>
          </PictureGrid>
          <PictureGrid>
            <PictureElement src={this.state.homeArray && this.state.homeArray[2].url}/>
          </PictureGrid>
        </SecondaryPics>
        <TertiaryPics>
          <PictureGrid>
            <PictureElement src={this.state.homeArray && this.state.homeArray[3].url}/>
          </PictureGrid>
          <PictureGrid>
            <PictureElement src={this.state.homeArray && this.state.homeArray[4].url}/>
          </PictureGrid>
        </TertiaryPics>
        
        <ShareButton>Share</ShareButton>
        <SaveButton>Save</SaveButton>
        <PicsButton onClick={this.showPictureCarousel}>View Photos</PicsButton>

      </PictureView>
    );
  }
}




export default Module