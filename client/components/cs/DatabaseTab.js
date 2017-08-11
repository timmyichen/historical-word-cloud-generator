import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Header } from 'semantic-ui-react';

const Theme = require('syntux/style/atelier-sulphurpool.light');
const Json = require('syntux/json');

const sampleJsonText = 
`{
  "year": "1917",
  "month": "05",
  "day": "06",
  "uniqueID": "1917-05-06-sn83045462",
  "newspaperName": "Evening star",
  "location": "Washington, D.C.",
  "url": "http://chroniclingamerica.loc.gov/lcc...",
  contents: ".. (front page text goes here) .."
}

{
  "empty": true
}`;
class DatabaseTab extends Component {
    constructor(props) {
        super(props);
        this.determineJsonText = this.determineJsonText.bind(this);
    }
    determineJsonText() {
        if (!this.props.currentDocs) {
            return sampleJsonText;
        } else {
            let { docs, type } = this.props.currentDocs;
            if (type === 'single') {
                docs.contents = docs.contents.substring(0, 250);
            } else if (type === 'array') {
                docs = docs.map(doc => {
                    doc.contents = doc.contents.substring(0, 250);
                    return doc;
                });
            }
            return JSON.stringify(docs, null, 2);
        }
    }
    render() {
        return (
            <div id="tab-dbs">
                <Header as="h2">Databases</Header>
                <div id="db-container">
                    <div id="db-img-container">
                        <img
                            src="/images/database_flowchart.svg"
                            placeholder="flowchart of database process"
                        />
                    </div>
                    <div id="db-text">
                        <div id='db-paragraphs'>
                            <div className="left-line" />
                            <p>
                                When you click on "Load Historical Newspaper" and request a date,
                                several things happen.  The flowchart to the right describes the process
                                that the website follows when you want to load news from a specific
                                date.  All that newspaper data needs to be stored somewhere - and that's
                                what a <strong>database</strong> is for.  Many sites and apps use
                                databases to store all kinds of data.
                            </p>
                            <p>
                                For example, let's think about Facebook.  Facebook needs to keep track
                                of its millions of users!  It needs to keep track of their names, their
                                emails, what's on their wall, what comments are on each post, etc.  It's
                                a lot of data to keep track of, and they need to use a database to keep
                                track of it all.
                            </p>
                            <p> 
                                This site uses a database called <a href="https://www.mongodb.com/">
                                MongoDB</a>.  Normally when you think of a database, you might think of
                                rows and columns, like an Excel spreadsheet or Google Sheets.  MongoDB is a
                                document-based database, which is structured differently.
                            </p>
                            <p>
                                A "document" in a database like MongoDB is composed of keys (on the left,
                                before the colon) and values (on the right, after the colon).
                                To the right is an example of a document stored in this database.  When
                                you select a news article, the example to the right will change to reflect
                                the chosen news article(s).
                            </p>
                            <p>
                                Pulling data from a database is much, much faster than scraping data from
                                another site, so utilizing a database in this app is very important for
                                keeping users happy!
                            </p>
                        </div>
                    </div>
                    <div id="doc-example">
                        <Json>
                            {this.determineJsonText()}
                        </Json>
                    </div>
                </div>
            </div>
        );
    }
}

DatabaseTab.propTypes = {
    
};

export default DatabaseTab;
