import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import {getEntityData,getLanguage,getKeyPhrases,getSentiment} from './service';
import logo from './img/ezest.png';
import Img from './img/ezest.png';
import Img1 from './img/1.jpg';
import Img2 from './img/2.jpg';
import Img3 from './img/3.jpg';
import Img4 from './img/4.jpg';
import Img5 from './img/5.jpg';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.updateUID = this.updateUID.bind(this);
    this.getEntityData = this.getEntityData.bind(this);
    this.state = {
      entityData: [],
      isSearchEnabled: false,
      textData: '',
      recommendationData: [],
      language: '',
      phrases: [],
      sentiment: 0,
      isSentimentVisible: false,
      sentimentText: ''
    }
  }

  componentDidMount() {
    // this.getEntityData();
  }

  updateUID(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  getEntityData() {
    if(this.state.uid) {
      this.setState({ isSentimentVisible: false,language: '',phrases: [] });
      Promise.all([getLanguage(this.state.uid),getKeyPhrases(this.state.uid)])
        .then(resp=> {
          this.setState({
            language: resp[0].data.res.documents[0].detectedLanguages[0].name,
            phrases: resp[1].data.res.documents[0].keyPhrases
          });

        getSentiment(this.state.uid, resp[0].data.res.documents[0].detectedLanguages[0].iso6391Name).then(sentimentResp => {
          const sentimentVal = parseFloat(sentimentResp.data.res.documents[0].score).toFixed(2) * 100;
          this.setState({
            sentiment: sentimentVal,
            isSentimentVisible: true
          });

          if(sentimentVal <=33) {
            this.setState({ sentimentText: 'Negative'});
          } else if(sentimentVal >33 && sentimentVal <=66) {
            this.setState({ sentimentText: 'Neutral'});
          } else {
            this.setState({ sentimentText: 'Positive'});
          }

        }, sentimentErr => {
          //
        });
      }, err => {
        console.log('Promsie err:', err);
      });
    }
    
  }

  render() {
    return (
      <div className="app-container" style={{ height: window.innerHeight }}>
      <div className="app-header">
        <img src={logo} />
        <span>Sentiment Analyzer System</span>
      </div>
      <div className="search-container">
        <div className="row">
          <div className="col col-lg-6 col-sm-6 col-md-6 input-cnt">
            <textarea rows={10} placeholder="Enter your feedback" name="uid" onChange={this.updateUID}></textarea>
            <button onClick={this.getEntityData}>Analyze Review</button>
          </div>
          <div className="col col-lg-6 col-sm-6 col-md-6">
            <div><strong>Language</strong>: {this.state.language}</div>
            <div><strong>Key Phrases</strong>: {this.state.phrases.map((item, ind) => (
              <span key={ind}>{item}{ind !== this.state.phrases.length - 1 ? ', ': ''}</span>
            ))}</div>
            <div><strong>Sentiment</strong>: {this.state.isSentimentVisible ? `${this.state.sentiment}% (${this.state.sentimentText})`: ''}</div>
          </div>
        </div>
      </div>
      </div>
    );
  }
}

export default App;
