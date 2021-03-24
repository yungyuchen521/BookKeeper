// =================== transaction ===================

export function getCategory(categories, categoryID) {
    return categories.find( cat => cat.id === categoryID);
}

export function compareTransactions(a, b, sortBy, ascending) {
    switch (sortBy) {
        case "amount":
            if (ascending) return parseInt(a.amount) - parseInt(b.amount);
            else return parseInt(b.amount) - parseInt(a.amount);
        case "date":
            if (ascending) return compareDate(a.date, b.date);
            else return compareDate(b.date, a.date);
        case "dateAdded":
            if (ascending) return compareDate(a.dateAdded, b.dateAdded);
            else return compareDate(b.dateAdded, a.dateAdded);
        default:
            break;
    }
}

export function validTransaction(transaction) {
    if (!validDate(transaction.date.year, transaction.date.month, transaction.date.day)) {
        alert("The input date is invalid.");
        return false;
    }

    else if (!transaction.categoryID) {
        alert("Please choose a category.");
        return false;
    }

    else if (parseInt(transaction.amount) <= 0) {
        alert("The amount must be greater than 0.");
        return false;
    }
    
    return true;
}

// =================== date ===================

export function compareDate(date1, date2) {
    return dateToString(date1) - dateToString(date2);
}

function dateToString(date) {
    var year = date.year.toString();
    var month = date.month.toString();
    var day = date.day.toString();

    while (year.length < 4) year = "0".concat(year);
    if (month.length < 2) month = "0".concat(month);
    if (day.length < 2) day = "0".concat(day);

    return year.concat(month).concat(day);
}

export function validDate(year, month, day) {
    if (!year || !month || !day) return false;

    year = parseInt(year);
    month = parseInt(month);
    day = parseInt(day);

    if (year < 0 || month <= 0 || month > 12 || day <= 0) return false;

    switch (month) {
        case 1:
        case 3:
        case 5:
        case 7:
        case 8:
        case 10:
        case 12:
            if (day > 31) return false;
            break;
        case 4:
        case 6:
        case 9: 
        case 11:
            if (day > 30) return false;
            break;
        case 2:
            if (day > 28) {
                if (!isLeapYear(year)) return false;
                return day === 29;
            }
            break;
        default:
            return true;
    }

    return true;
}

function isLeapYear(year) {
    if (year % 400 === 0) return true;
    if (year % 4 === 0 && year % 100 !== 0) return true;

    return false;
}

// =================== display ===================

export function getColor(categories, categoryID) {
    const color = categories.find(cat => cat.id === categoryID).color;

    return color ? color : "black";
};

export function summary(str, len = 30) {
    return (str.length < len) ? str : str.substring(0, len).concat("...");
}

export function capitalize(str) {
    return str[0].toUpperCase() + str.slice(1);
}

export function setOpacity(toTransaparent, opacity = 0.5) {
    return (toTransaparent ? opacity : 1);
}

// =================== others ===================

export function getNextID(arr) {
    const len = arr.length;
    if (len === 0) return "0";
    else {
        var nextID = parseInt(arr[len-1].id);
        nextID++;

        return nextID.toString();
    }
}