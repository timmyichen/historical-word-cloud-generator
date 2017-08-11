import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Modal, Button } from 'semantic-ui-react';

import NewsPicker from './NewsPicker';
import { parseDate, dateToFullString, isDateInvalid } from '../../helpers/helpers';

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
        };
        this.open = this.open.bind(this);
        this.close = this.close.bind(this);
        this.handleDateChange = this.handleDateChange.bind(this);
    }
    open() {
        this.setState({ open: true });
        console.log(this.refs.datePickerContainer);
    }
    close() {
        this.setState({ open: false });
    }
    handleDateChange(e) {
        let { year, month, day } = parseDate(e.target.value);
        
        this.setState({
            date: e.target.value,
            invalidDate: isDateInvalid(year, month, day),
            dateFull: dateToFullString(year, month, day),
            year, month, day,
        });
    }
    render() {
        const { open, year, month, day } = this.state;
        return (
            <Modal
                trigger={<Button>Load Historical Newspaper</Button>}
                open={open}
                size="tiny"
                onOpen={this.open}
                onClose={this.close}
                mountNode={this.props.cloudBody}
            >
                <Modal.Header>Pick a Date</Modal.Header>
                <Modal.Content>
                    <p>Please select a date.  The year must be in between 1836 and 1924 inclusive.</p>
                    
                    <input
                        type="date"
                        value={this.state.date}
                        onChange={this.handleDateChange}
                    />
                    <br/><br/>
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
                        mountOn={this.props.cloudBody2}
                        
                    />
                </Modal.Actions>
            </Modal>
        );
    }
}

DatePicker.propTypes = {
    
};

export default DatePicker;
