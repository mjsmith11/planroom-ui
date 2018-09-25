import moment from 'moment'
export const datetimeFilters = {
  filters: {
    date (value) {
      if (value === undefined) {
        return ''
      }
      return moment.utc(value, 'YYYY-MM-DD').format('MM/DD/YYYY')
    },
    dateObj (value) {
      if (value === undefined) {
        return ''
      }
      return moment.utc(value, 'YYYY-MM-DD').toDate()
    },
    datetime (value) {
      if (value === undefined) {
        return ''
      }
      var m = moment(value, 'YYYY-MM-DD HH:mm:ss')
      var tz = m.isDST() ? ' EDT' : ' EST'
      return m.format('MM/DD/YYYY hh:mm A') + tz
    },
    datetimeCentral (value) {
      if (value === undefined) {
        return ''
      }
      var m = moment(value, 'YYYY-MM-DD HH:mm:ss').subtract({ 'hours': 1 })
      var tz = m.isDST() ? ' CDT' : ' CST'
      return m.format('MM/DD/YYYY hh:mm A') + tz
    }
  }
}
