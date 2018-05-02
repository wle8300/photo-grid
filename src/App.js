import React, { Component } from 'react';
import ImagePalette from 'react-image-palette'
import Color from 'color'

import image1 from './images/1.jpg'
import image2 from './images/2.jpg'
import image3 from './images/3.jpg'
import image4 from './images/4.jpg'
import image5 from './images/5.jpg'
import image6 from './images/6.jpg'
import image7 from './images/7.jpg'
import image8 from './images/8.jpg'
const images = [
  image1,
  image2,
  image3,
  image4,
  image5,
  image6,
  image7,
  image8,
]


class App extends Component {

  state = {
    pressedItemIndex: -1,
    selectedItemIndex: -1,
  }

  render() {
    return (
      <div>
        <div style={{
          display: 'flex',
          justifyContent: 'center',
        }}>

          <div style={{
            padding: '2rem',
            // maxWidth: '62.5rem', //~1000px
            columnCount: 3,
            columnGap: '3rem',
          }}>
            {
              images.map((src, index) => {
                return (
                  <Card
                    key={index}
                    src={src}
                    pressedItemIndex={this.state.pressedItemIndex}
                    selectedItemIndex={this.state.selectedItemIndex}
                    isPressed={this.state.pressedItemIndex === index}
                    isSelected={this.state.selectedItemIndex === index}
                    onMouseDown={() => {
                      this.setState({
                        pressedItemIndex: index,
                      })
                    }}
                    onMouseUp={() => {
                      this.setState({
                        pressedItemIndex: -1,
                        selectedItemIndex: this.state.selectedItemIndex !== index ? index : -1,
                      })
                    }}
                  />
                )
              })
            }
          </div>
        </div>
      </div>
    );
  }

  componentDidMount () {
    document.addEventListener("keydown", (event) => {
      if (event.keyCode === 27) return this.reset()
    }, false)
  }

  reset = () => {

    this.setState({selectedItemIndex: -1})
  }
}

class Card extends Component {

  state = {
    ref: null,
    inactiveWidth: 0,
    inactiveHeight: 0,
  }

  render() {
    return (
      <ImagePalette image={this.props.src}>
        {
          (palette) => {

            const margin = 1.5
            const auraSize = 1.5//this.props.isPressed ? margin : margin
            const alphaValue = this.props.isPressed ? 0.5 : 0.25
            const backgroundColor = Color(palette.backgroundColor).string()
            const backgroundColorOpaque = Color(palette.backgroundColor).alpha(alphaValue).string()
            const color = Color(palette.color).string()
            const colorOpaque = Color(palette.color).alpha(alphaValue).string()
            const alternativeColor = Color(palette.alternativeColor).string()
            const alternativeColorOpaque = Color(palette.alternativeColor).alpha(alphaValue).string()
            const accentColor = this.props.isPressed ? backgroundColor : backgroundColorOpaque
            const blur = () => {
              return (
                this.props.pressedItemIndex > -1
                && !this.props.isPressed
                  ? 1
                  : !this.props.isSelected && this.props.selectedItemIndex > -1
                    ? 1
                    : 0

              )
            }
            const z = this.props.isPressed ? -1 : 0
            // const translateX = () => {
            //   return this.props.isSelected
            //     ? `calc(50vw - ${this.state.clientWidth / 2}px - ${this.state.boundingClientRect().left}px)`
            //     : '0'
            // }
            // const translateY = () => {
            //   return this.props.isSelected
            //     ? `calc(50vh - ${this.state.clientHeight / 2}px - ${this.state.inactivendingClientRect().top}px)`
            //     : '0'
            // }


            //!!
            if (this.props.isSelected) {
              // console.log('this.state.inactiveWidth', this.state.inactiveWidth)
              // console.log('this.state.inactiveHeight', this.state.inactiveHeight)
              // console.log('activeWidth', this.state.ref.clientWidth)
              // console.log('activeHeight', this.state.ref.clientHeight)
            }


            return (
              <div style={{
                position: this.props.isSelected ? 'fixed' : 'relative',
                zIndex: this.props.isSelected ? 1 : 0,
                top: 0,
                left: 0,
                display: 'inline-block',
                margin: `${margin}rem 0`,
                width: this.state.inactiveWidth || '100%',
                height: this.state.inactiveHeight || '100%',
                transition: 'all 500ms ease-out',
              }}>
                <div style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  width: this.props.isSelected ? '100vw' : 'initial',
                  height: this.props.isSelected ? '100vh' : 'initial',
                  backgroundColor: this.props.isSelected ? colorOpaque : 'transparent',
                  transition: 'all 500ms ease-out',
                }}>
                  <img
                    ref={this.initRef}
                    src={this.props.src}
                    onMouseDown={this.props.onMouseDown}
                    onMouseUp={this.props.onMouseUp}
                    alt={this.props.src}
                    style={{
                      maxWidth: this.props.isSelected ? '95vw' : '100%',
                      maxHeight: this.props.isSelected ? '90vw' : '100%',
                      objectFit: 'cover',
                      borderRadius: this.props.isSelected ? '0.5rem' : 0,
                      boxShadow: `0 0 ${auraSize}rem ${accentColor}`,
                      cursor: 'pointer',
                      filter: `blur(${blur()}vw)`,
                      transform: `
                        translateZ(${z}px)
                      `,
                      transition: 'all 250ms ease-out',
                    }}
                  />
                </div>
              </div>
            )}
        }
      </ImagePalette>
    )
  }

  initRef = (ref) => {

    if (!this.state.ref) {

      this.setState({
        ref: ref,
        inactiveWidth: ref.clientWidth,
        inactiveHeight: ref.clientHeight,
      })
    }
  }

}

export default App;
