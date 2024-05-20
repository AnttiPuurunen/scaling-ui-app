export function GetWeekDays(props) {
    let week = [];
    // Get the selected day passed as a props, or create a new Date object
    let today = props || new Date();

    for (let i=1; i <= 7; i++) {
        // Figure out the days of the week for the selected day, starting from Monday
        // First get the day (number) of the month, then get the day of the week and subtract
        // getDay() starts from zero (Sunday = 0, Monday = 1 etc...), so add i
        let day = today.getDate();

        if (today.getDay() === 0) {
            // Account for the day being a Sunday, subtract a week to start from the past week's Monday
            day = day - today.getDay() + (i - 7);
        }
        else {
            day = day - today.getDay() + i;
        }
        
        // day is in milliseconds, so make a Date object from it, make it into a Finnish date format string, remove the time from the end
        let dayAsDate = new Date(today.setDate(day)).toLocaleDateString("fi-FI").slice(0, 10);
        week.push(dayAsDate);
    }

    return week;
};

export function AddOrSubtractDays(date, days, operation) {
    const newDate = new Date(date);

    // Add or subtract days from the calendar week when pressing the navigation buttons
    // to show previous or next week
    if (operation === "+") {
        newDate.setDate(date.getDate() + days)
    } else if (operation === "-") {
        newDate.setDate(date.getDate() - days)
    }

    return newDate;
} 