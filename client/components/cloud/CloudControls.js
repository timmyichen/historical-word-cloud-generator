import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, Checkbox, TextArea, Popup, Icon } from 'semantic-ui-react';
// import HighlightedTextarea from './modified/HighlightedTextArea';

import DatePicker from './DatePicker';

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
                <div id="main-input-container">
                    <TextArea
                        id="main-text-input"
                        placeholder="text goes here.."
                        value={this.props.text}
                        onChange={this.props.changeText}
                    />
                    {/*<div id="main-text-input-highlight">
                        {this.props.text.replace(/  /g,' \u00a0')}
                    </div>*/}
                </div>
                <div id="controls">
                    <div id="buttons">
                        <Button 
                            toggle
                            active={this.state.editStopWords}
                            onClick={this.toggleEdit}
                        >
                            Edit Stopwords&nbsp;
                            <Popup  hoverable trigger={<Icon size="large" name="question circle" />}>
                                Stopwords are common words in a language which we will ignore
                                when creating the word cloud.  We don't want words like "the",
                                "for", and "I" to appear on the cloud, so they are listed as
                                stop words.  <br /><br />When you click on this button, you can edit the
                                list of stopwords below!  Type directly in the box, one word per line.
                            </Popup>
                        </Button>
                        <Button
                            id="go-button"
                            type="submit"
                            onClick={this.props.renderCloud}
                        >Generate Wordcloud</Button>
                        <DatePicker setText={this.props.setText} />
                    </div>
                    <div id="checkboxes">
                        <Checkbox
                            label="Automatically attempt to remove nonsensical words"
                            onChange={this.props.updateWordRemoval}
                            checked={this.props.wordRemoval}
                        />
                    </div>
                </div>
                <div id='controls-bottom'>
                    <TextArea
                        id="stop-words-input"
                        className={this.state.editStopWords ? '' : 'hidden'}
                        label="Edit stop words below, one per line"
                        placeholder="there should be at least a few stop words.."
                        value={this.props.stopWords}
                        onChange={this.props.changeStopWords}
                    />
                </div>
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

