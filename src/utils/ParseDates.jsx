export function FromFinnishFormatToISO(date) {
    let splitDate = date.split(".")

    let day = splitDate[0];

    if (day < 10) {
        day = "0" + day;
    }

    let month = splitDate[1];

    if (month < 10) {
        month = "0" + month;
    }

    let year = splitDate[2];

    // Concatenate the string into a basic ISO format
    let isoFormat = year + "-"+  month + "-" + day;
    
    return isoFormat;
}

export function FromFinnishFormatToTimestamp(date) {
    let splitDate = date.split(".")

    let day = splitDate[0];

    if (day < 10) {
        day = "0" + day;
    }

    let month = splitDate[1];

    if (month < 10) {
        month = "0" + month;
    }

    let year = splitDate[2];

    // Concatenate the string into a new Date object and get the timestamp
    let timestamp = new Date(year, month -1, day).getTime();
    
    return timestamp;
}

export function FromDateToFinnishFormat(date) {
    date = new Date(date);

    let day = date.getDate();
    
    if (day < 10) {
        day = "0" + day; 
    }

    let month = date.getMonth();
    month += 1;

    if (month < 10) {
        month = "0" + month;
    }

    let year = date.getFullYear();

    let finnishFormat = day + "." + month + "." + year;

    return finnishFormat;
}