var calculate = function () {
  var date = new Date();

  var year = date.getFullYear();
  var firstDateOfYear = moment([year, 0, 1]);
  var lastDateOfYear = moment([year + 1, 0, 1]);
  var dayOfYear = moment(date).dayOfYear();
  var dayCountOfYear = lastDateOfYear.diff(firstDateOfYear, 'days');
  var yearProgress = `${(parseFloat(dayOfYear / dayCountOfYear).toFixed(2)) * 100}%`;
  var daysOfQuaters = [
    {
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
  var quarterProgress = `${(parseFloat(daysRemOfQuarter / dq.count).toFixed(2)) * 100}%`;
  var daysInMonth = moment(date).daysInMonth();
  var monthProgress = `${(parseFloat((daysInMonth - moment().endOf('month').diff(moment(date), 'days')) / daysInMonth).toFixed(2)) * 100}%`;
  var dayProgress = `${(parseFloat(date.getHours() * 60 + date.getMinutes()) / (1 * 60 * 24)).toFixed(2) * 100}%`;

  console.log(yearProgress);
  console.log(quarterProgress);
  console.log(monthProgress);
  document.getElementById('yearValue').innerHTML = yearProgress;
  document.getElementById('quarterValue').innerHTML = quarterProgress;
  document.getElementById('monthValue').innerHTML = monthProgress;
  document.getElementById('dayValue').innerHTML = dayProgress;

}

setInterval((function() {
  calculate();
  return calculate;
})(), 1 * 60 * 60 * 1000) // 1hour
