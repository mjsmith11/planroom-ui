import moment from 'moment-timezone'
const helpers = {
  date (value) {
    var splits = value.split('-')
    var dd = splits[2]
    var mm = splits[1]
    var yyyy = splits[0]

    return mm + '/' + dd + '/' + yyyy
  },
  time (value) {
    var AMPM = 'AM'
    var pieces = value.split(':')
    var HH = pieces[0]
    var mm = pieces[1]
    var hh = ''
    if (HH === 0) {
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
  isDST (date) {
    // A free script from: www.mresoftware.com
    var yr = date.getFullYear()
    var dstStart = new Date('March 14, ' + yr + ' 02:00:00') // 2nd Sunday in March can't occur after the 14th
    var dstEnd = new Date('November 07, ' + yr + ' 02:00:00') // 1st Sunday in November can't occur after the 7th
    var day = dstStart.getDay() // day of week of 14th
    dstStart.setDate(14 - day) // Calculate 2nd Sunday in March of this year
    day = dstEnd.getDay() // day of the week of 7th
    dstEnd.setDate(7 - day) // Calculate first Sunday in November of this year
    if (date >= dstStart && date < dstEnd) { // does today fall inside of DST period?
      return true // if so then return true
    }
    return false // if not then return false
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
      var pieces = value.split(' ')

      var datePiece = pieces[0]
      var timePiece = pieces[1]

      var dateSplit = datePiece.split('-')
      var timeSplit = timePiece.split(':')
      var utc = Date.UTC(dateSplit[0], dateSplit[1], dateSplit[2], timeSplit[0], timeSplit[1], timeSplit[2])
      var d = new Date(utc)
      d.setHours(d.getHours() - 1)
      
      var mm = d.getMonth()
      var dd = d.getDate()
      if (mm < 10) {
        mm = '0' + mm
      }
      if (dd < 10) {
        dd = '0' + dd
      }
      var dateString = d.getFullYear() + '-' + mm + '-' + dd
      var hh = d.getUTCHours()
      var min = d.getMinutes()
      var ss = d.getSeconds()
      if (hh < 10) {
        hh = '0' + hh
      }
      if (min < 10) {
        min = '0' + min
      }
      if (ss < 10) {
        ss = '0' + ss
      }
      var timeString = hh + ':' + min + ':' + ss

      var datePart = helpers.date(dateString)
      var timePart = helpers.time(timeString)

      var datetime = datePart + ' ' + timePart
      var tz = helpers.isDST(new Date(datetime)) ? ' CDT' : ' CST'
      return datetime + tz
    }
  }
}
