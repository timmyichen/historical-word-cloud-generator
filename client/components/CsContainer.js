import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Tab } from 'semantic-ui-react';

import CountingTab from './cs/CountingTab';

class CsContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            stepping: false,
        };
        this.toggleStepping = this.toggleStepping.bind(this);
    }
    toggleStepping() {
        this.setState((prevState) => ({ stepping: !prevState.stepping }))
    }
    render() {
        const { stepping } = this.state;
        const tabs = [
            { menuItem: {key: 'counting', content: 'Counting Words', icon: "numbered list"},
                render: () => (
                    <CountingTab
                        stepping={stepping}
                        toggleStepping={this.toggleStepping}
                    />
                ) },
            { menuItem: {key: 'scrape', content: 'Web Scraping', icon: "barcode"},
                render: () => (<p>scrape</p>) },
            { menuItem: {key: 'database', content: 'Databases', icon: "database"},
                render: () => (<p>dbs</p>) },
        ]
        
        return (
            <div id="compsci-container">
                {<Tab panes={tabs} />}
            </div>
        );
    }
}

CsContainer.propTypes = {
    
};

export default CsContainer;
