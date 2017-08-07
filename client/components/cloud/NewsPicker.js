import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Modal, Button, Radio, Loader, Icon } from 'semantic-ui-react';

const axios = require('axios');

class NewsPicker extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            papers: [],
            selectedNews: -1,
            loading: false,
            emptyResults: false,
        };
        this.open = this.open.bind(this);
        this.close = this.close.bind(this);
        this.handleRadioChange = this.handleRadioChange.bind(this);
        this.toggleLoading = this.toggleLoading.bind(this);
        this.liftResults = this.liftResults.bind(this);
    }
    open() {
        this.setState({ loading: true, emptyResults: false }, () => {
            const {year, month, day} = this.props;
            console.log('attempting to connect to api');
            axios.get(`/api/news/${year}/${month}/${day}`).then((res) => {
                console.log('successfully received response from api');
                if (res.empty) {
                    this.setState({ emptyResults: true })
                } else {
                    this.setState({
                        loading: false,
                        open: true,
                        papers: res.data,
                    });
                    this.props.clearCloud();
                }
            });
        })
    }
    close() {
        this.setState({ open: false });
    }
    handleRadioChange(e, { value }) {
        this.setState({ selectedNews: parseInt(value) })
    }
    toggleLoading() {
        this.setState(prevState => ({loading: !prevState.loading}))
    }
    liftResults() {
        const { selectedNews, papers } = this.state;
        const result = {};
        if (selectedNews === 99) {
            result.newspaperName = 'Aggregated Newspapers'
            result.location = 'U.S.';
            result.contents = papers.reduce((total, paper) => {
                return total + paper.contents + '\n';
            })
        } else {
            const currentPaper = papers[selectedNews];
            result.newspaperName = currentPaper.newspaperName;
            result.location = currentPaper.location;
            result.contents = currentPaper.contents;
        }
        this.props.setText(result);
        this.props.closeParent();
        this.close();
    }
    render() {
        return (
            <Modal
                id="choose-papers"
                trigger={
                    <Button
                        positive
                        disabled={this.props.disabled || this.state.loading}
                    >
                        See Available Newspapers
                        {this.state.loading ? (<Loader size="tiny"  active inline />) : ''}
                    </Button>
                }
                open={this.state.open}
                onOpen={this.open}
                onClose={this.close}
            >
                <Modal.Header>Choose From Available Papers</Modal.Header>
                <Modal.Content>
                    {!this.state.emptyResults ?
                        (<p>These are the newspapers available on {this.props.date}.  Please select
                        the one you would like to load.  Please note that only the front page is loaded.
                        A link is provided to a digitized version of the news itself, hosted on
                        the <a href="http://chroniclingamerica.loc.gov" target="_blank">Library of
                        Congress&nbsp;<Icon name="external" size="small" /></a></p>)
                    :   (<p>There are no newpapers available on {this.props.date}.  Please go back and
                        select a different date.</p>)
                    }
                    {this.state.papers.map((paper, i) => (
                        <div key={`paper-${i}`}>
                            <Radio
                                label={`${i+1}: ${paper.newspaperName} (${paper.location})`}
                                name="article-group"
                                value={i}
                                checked={this.state.selectedNews === i}
                                onChange={this.handleRadioChange}
                            />
                            &nbsp;&nbsp;<a href={paper.url.slice(0,-4)} target="_blank">Link
                            &nbsp;<Icon name="external" size="small" /></a>
                        </div>
                    ))}
                    {this.state.papers.length === 0 ? '' : (
                        <div>
                            <Radio
                                label={`Select all ${this.state.papers.length} newspapers`}
                                name="article-group"
                                value="99"
                                checked={this.state.selectedNews === 99}
                                onChange={this.handleRadioChange}
                            />
                        </div>
                    )}
                </Modal.Content>
                <Modal.Actions>
                    <Button negative onClick={this.close}>{this.state.emptyResults ? 'Cancel' : 'Go Back'}</Button>
                    {this.state.emptyResults ? '' : (<Button positive onClick={this.liftResults}>Load front page</Button>)}
                </Modal.Actions>
            </Modal>
        );
    }
}

NewsPicker.propTypes = {
    
};

export default NewsPicker;
