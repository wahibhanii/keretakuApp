function convertTime(date){
  var result = date.toISOString().slice(11,16)
  return result
}

module.exports = convertTime;
