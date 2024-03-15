function getDaysInMonth(year, month, locale, dateNow){
    let date = new Date(year, month, 1)
    const daysObject = []
    while (date.getMonth() === month){
        const isCurrent = dateNow.month === month && dateNow.day === date.getDate()
        daysObject.push({
            day: date.toLocaleString(locale, {weekday:'short'}),
            month: date.toLocaleString(locale, {month: 'short'}),
            date: date.getDate(),
            current: isCurrent,
            monthIndex: date.getMonth()
        })
        date.setDate(date.getDate() + 1)
    }
    return [...addMissingDays(year, month), ...daysObject]
}

function addMissingDays(year, month){
    const firstDay = (new Date(year, month, 1)).toLocaleString('en', {weekday:'short'})
    const missingArray = [{},{},{},{},{},{}]
    switch (firstDay){
        case 'Sat':
            return missingArray.splice(0, missingArray.length - 1)
        case 'Fri':
            return missingArray.splice(0, missingArray.length - 2)
        case 'Tue':
            return missingArray.splice(0, missingArray.length - 5)
        case 'Wed':
            return missingArray.splice(0, missingArray.length - 4)
        case 'Thu':
            return missingArray.splice(0, missingArray.length - 3)
        case "Mon":
            return []
        default:
            return  missingArray
    }
}

export default getDaysInMonth