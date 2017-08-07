import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {  } from 'semantic-ui-react';

import SampleText from './counting/SampleText';
import PyCode from './counting/PyCode';

class CountingTab extends Component {
    render() {
        return (
            <div id="tab-count">
                <div id="step-instructions">
                    Instructions go here and stuff!
                </div>
                <SampleText
                    stepping={this.props.stepping}
                    toggleStepping={this.props.toggleStepping}
                />
                <PyCode />
            </div>
        );
    }
}

CountingTab.propTypes = {
    
};

export default CountingTab;
