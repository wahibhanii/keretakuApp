
function getTripTime(dateString,timeString ){
  let dateTimeString = `${dateString}T${timeString}:00.000Z`
  // console.log(dateTimeString)
  return new Date(dateTimeString)
}

module.exports = getTripTime

// console.log(getTripTime('2017-12-25','22:00'))