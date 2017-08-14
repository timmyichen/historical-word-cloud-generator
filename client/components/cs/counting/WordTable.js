import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Table, Checkbox, Header } from 'semantic-ui-react';

class WordTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            limitWords: false,
        };
        this.toggleLimit = this.toggleLimit.bind(this);
    }
    componentDidMount() {
        this.props.sendRef('table', this.refs.table);
    }
    toggleLimit() {
        this.setState((prevState) => ({ limitWords: !prevState.limitWords }));
    }
    render() {
        const { limitWords } = this.state;
        let { wordFreq } = this.props;
        wordFreq = wordFreq.sort((a,b) => {
            if (a.count < b.count) return 1;
            if (a.count === b.count) return 0;
            return -1;
        });
        if (limitWords) {
            wordFreq = wordFreq.slice(0,10);
        }
        return (
            <div id="word-table" ref="table">
                <Header as="h3">Word Counting Table</Header>
                <Table celled>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>
                                Word<br/>
                                <Checkbox
                                    checked={limitWords}
                                    onClick={this.toggleLimit}
                                    label="Show top 10 words only"
                                />
                            </Table.HeaderCell>
                            <Table.HeaderCell>Count</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                    {wordFreq.map((wordObj,i) => 
                        <Table.Row key={`table-${i}`}>
                            <Table.Cell>{wordObj.word}</Table.Cell>
                            <Table.Cell>{wordObj.count}</Table.Cell>
                        </Table.Row>
                    )}
                    </Table.Body>
                </Table>
            </div>
        );
    }
}

WordTable.propTypes = {
    wordFreq: PropTypes.array.isRequired,
};

export default WordTable;
