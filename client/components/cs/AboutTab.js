import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Header } from 'semantic-ui-react';

class AboutTab extends Component {
    render() {
        return (
            <div id="tab-about">
                <div className="left">
                    <Header as="h2">About</Header>
                    <p>
                        This is a project developed by Tim Chen at MongoDB, Inc. as part
                        of their Teacher Fellowship Program.
                    </p>
                    <p>
                        The application aims to create an educational tool for anyone looking
                        to explore American newspapers from the past.  On the surface this application
                        is only a word cloud generator, but users can also load up historical newspapers
                        from the years of 1836 to 1924, archived by the Library of Congress.
                    </p>
                </div>
                <div className="right">
                    <Header as="h2">Instructions</Header>
                    <Header as="h3">General</Header>
                    <p>
                        To generate a word cloud, simply enter or paste the text into the text box
                        and click on the big green "Generate Wordcloud" button.
                    </p>
                    <p>
                        If you would like to edit the stopwords (common English words that are removed
                        from counting), click on the gray "Edit Stopwords" button to the left.
                    </p>
                    <Header as="h3">Historical Newspapers</Header>
                    <p>
                        Click on "Load Historical Newspaper" and enter in a date between 1836 and
                        1924.  Follow the instructions and then choose the newspaper you want to load
                        (or all).
                    </p>
                    <p>
                        Once the newspaper is loaded, click on "Generate Wordcloud" and allow the
                        wordcloud to appear.
                    </p>
                    <p>
                        Once the wordcloud is visible, you can hover over words to see their frequency.
                        If a you want to exclude a word from the cloud, click on "Edit Stopwords" and add
                        the unwanted word to the top of the list.
                    </p>
                    <p>
                        Clicking on a newspaper will jump to the next occurrence of the word in the text.
                        You may click it multiple times.
                    </p>
                </div>
            </div>
        );
    }
}

AboutTab.propTypes = {
    
};

export default AboutTab;
