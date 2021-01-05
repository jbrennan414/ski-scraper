
async function addDate(date, resort) {
    console.log("here is the resort bbbbb", resort)
    console.log("here is the date bbbbb", date)

  let resortID;

  switch (resort) {
    case "winterpark":
      
      resortID = 34;
      break;

    case "abasin":

      resortID = 38;
      break;

    case "taos":

      resortID = 31;
      break;
  
    case "bigsky":
      
      resortID = 4;
      break;

    case "brighton":

      resortID = 8;
      break;

    default:
      break;
  }
  
console.log("here is the resortID nnnn", resortID)
 

}

module.exports = addDate;