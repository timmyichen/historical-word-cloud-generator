//this module has been modified from the react-highlighted-text NPM module found here:
//  https://github.com/keustma/react-highlighted-textarea
//released under the MIT license

import React, { PropTypes, Component } from 'react';

import PubSub from 'pubsub-js';

const OPEN_MARK = '<mark>';
const CLOSE_MARK = '</mark>';
  
export default class HighlightedTextarea extends Component {
  constructor(props) {
    super(props);
    this.state = {
      input: props.value,
      currentHighlightIndex: 0,
      lastHighlightedWord: '',
    };
    this._handleInputChange = this._handleInputChange.bind(this);
    this._handleScroll = this._handleScroll.bind(this);
    this.findFirstHighlight = this.findFirstHighlight.bind(this);
    PubSub.subscribe('highlight', this.findFirstHighlight);
  }

  _handleInputChange(event) {
    this.setState({input: event.target.value});
  }

  _handleScroll(event) {
    const scrollTop = event.target.scrollTop;
    this.refs.backdrop.scrollTop = scrollTop;
  }

  _handleRegexHighlight(input, payload) {
    return input.replace(payload, OPEN_MARK + '$&' + CLOSE_MARK);
  }

  _handleArrayHighlight(input, payload) {
    let offset = 0;
    payload.forEach(function(element) {

      // insert open tag
      var open = element[0] + offset;

      if(element[2]) {
        const OPEN_MARK_WITH_CLASS = '<mark class="' + element[2] + '">';
        input = input.slice(0, open) + OPEN_MARK_WITH_CLASS + input.slice(open);
        offset += OPEN_MARK_WITH_CLASS.length;
      } else {
        input = input.slice(0, open) + OPEN_MARK + input.slice(open);
        offset += OPEN_MARK.length;
      }

      // insert close tag
      var close = element[1] + offset;

      input = input.slice(0, close) + CLOSE_MARK + input.slice(close);
      offset += CLOSE_MARK.length;

    }, this);
    return input;
  }

  getHighlights() {
    let highlightMarks = this.props.value;
    const payload = this.props.highlight(highlightMarks);

    // escape HTML
    highlightMarks = highlightMarks.replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;');

    if (payload) {
      switch (payload.constructor.name) {
        case 'Array':
          highlightMarks = this._handleArrayHighlight(highlightMarks, payload);
          break;
        case 'RegExp':
          highlightMarks = this._handleRegexHighlight(highlightMarks, payload);
          break;
        default:
          throw 'Unrecognized payload type!';
      }
    }

    // this keeps scrolling aligned when input ends with a newline
    highlightMarks = highlightMarks.replace(new RegExp('\\n(' + CLOSE_MARK + ')?$'), '\n\n$1');

    // highlightMarks = highlightMarks.replace(new RegExp(OPEN_MARK, 'g'), '<mark>');
    // highlightMarks = highlightMarks.replace(new RegExp(CLOSE_MARK, 'g'), '</mark>');
    
    return highlightMarks;
  }

  findFirstHighlight() {
    // if (this.refs.)
    // if (this.refs.backdrop) {
      this.refs.textarea.scrollTop = this.refs.backdrop.querySelector('mark').offsetTop;
    // }
  }
  render() {
    return (
      <div className="hwt-container">
        <div className="hwt-backdrop" ref="backdrop">
          <div
            className="hwt-highlights hwt-content"
            dangerouslySetInnerHTML={{__html: this.getHighlights()}}
          />
        </div>
        <textarea
          ref="textarea"
          className="hwt-input hwt-content"
          onChange={this.props.handleInput}
          onScroll={this._handleScroll}
          value={this.props.value}
        />
      </div>
    );
  }
}