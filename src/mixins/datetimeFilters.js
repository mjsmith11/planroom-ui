const helpers = {
  date (value) {
    const splits = value.split('-')
    const dd = splits[2]
    const mm = splits[1]
    const yyyy = splits[0]

    return mm + '/' + dd + '/' + yyyy
  },
  time (value) {
    let AMPM = 'AM'
    const pieces = value.split(':')
    const HH = pieces[0]
    const mm = pieces[1]
    let hh = ''
    if (HH === '00') {
      hh = 12
    } else if (HH > 12) {
      hh = HH - 12
      if (hh < 10) {
        hh = '0' + hh
      }
      AMPM = 'PM'
    } else {
      if (HH === '12') {
        AMPM = 'PM'
      }
      hh = HH
    }
    return hh + ':' + mm + ' ' + AMPM
  },
  isDST (date) {
    // A free script from: www.mresoftware.com
    const yr = date.getFullYear()
    const dstStart = new Date('March 14, ' + yr + ' 02:00:00') // 2nd Sunday in March can't occur after the 14th
    const dstEnd = new Date('November 07, ' + yr + ' 02:00:00') // 1st Sunday in November can't occur after the 7th
    let day = dstStart.getDay() // day of week of 14th
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
     * @param { string } value datetime formatted with YYYY-MM-DD HH:mm:ss (24 hour Eastern time)
     * @returns { string } formatted date time MM/DD/YYYY hh:mm A (12 hour time) with EST or EDT appended appropriately
     */
    datetime (value) {
      if (value === undefined || value === '') {
        return ''
      }
      const pieces = value.split(' ')
      const datePart = helpers.date(pieces[0])
      const timePart = helpers.time(pieces[1])
      const datetime = datePart + ' ' + timePart
      const tz = helpers.isDST(new Date(datetime)) ? ' EDT' : ' EST'
      return datetime + tz
    },
    /**
     *
     * @param { number } value unix timestamp
     * @returns { string } formatted date time YYYY-MM-DD HH:mm:ss (24 hour Eastern time)
     */
    unixDatetime (value) {
      if (value === undefined) {
        return ''
      }

      const date = new Date(value * 1000)
      let minutes = date.getMinutes()
      if (minutes < 10) {
        minutes = '0' + minutes
      }
      return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() + ' ' + date.getHours() + ':' + minutes + ':00'
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
      const pieces = value.split(' ')

      const datePiece = pieces[0]
      const timePiece = pieces[1]

      const dateSplit = datePiece.split('-')
      const timeSplit = timePiece.split(':')
      const utc = Date.UTC(dateSplit[0], dateSplit[1] - 1, dateSplit[2], timeSplit[0], timeSplit[1], timeSplit[2]) // months are 0 based

      const d = new Date(utc)
      d.setHours(d.getHours() - 1)

      let mm = d.getMonth() + 1 // months are zero based
      let dd = d.getDate()
      if (mm < 10) {
        mm = '0' + mm
      }
      if (dd < 10) {
        dd = '0' + dd
      }
      const dateString = d.getFullYear() + '-' + mm + '-' + dd
      let hh = d.getUTCHours()
      let min = d.getMinutes()
      let ss = d.getSeconds()
      if (hh < 10) {
        hh = '0' + hh
      }
      if (min < 10) {
        min = '0' + min
      }
      if (ss < 10) {
        ss = '0' + ss
      }
      const timeString = hh + ':' + min + ':' + ss

      const datePart = helpers.date(dateString)
      const timePart = helpers.time(timeString)

      const datetime = datePart + ' ' + timePart
      const tz = helpers.isDST(new Date(datetime)) ? ' CDT' : ' CST'
      return datetime + tz
    }
  }
}
