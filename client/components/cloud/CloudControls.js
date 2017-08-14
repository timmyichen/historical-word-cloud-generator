import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, Checkbox, TextArea, Popup, Icon } from 'semantic-ui-react';
import HighlightedTextarea from '../other/HighlightedTextArea';

import DatePicker from './DatePicker';
import SampleTexts from './SampleTexts';

class CloudControls extends Component {
    constructor(props) {
        super(props);
        this.state = {
            editStopWords: false,
        };
        this.toggleEdit = this.toggleEdit.bind(this);
        this.highlightWords = this.highlightWords.bind(this);
        this.handleScroll = this.handleScroll.bind(this);
        this.getHighlightRegex = this.getHighlightRegex.bind(this);
    }
    toggleEdit() {
        this.setState(prev => ({editStopWords: !prev.editStopWords}));
    }
    highlightWords(word) {
        const re = new RegExp(`\\b${word}\\b`,'gi');
        const split = this.props.text.split(re);
        const wordsOriginal = this.props.text.split(/\b/).filter(w => w.match(re));
        const count = split.length;
        let inserted = 0;
        split[0] = split[0].replace(/  /g,' \u00a0');
        for (let i=1; i<count; i++) {
            split[i+inserted] = split[i+inserted].replace(/  /g,' \u00a0');
            const newItem = <span ref='' key={`hl-${i}`} className="highlight">{wordsOriginal[i-1]}</span>;
            split.splice(i+inserted, 0, newItem);
            inserted++;
        }
        return split;
    }
    getHighlightRegex() {
        return new RegExp(`\\b${this.props.highlightedWord}\\b`,'gi');
    }
    handleScroll(e) {
        console.log(this.refs.highlightText.scrollTop);
        console.log(this.refs.mainText.scrollTop);
        this.refs.highlightText.scrollTop = this.refs.mainText.scrollTop;
    }
    render() {
        return (
            <div id="cloud-controls">
                <div id="text-input">
                    <HighlightedTextarea
                        value={this.props.text}
                        handleInput={this.props.changeText}
                        highlight={this.getHighlightRegex}
                    />
                </div>
                <div id="controls">
                    <div id="buttons">
                        <DatePicker
                            setText={this.props.setText}
                            setDocs={this.props.setDocs}
                            clearCloud={this.props.clearCloud}
                            cloudBodyDate={this.props.cloudBodyDate}
                            cloudBodyNews={this.props.cloudBodyNews}
                        />
                        <Button
                            positive
                            id="go-button"
                            type="submit"
                            onClick={this.props.renderCloud}
                        >Generate Wordcloud</Button>
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
                    </div>
                    <div id="checkboxes">
                        <Checkbox
                            label="Automatically attempt to remove&nbsp;"
                            onChange={this.props.updateWordRemoval}
                            checked={this.props.wordRemoval}
                        />
                        <span
                            className="pointer-hover"
                            onClick={this.props.updateWordRemoval}
                        >
                            <Popup
                                hoverable
                                trigger={<span style={{ textDecoration: 'underline', textDecorationStyle: 'dashed' }}>nonsensical words</span>}
                                content="Words that are all lowercase, less than 4 characters, and not
                                found within the top 10,000 most common English words will be
                                removed automatically if this box is checked."
                            />
                        </span>
                    </div>
                </div>
                <div id='controls-bottom'>
                    <SampleTexts
                        setText={this.props.setText}
                    />
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
    setText: PropTypes.func.isRequired,
    setDocs: PropTypes.func.isRequired,
    updateWordRemoval: PropTypes.func.isRequired,
    highlightedWord: PropTypes.string.isRequired,
    clearCloud: PropTypes.func.isRequired,
};

export default CloudControls;

                    // <HighlightedTextarea
                    //     text={this.props.text}
                    //     changeText={this.props.changeText}
                    //     highlight={this.doHighlight}
                    // />

