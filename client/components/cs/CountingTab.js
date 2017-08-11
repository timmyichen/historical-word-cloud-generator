import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Header } from 'semantic-ui-react';

import SampleText from './counting/SampleText';
import PyCode from './counting/PyCode';

class CountingTab extends Component {
    constructor(props) {
        super(props);
        this.state = {
            refs: {
                input: null,
                table: null,
                code: null,
            },
        }
        this.getRef = this.getRef.bind(this);
        this.flash = this.flash.bind(this);
    }
    getRef(name, ref) {
        const { refs } = this.state;
        refs[name] = ref;
        this.setState({ refs });
    }
    flash(name, highlight) {
        if (highlight) {
            this.state.refs[name].classList.add('highlight');
        } else {
            this.state.refs[name].classList.remove('highlight');
        }
    }
    render() {
        return (
            <div id="tab-count">
                <Header as="h2">Counting Words</Header>
                <div>
                <div id="step-instructions">
                    <Header as="h3">Instructions</Header>
                    <p>
                        How does a computer count words so quickly?  This tab
                        will show you how it's done.  There are three sections for you
                        to explore:
                    </p>
                    <Header
                        as="h4"
                        onMouseOver={() => {this.flash('input', true)}}
                        onMouseOut={() => {this.flash('input', false)}}
                    >
                        Text Input and Controls
                    </Header>
                    <p>
                        Edit the text in the textbox and click on "Start Counting"
                        to begin the counting process.  Click on "Next Step" to step
                        through all the words in the textbox. Notice that when you
                        start counting, it changes the text to remove punctuation
                        and capitalization!  This is intentional.
                    </p>
                    <Header
                        as="h4"
                        onMouseOver={() => {this.flash('table', true)}}
                        onMouseOut={() => {this.flash('table', false)}}
                    >
                        Word Counting Table
                    </Header>
                    <p>
                        This table keeps track of the all the word frequencies from
                        the textbox to its left.  It will show all the words by default.
                        Click on the checkbox if you only want to see the 10 most frequent
                        words.  The table is sorted from most frequent to least frequent.
                    </p>
                    <Header
                        as="h4"
                        onMouseOver={() => {this.flash('code', true)}}
                        onMouseOut={() => {this.flash('code', false)}}
                    >
                        The Code in Python3
                    </Header>
                    <p>
                        This is a python implementation of the counting algorithm.
                        You can hover your mouse over each line of code to see what
                        the code does.
                    </p>
                </div>
                <SampleText
                    stepping={this.props.stepping}
                    toggleStepping={this.props.toggleStepping}
                    sendRef={this.getRef}
                />
                <PyCode 
                    sendRef={this.getRef}
                />
                </div>
            </div>
        );
    }
}

CountingTab.propTypes = {
    stepping: PropTypes.bool.isRequired,
    toggleStepping: PropTypes.func.isRequired,
};

export default CountingTab;
