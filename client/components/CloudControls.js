import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Form, Button } from 'semantic-ui-react';
// import HighlightedTextarea from './modified/HighlightedTextArea';

class CloudControls extends Component {
    constructor(props) {
        super(props);
        this.state = {
            editStopWords: false,
        };
        this.toggleEdit = this.toggleEdit.bind(this);
        this.highlightWords = this.highlightWords.bind(this);
    }
    toggleEdit() {
        this.setState(prev => ({editStopWords: !prev.editStopWords}));
    }
    highlightWords(word) {
        const re = new RegExp(`\\b${word}\\b`,'gi');
        return this.props.text.replace(re,<span class='highlight'>{word}</span>);
    }
    doHighlight() {
        return /text/gi
    }
    render() {
        return (
            <div id="cloud-controls">
                <Form>
                    <div id="main-input-container">
                        <Form.TextArea
                            id="main-text-input"
                            placeholder="text goes here.."
                            value={this.props.text}
                            onChange={this.props.changeText}
                        />
                        {/*<div id="main-text-input-highlight">
                            {this.props.text.replace(/  /g,' \u00a0')}
                        </div>*/}
                    </div>
                    <Button 
                        toggle
                        active={this.state.editStopWords}
                        onClick={this.toggleEdit}
                    >
                        Edit Stopwords
                    </Button>
                    <Button
                        type="submit"
                        onClick={this.props.renderCloud}
                    >Go!</Button>
                    <Button
                        onClick={this.props.loadFileText}
                    >load from file</Button>
                    <Form.TextArea
                        id="stop-words-input"
                        className={this.state.editStopWords ? '' : 'hidden'}
                        label="Edit stop words below, one per line"
                        placeholder="there should be at least a few stop words.."
                        value={this.props.stopWords}
                        onChange={this.props.changeStopWords}
                    />
                </Form>
                
            </div>
        );
    }
}

CloudControls.propTypes = {
    text: PropTypes.string.isRequired,
    stopWords: PropTypes.string.isRequired,
    changeText: PropTypes.func.isRequired,
    changeStopWords: PropTypes.func.isRequired,
    renderCloud: PropTypes.func.isRequired,
};

export default CloudControls;

                    // <HighlightedTextarea
                    //     text={this.props.text}
                    //     changeText={this.props.changeText}
                    //     highlight={this.doHighlight}
                    // />

