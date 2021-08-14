var moment = require("moment-hijri");
moment().format("iYYYY/iM/iD");

export const hijryFormat = (date) => {
  return moment(date, "YYYY-MM-DD").format("iYYYY/iM/iD");
};
