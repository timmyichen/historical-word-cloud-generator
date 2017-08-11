import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Tab } from 'semantic-ui-react';

import CountingTab from './cs/CountingTab';
import DatabaseTab from './cs/DatabaseTab';
import AboutTab from './cs/AboutTab';
import ScrapingTab from './cs/ScrapingTab';

class CsContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            stepping: false,
        };
        this.toggleStepping = this.toggleStepping.bind(this);
    }
    toggleStepping() {
        this.setState((prevState) => ({ stepping: !prevState.stepping }));
    }
    render() {
        const { stepping } = this.state;
        const tabs = [
            { menuItem: {key: 'about', content: 'About', icon: "info circle"},
                render: () => (
                    <Tab.Pane attached={false}>
                        <AboutTab />
                    </Tab.Pane>
                ) },
            { menuItem: {key: 'counting', content: 'Counting Words', icon: "numbered list"},
                render: () => (
                    <Tab.Pane attached={false}>
                        <CountingTab
                            stepping={stepping}
                            toggleStepping={this.toggleStepping}
                        />
                    </Tab.Pane>
                ) },
            { menuItem: {key: 'scrape', content: 'Web Scraping', icon: "barcode"},
                render: () => (
                    <Tab.Pane attached={false}>
                        <ScrapingTab />
                    </Tab.Pane>
                ) },
            { menuItem: {key: 'database', content: 'Databases', icon: "database"},
                render: () => (
                    <Tab.Pane attached={false}>
                        <DatabaseTab
                            currentDocs={this.props.currentDocs}
                        />
                    </Tab.Pane>
                ) },
        ];
        
        return (
            <div id="compsci-container">
                <Tab
                    menu={{
                        color: "grey",
                        inverted: true,
                        pointing: true,
                    }}
                    panes={tabs}
                />
            </div>
        );
    }
}

CsContainer.propTypes = {
    currentDocs: PropTypes.object,
};

export default CsContainer;
