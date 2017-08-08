import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Header } from 'semantic-ui-react';


class DatabaseTab extends Component {
    render() {
        return (
            <div>
                <Header as="h2">Databases</Header>
                <p>
                    When you click on "Load Historical Newspaper" and request a date,
                    several things happen.  The flowchart to the right describes the process
                    that the website follows when you want to load news from a specific
                    date.  All that newspaper data needs to be stored somewhere - and that's
                    what a <strong>database</strong> is for.  Many sites and apps use
                    databases to store all kinds of data.
                    
                    For example, let's think about Facebook.  Facebook needs to keep track
                    of its millions of users!  It needs to keep track of their names, their
                    emails, what's on their wall, what comments are on each post, etc.  It's
                    a lot of data to keep track of, and they need to use a database to keep
                    track of it all.
                    
                    This site uses a document-based database called <a href="https://www.mongodb.com/">
                    MongoDB</a>
                </p>
            </div>
        );
    }
}

DatabaseTab.propTypes = {
    
};

export default DatabaseTab;
