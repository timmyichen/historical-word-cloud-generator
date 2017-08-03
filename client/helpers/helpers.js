function isDateInvalid(year, month, day) {
    if (isNaN(year) || isNaN(month) || isNaN(day)) return true;
    
    year = parseFloat(year);
    month = parseFloat(month);
    day = parseFloat(day);
    return (!Number.isInteger(year)) ||
        (!Number.isInteger(month)) ||
        (!Number.isInteger(day)) ||
        (year < 1836) || (year > 1924) ||
        (month < 1) || (month > 12) ||
        (day < 1) || (day > 31);
}

function parseDate(dateString) {
    const split = dateString.split('-');
    try {
        return {
            year: split[0],
            month: split[1],
            day: split[2]
        };
    } catch(e) {
        console.error('error in parsing date: ' + e);
    }
}

function dateToFullString(year, month, day) {
    const monthStr = ['Jan', 'Feb', 'Mar', 'Apr',
                    'May', 'Jun', 'Jul', 'Aug',
                    'Sep', 'Oct', 'Nov', 'Dec'][parseInt(month, 10) - 1];
    let ordinal;
    const dayInt = parseInt(day, 10);
    if (dayInt % 10 === 1 && dayInt !== 11) {
        ordinal = 'st';
    } else if (dayInt % 10 === 2 && dayInt !== 12) {
        ordinal = 'nd';
    } else if (dayInt % 10 === 3 && dayInt !== 13) {
        ordinal = 'rd';
    } else {
        ordinal = 'th';
    }
    
    return `${monthStr} ${dayInt}${ordinal}, ${year}`;
}

module.exports = {
    isDateInvalid,
    parseDate,
    dateToFullString,
}