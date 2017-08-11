import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Header, Popup } from 'semantic-ui-react';

const Theme = require('syntux/style/atelier-sulphurpool.light');
const Python = require('syntux/python');

let code = `
text = input("Enter the text: ")

text = prepare_text(text)

words = text.split(" ")
count = {}

for word in words:
    if word in count:
        count[word] = count[word] + 1
    else:
        count[word] = 1

print(count)
`;

const annotations = {
    1: "The first thing we need is the text we are going to use.  We get it from the user and save it to a variable called 'text'",
    3: "Then we want to prepare the text for counting.  In the example, we use a simple process of removing punctuation, getting rid of extra spaces, and making everything lowercase.",
    5: "Here the text is split up (by every space) into a list of words.  This is saved in a variable called 'words'.",
    6: "The 'count' variable is initialized.  This will hold the frequencies of every word by using pairs of keys (the words) and values (the count)",
    8: "This is a loop where we loop through each word in our list of words (saved in a variable called 'word').",
    9: "If the word has already been counted before...",
    10: "We want to increase the count for that word by 1.",
    11: "But if it hasn't been counted before...",
    12: "Let's create a new record and start the count at 1.",
    14: "At the end of everything (this is 'outside' the loop, we print out the count for the user.  That's it!",
};

const final = [];
code = code.replace(/  /g, ' \u00a0').split('\n').forEach((line, i) => {
    // final.push(line);
    final.push(annotations[i] ? 
        <Popup
            key={`annotation${i}`}
            trigger={<span><Python>{line}</Python></span>}
            content={annotations[i]}
            hoverable
        /> : <Python key={`blank${i}`}>{'\n'}</Python>
    );
    // final.push(<br key={`br${i}`} />)
});

class PyCode extends Component {
    componentDidMount() {
        this.props.sendRef('code', this.refs.code);
    }
    render() {
        return (
            <div id="python-code" ref="code">
                <Header as="h3">The Code in Python3</Header>
                <code>
                    {Theme}
                    {final}
                </code>
            </div>
        );
    }
}

PyCode.propTypes = {
    sendRef: PropTypes.func.isRequired,
};

export default PyCode;
