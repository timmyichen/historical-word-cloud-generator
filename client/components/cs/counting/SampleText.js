import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, Header } from 'semantic-ui-react';

import WordTable from './WordTable';

import { simplePrepareText } from '../../../helpers/wordTools';
import { objectToArray } from '../../../helpers/helpers';

const startingText = `You can click on this text to change it! Don't worry about punctuation or caps, those get removed.  Maybe we should repeat repeat some some some words so that we have interesting results results. Woo woo woo woo woo woo woo!`;

class SampleText extends Component {
    constructor(props) {
        super(props);
        this.state = {
            editing: false,
            text: startingText,
            wordFreq: {},
            wordIndex: -1,
            preparedText: '',
            wordArray: [],
        }
        this.toggleEditing = this.toggleEditing.bind(this);
        this.changeText = this.changeText.bind(this);
        this.processNextWord = this.processNextWord.bind(this);
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.stepping !== this.props.stepping) {
            const preparedText = simplePrepareText(this.state.text);
            const wordArray = preparedText.split(' ');
            this.setState({
                wordFreq: {},
                wordIndex: -1,
                preparedText,
                wordArray,
            }, () => { 
                if (nextProps.stepping) this.processNextWord();
            });
        }
    }
    componentDidMount() {
        this.props.sendRef('input', this.refs.input);
    }
    processNextWord() {
        let { wordFreq, wordIndex, wordArray } = this.state;
        if (wordIndex >= 0) {
            const currentWord = wordArray[wordIndex];
            if (wordFreq[currentWord]) {
                wordFreq[currentWord]++;
            } else {
                wordFreq[currentWord] = 1;
            }
        }
        wordIndex++;
        this.setState({ wordFreq, wordIndex })
        
        const marks = this.refs.staticText.querySelectorAll('mark')
        if (wordIndex >= 1) {
            marks[wordIndex - 1].classList.remove('highlight');
        }
        if (wordIndex >= wordArray.length) return;
        marks[wordIndex].classList.add('highlight');
    }
    toggleEditing() {
        this.setState((prevState) => ({ editing: !prevState.editing }));
    }
    changeText(e) {
        this.setState({ text: e.target.value });
    }
    textToSpans(text) {
        const final = [];
        text.split(' ').forEach((word, i) => {
            final.push(<mark key={`word${i}`} className="counting-mark">{word}</mark>);
            final.push(' ');
        });
        return final;
    }
    render() {
        const { editing, text, preparedText, wordFreq, wordIndex, wordArray } = this.state;
        const { stepping } = this.props;
        return (
            <div id="counting-left">
                <div id="text-and-controls" ref="input">
                    <Header as="h3">Text Input and Controls</Header>
                    <div id="controls">
                        <Button
                            toggle
                            active={stepping}
                            onClick={this.props.toggleStepping}
                            icon={stepping ? 'refresh' : 'play'}
                            labelPosition="left"
                            content={stepping ? 'Reset' : 'Start Counting'}
                        />
                        <Button
                            disabled={!stepping || wordIndex >= wordArray.length}
                            onClick={this.processNextWord}
                            icon={wordIndex > wordArray.length - 1 ? 'stop' : 'forward'}
                            labelPosition="right"
                            content={wordIndex < wordArray.length - 1 || wordIndex === -1 ? 'Next Step' : 'Last Step'}
                        />
                    </div>
                    {editing && !stepping ? 
                    <textarea
                        autoFocus
                        onChange={this.changeText}
                        onBlur={this.toggleEditing}
                        value={text}
                    />
                    :
                    <div
                        id="static-text"
                        ref="staticText"
                        onClick={this.toggleEditing}
                    >
                        {stepping ? this.textToSpans(preparedText) : text}
                    </div>
                    }
                </div>
                <WordTable
                    wordFreq={objectToArray(wordFreq) || []}
                    sendRef={this.props.sendRef}
                />
            </div>
        );
    }
}

SampleText.propTypes = {
    
};

export default SampleText;
