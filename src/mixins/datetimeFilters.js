import moment from 'moment-timezone'
const helpers = {
  date(value) {
    var splits = value.split('-')
    var dd = splits[2]
    var mm = splits[1]
    var yyyy = splits[0]

    return mm + '/' + dd + '/' + yyyy
  },
  time(value) {
    var AMPM = 'AM'
    var pieces = value.split(':')
    var HH = pieces[0]
    var mm = pieces[1]
    var hh = ''
    if (HH == 0) {
      hh = 12
    } else if (HH > 12) {
      hh = HH - 12
      if (hh < 10) {
        hh = '0' + hh
      }
      AMPM = 'PM'
    } else {
      hh = HH
    }
    return hh + ':' + mm + ' ' + AMPM
  },
  isDST(date) {
      // A free script from: www.mresoftware.com
      var yr = date.getFullYear();
      var dst_start = new Date("March 14, " + yr + " 02:00:00"); // 2nd Sunday in March can't occur after the 14th 
      var dst_end = new Date("November 07, " + yr + " 02:00:00"); // 1st Sunday in November can't occur after the 7th
      var day = dst_start.getDay(); // day of week of 14th
      dst_start.setDate(14 - day); // Calculate 2nd Sunday in March of this year
      day = dst_end.getDay(); // day of the week of 7th
      dst_end.setDate(7 - day); // Calculate first Sunday in November of this year
      if (date >= dst_start && date < dst_end) { //does today fall inside of DST period?
        return true; //if so then return true
      }
      return false; //if not then return false
  }
}
export const datetimeFilters = {
  filters: {
    /**
     *
     * @param { string } value date representation as YYYY-MM-DD
     * @returns { string } date formatted as MM/DD/YYYY
     */
    date (value) {
      if (value === undefined) {
        return ''
      }

      return helpers.date(value)

    },
    /**
     *
     * @param { string } value date represented as YYYY-MM-DD
     * @returns { object } moment with Indianapolis timezone. No timezone adjustments to the date itself are made
     */
    dateMoment (value) {
      if (value === undefined) {
        return ''
      }
      return moment.utc(value)
    },
    /**
     *
     * @param { string } value datetime formatted with YYYY-MM-DD HH:mm:ss (24 hour Eastern time)
     * @returns { string } formatted date time MM/DD/YYYY hh:mm A (12 hour time) with EST or EDT appended appropriately
     */
    datetime (value) {
      if (value === undefined) {
        return ''
      }
      var pieces = value.split(' ')
      var datePart = helpers.date(pieces[0])
      var timePart = helpers.time(pieces[1])
      var datetime = datePart + ' ' + timePart
      var tz = helpers.isDST(new Date(datetime)) ? ' EDT' : ' EST'
      return datetime + tz
      //var m = moment.utc(value, 'YYYY-MM-DD HH:mm:ss')
      //var tz = moment(value, 'YYYY-MM-DD HH:mm:ss').tz('America/Indiana/Indianapolis').isDST() ? ' EDT' : ' EST'
      //return m.format('MM/DD/YYYY hh:mm A') + tz
    },
    /**
     *
     * @param { string } value datetime formatted with YYYY-MM-DD HH:mm:ss (24 hour Eastern time)
     * @returns { string } formatted date time MM/DD/YYYY hh:mm A (12 hour time adjusted by 1 hour) with CST or CDT appended appropriately
     */
    datetimeCentral (value) {
      if (value === undefined) {
        return ''
      }
      var m = moment.utc(value, 'YYYY-MM-DD HH:mm:ss').subtract({ 'hours': 1 })
      var tz = moment(value, 'YYYY-MM-DD HH:mm:ss').subtract({ 'hours': 1 }).tz('America/Chicago').isDST() ? ' CDT' : ' CST'
      return m.format('MM/DD/YYYY hh:mm A') + tz
    }
  }
}
