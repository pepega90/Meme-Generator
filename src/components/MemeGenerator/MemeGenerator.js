import React, {Component} from 'react';
import axios from 'axios';
import classes from './MemeGenerator.module.css';

class MemeGenerator extends Component {
  state = {
    topText: '',
    bottomText: '',
    font_size: '22',
    randomImage: 'http://i.imgflip.com/1bij.jpg',
    allMemesImg: []
  };

  handlerText = e => {
    const {name, value} = e.target;
    this.setState({[name]: value});
  };

  increaseFontSizeHandler = e => {
    const {name, value} = e.target;
    this.setState({[name]: value});
  };

  componentDidMount() {
    axios.get('https://api.imgflip.com/get_memes').then(response => {
      const {memes} = response.data.data;
      this.setState({allMemesImg: memes});
    });
  }

  handleClick = () => {
    let randomNumber = Math.floor(
      Math.random() * this.state.allMemesImg.length
    );
    this.setState({randomImage: this.state.allMemesImg[randomNumber].url});
  };

  render() {
    return (
      <div className={classes.MemeGenerator}>
        <h1>Meme Generator</h1>
        <div className={classes.TextInput}>
          <div>
            <h2 style={{color: '#ffff'}}>Top text</h2>
            <input onChange={this.handlerText} name="topText" />
          </div>
          <div>
            <h2 style={{color: '#ffff'}}>Bottom text</h2>
            <input onChange={this.handlerText} name="bottomText" />
          </div>
        </div>
        <div className={classes.FontSize}>
          <input
            onChange={this.increaseFontSizeHandler}
            value={this.state.font_size}
            type="number"
            name="font_size"
          />
        </div>
        <div className={classes.Meme}>
          <h2
            className={classes.Top}
            style={{fontSize: Number(this.state.font_size)}}
          >
            {this.state.topText}
          </h2>
          <img
            style={{width: '550px', height: '335px'}}
            src={this.state.randomImage}
            alt="memes"
          />
          <h2
            className={classes.Bottom}
            style={{fontSize: Number(this.state.font_size)}}
          >
            {this.state.bottomText}
          </h2>
        </div>
        <button onClick={this.handleClick}>Generate Memes</button>
      </div>
    );
  }
}

export default MemeGenerator;
