//Helper Functions

const returnDay = time => {
    return days[new Date(time * 1000).getDay()]
  }
  
  const kelvinToCelcius = temp => {
    return Math.ceil(temp - 273.15)
  }
  
  const capitalize = string => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  