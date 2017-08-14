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
            statusResults: [],
        };
        this.open = this.open.bind(this);
        this.close = this.close.bind(this);
        this.handleRadioChange = this.handleRadioChange.bind(this);
        this.toggleLoading = this.toggleLoading.bind(this);
        this.liftResults = this.liftResults.bind(this);
        this.renderPaperChoices = this.renderPaperChoices.bind(this);
    }
    open() {
        const timeoutID = setTimeout(() => {
            if (this.state.loading) alert("Loading for over 30 seconds - this should not happen. Please refresh your page.");
        }, 30000);
        this.setState({ loading: true, emptyResults: false, papers: [] }, () => {
            const {year, month, day} = this.props;
            console.log('attempting to connect to api');
            axios.get(`/api/news/${year}/${month}/${day}`).then((res) => {
                console.log('successfully received response from api');
                if (res.data.empty) {
                    this.setState({ 
                        loading: false,
                        open: true,
                        emptyResults: true,
                    })
                } else {
                    this.setState({
                        loading: false,
                        open: true,
                        papers: res.data,
                    });
                    this.props.clearCloud();
                }
                clearTimeout(timeoutID);
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
        if (!this.state.emptyResults) {
            this.props.setDocs({ papers, selectedNews });
        } else {
            this.props.setDocs({ papers: { empty: true }, selectedNews: -1 });
        }
        this.props.closeParent();
        this.close();
    }
    renderPaperChoices() {
        const { selectedNews } = this.state;
        const papers = this.state.papers || [];
        if (papers.length === 0) return '';
        const paperArray = [];
        
        papers.forEach((paper, i) => {
            paperArray.push(
                <div key={`paper-${i}`}>
                    <Radio
                        label={`${i+1}: ${paper.newspaperName} (${paper.location})`}
                        name="article-group"
                        value={i}
                        checked={selectedNews === i}
                        onChange={this.handleRadioChange}
                    />
                    &nbsp;&nbsp;<a href={paper.url.slice(0,-4)} target="_blank">Link
                    &nbsp;<Icon name="external" size="small" /></a>
                </div>
            )
        });
        return paperArray;
        
    }
    render() {
        const { loading, open, emptyResults, selectedNews } = this.state
        const papers = this.state.papers || [];
        return (
            <Modal
                id="choose-papers"
                ref="test"
                trigger={
                    <Button
                        positive
                        disabled={this.props.disabled || loading || (loading && open)}
                    >
                        See Available Newspapers
                        {loading ? (<Loader size="tiny"  active inline />) : ''}
                    </Button>
                }
                open={open}
                onOpen={this.open}
                onClose={this.close}
                mountNode={this.props.mountOn}
            >
                <Modal.Header>Choose From Available Papers</Modal.Header>
                <Modal.Content scrolling>
                    {!emptyResults ?
                        (<p>These are the newspapers available on {this.props.date}.  Please select
                        the one you would like to load.  Please note that only the front page is loaded.
                        A link is provided to a digitized version of the news itself, hosted on
                        the <a href="http://chroniclingamerica.loc.gov" target="_blank">Library of
                        Congress&nbsp;<Icon name="external" size="small" /></a></p>)
                    :   (<p>There are no newpapers available on {this.props.date}.  Please go back and
                        select a different date.</p>)
                    }
                    {this.renderPaperChoices()}
                    {papers.length === 0 ? '' : (
                        <div>
                            <Radio
                                label={`Select all ${papers.length} newspapers`}
                                name="article-group"
                                value="99"
                                checked={selectedNews === 99}
                                onChange={this.handleRadioChange}
                            />
                        </div>
                    )}
                </Modal.Content>
                <Modal.Actions>
                    <Button negative onClick={this.close}>{emptyResults ? 'Cancel' : 'Go Back'}</Button>
                    {emptyResults ? '' : (<Button positive onClick={this.liftResults}>Load front page</Button>)}
                </Modal.Actions>
            </Modal>
        );
    }
}

NewsPicker.propTypes = {
    
};

export default NewsPicker;
