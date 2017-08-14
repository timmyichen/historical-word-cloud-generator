import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Modal, Button } from 'semantic-ui-react';

import NewsPicker from './NewsPicker';
import { parseDate, dateToFullString, isDateInvalid } from '../../helpers/helpers';

const sampleDates = [
    { date: '1865-04-15', label: 'Day After Lincoln was Assassinated' },
    { date: '1917-05-07', label: 'Day After US Joins World War I' },
    { date: '1918-11-12', label: 'Day After World War I ends' },
    { date: '1924-02-04', label: 'Day After Woodrow Wilson Dies' },
];

class DatePicker extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            open: false,
            date: '',
            invalidDate: true,
            dateFull: 'n/a',
            year: '0000',
            month: '00',
            day: '00',
            showSuggestions: false,
        };
        this.open = this.open.bind(this);
        this.close = this.close.bind(this);
        this.handleDateChange = this.handleDateChange.bind(this);
        this.toggleSuggestions = this.toggleSuggestions.bind(this);
        this.setDate = this.setDate.bind(this);
    }
    open() {
        this.setState({ open: true });
    }
    close() {
        this.setState({ open: false });
    }
    handleDateChange(e) {
        const { year, month, day } = parseDate(e.target.value);
        
        this.setState({
            date: e.target.value,
            invalidDate: isDateInvalid(year, month, day),
            dateFull: dateToFullString(year, month, day),
            year, month, day,
        });
    }
    toggleSuggestions() {
        this.setState((prevState) => ({ showSuggestions: !prevState.showSuggestions }));
    }
    setDate(date) {
        const { year, month, day } = parseDate(date);
        
        this.setState({
            date, 
            invalidDate: false,
            dateFull: dateToFullString(year, month, day),
            year, month, day,
        });
    }
    render() {
        const { open, year, month, day, showSuggestions } = this.state;
        return (
            <Modal
            
                trigger={<Button>Load Historical Newspaper</Button>}
                open={open}
                size="tiny"
                onOpen={this.open}
                onClose={this.close}
                mountNode={this.props.cloudBodyDate}
            >
                <Modal.Header>Pick a Date</Modal.Header>
                <Modal.Content>
                    <p>Please select a date.  The year must be in between 1836 and 1924 inclusive.</p>
                    
                    <div id="date-inputs-all">
                        <div id="date-input">
                            <input
                                type="date"
                                value={this.state.date}
                                onChange={this.handleDateChange}
                            />
                        </div>
                        <div id="suggested-dates">
                            {!showSuggestions ? 
                                <a className="pointer-hover" onClick={this.toggleSuggestions}>
                                    Not sure what to enter?  Click here for some ideas.
                                </a> :
                                <ul>
                                    {sampleDates.map((date, i) => (
                                        <li key={`sampledate${i}`}>
                                            <a
                                                onClick={() => { this.setDate(date.date) }}
                                                className="pointer-hover"
                                            >
                                                {date.date}: {date.label}
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            }
                        </div>
                    </div>
                    <p>Please be patient as the data loads.  If you are searching for a date that
                    is not in our database, it may take up to 30 seconds to scrape this data from
                    the source.  If it takes longer than 30 seconds to load, refresh the page and
                    try again.</p>
                </Modal.Content>
                <Modal.Actions>
                    <Button negative onClick={this.close}>Cancel</Button>
                    <NewsPicker
                        disabled={this.state.invalidDate}
                        year={year}
                        month={month}
                        day={day}
                        setText={this.props.setText}
                        setDocs={this.props.setDocs}
                        closeParent={this.close}
                        openParent={this.open}
                        date={this.state.dateFull}
                        clearCloud={this.props.clearCloud}
                        mountOn={this.props.cloudBodyNews}
                        
                    />
                </Modal.Actions>
            </Modal>
        );
    }
}

DatePicker.propTypes = {
    
};

export default DatePicker;
