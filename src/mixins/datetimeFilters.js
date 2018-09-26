import moment from 'moment-timezone'
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
      return moment.utc(value, 'YYYY-MM-DD').format('MM/DD/YYYY')
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
      // var pieces = value.split(' ')
      var m = moment.utc(value, 'YYYY-MM-DD HH:mm:ss')
      var tz = moment(value, 'YYYY-MM-DD HH:mm:ss').tz('America/Indiana/Indianapolis').isDST() ? ' EDT' : ' EST'
      return m.format('MM/DD/YYYY hh:mm A') + tz
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
