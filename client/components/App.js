import React, { Component } from 'react';

import CloudContainer from './CloudContainer';
import CsContainer from './CsContainer';

import { getStopWords } from '../helpers/wordTools';
import { Header } from 'semantic-ui-react';

const axios = require('axios');

const defaultText = `This is a bunch of text you should probably change. Change it to whatever you want!  Or run it to see what happens.  The world is your oyster.  Or maybe just this web app.  Repeated words words words words words words will appear as larger text text text.`

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            newsInfo: null,
            cloudText: defaultText,
            stopWords: '',
            tabIndex: 0,
            currentDocs: null,
        };
        getStopWords().then((data) => {
            this.setState({stopWords: data});
        });
        this.changeText = this.changeText.bind(this);
        this.changeStopWords = this.changeStopWords.bind(this);
        this.setText = this.setText.bind(this);
        this.setDocs = this.setDocs.bind(this);
    }
    changeText(event) {
        this.setState({ cloudText: event.target.value });
    }
    changeStopWords(event) {
        this.setState({ stopWords: event.target.value });
    }
    setText(newsInfo) {
        this.setState({ newsInfo, cloudText: newsInfo.contents });
    }
    setDocs(currentDocs) {
        if (currentDocs.empty) {
            this.setState({ currentDocs: {
                docs: currentDocs.papers,
                type: 'empty',
            } });
        } else if (currentDocs.selectedNews === 99) {
            this.setState({
                currentDocs: {
                    docs: currentDocs.papers,
                    type: 'array',
                }
            });
        } else {
            this.setState({
                currentDocs: {
                    docs: currentDocs.papers[currentDocs.selectedNews],
                    type: 'single',
                }
            })
        }
    }
    render() {
        const { cloudText, stopWords, currentDocs } = this.state;
        return (
            <div id="main-container">
                <Header as="h1">Historical Word Cloud Generator</Header>
                <CloudContainer
                    text={cloudText}
                    stopWords={stopWords}
                    changeText={this.changeText}
                    changeStopWords={this.changeStopWords}
                    setText={this.setText}
                    setDocs={this.setDocs}
                />
                <CsContainer
                    currentDocs={currentDocs}
                />
            </div>
        );
    }
}

export default App;
