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
    }
    close() {
        this.setState({ open: false });
    }
    handleDateChange(e) {
        let { year, month, day } = parseDate(e.target.value);
        if (year > 1924) year = 1924;
        if (year < 1836) year = 1836;
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
            >
                <Modal.Header>Pick a Date</Modal.Header>
                <Modal.Content>
                    <p>Please select a date.  The year must be in between 1836 and 1924 inclusive.</p>
                    
                    <input
                        type="date"
                        value={this.state.date}
                        onChange={this.handleDateChange}
                    />
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
                        date={this.state.dateFull}
                        clearCloud={this.props.clearCloud}
                    />
                </Modal.Actions>
            </Modal>
        );
    }
}

DatePicker.propTypes = {
    
};

export default DatePicker;
