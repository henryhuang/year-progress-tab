var calPercentage = function(a, b) {
    return `${parseInt((a / b).toFixed(2) * 100)}%`;
}

var calculateDay = function(date) {

    var hour = date.getHours();

    var ret;
    var calValue = function(date, totalValue, minuend) {
        const passedMinutes = (date.getHours() - minuend) * 60 + date.getMinutes();
        const totoalMinutes = totalValue * 60;
        return calPercentage(passedMinutes, totoalMinutes);
    };

    if (6 <= hour && hour < 12) {
        ret = {
            label: 'Morning',
            value: calValue(date, 6, 6),
        }
    } else if (12 <= hour && hour < 18) {
        ret = {
            label: 'Afternoon',
            value: calValue(date, 6, 12),
        }
    } else if (18 <= hour && hour < 22) {
        ret = {
            label: 'Evening',
            value: calValue(date, 4, 18),
        }
    } else {
        var hour = date.getHours();
        ret = {
            label: 'Night',
            value: calValue(date, 8, (hour < 24 && hour > 6) ? 22 : -2),
        }
    }

    return ret;

}

console.log(calculateDay(new Date(2018, 03, 22, 22, 59, 0)));

var calculate = function() {
    var date = new Date();

    var year = date.getFullYear();
    var firstDateOfYear = moment([year, 0, 1]);
    var lastDateOfYear = moment([year + 1, 0, 1]);
    var dayOfYear = moment(date).dayOfYear();
    var dayCountOfYear = lastDateOfYear.diff(firstDateOfYear, 'days');
    var yearProgress = calPercentage(dayOfYear, dayCountOfYear);
    var daysOfQuaters = [{
            count: dayCountOfYear === 365 ? 90 : 91,
            firstDateMoment: moment([year, 0, 1])
        },
        {
            count: 91,
            firstDateMoment: moment([year, 3, 1])
        },
        {
            count: 92,
            firstDateMoment: moment([year, 6, 1])
        },
        {
            count: 92,
            firstDateMoment: moment([year, 9, 1])
        }
    ];
    var dq = daysOfQuaters[moment(date).quarter() - 1];
    var daysRemOfQuarter = moment(date).diff(dq.firstDateMoment, 'days');
    var quarterProgress = calPercentage(daysRemOfQuarter, dq.count);
    var daysInMonth = moment(date).daysInMonth();
    var monthProgress = calPercentage((daysInMonth - moment().endOf('month').diff(moment(date), 'days')), daysInMonth);

    var dayProgress = calculateDay(date);

    document.getElementById('yearValue').innerHTML = yearProgress;
    document.getElementById('quarterValue').innerHTML = quarterProgress;
    document.getElementById('monthValue').innerHTML = monthProgress;

    document.getElementById('dayLabel').innerHTML = dayProgress.label;
    document.getElementById('dayValue').innerHTML = dayProgress.value;

}

setInterval((function() {
        calculate();
        return calculate;
    })(), 1 * 60 * 60 * 1000) // 1hour