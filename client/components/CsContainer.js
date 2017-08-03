import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Tab } from 'semantic-ui-react';

class CsContainer extends Component {
    render() {
        const tabs = [
            { menuItem: {key: 'counting', content: 'Counting Words', icon: "numbered list"},
                render: () => (<p>counting</p>) },
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
