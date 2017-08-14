import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Header } from 'semantic-ui-react';

const axios = require('axios');

const options = [
    { title: 'Declaration of Independence', filename: 'declaration_independence.txt' },
    { title: 'Emancipation Proclamation', filename: 'emancipation_proclamation.txt' },
    { title: 'US Constitution', filename: 'us_constitution.txt' },
]

class SampleTexts extends Component {
    constructor(props) {
        super(props);
        this.loadText = this.loadText.bind(this);
    }
    loadText(filename) {
        axios.get(`./texts/${filename}`).then((response) => {
            this.props.setText({
                contents: response.data
            });
        })
    }
    render() {
        return (
            <div id="sample-texts">
                <Header as="h3">Sample Texts</Header>
                <p>
                    Click on one of the following links to load the text into the textarea above.
                </p>
                {options.map((option, i) => (
                    <li key={`sampletext-${i}`}>
                        <a onClick={() => {this.loadText(option.filename)}}>{option.title}</a>
                    </li>
                ))}
            </div>
        );
    }
}

SampleTexts.propTypes = {
    
};

export default SampleTexts;
