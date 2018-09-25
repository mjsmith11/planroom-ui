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
      return moment.utc(value, 'YYYY-MM-DD HH:mm:ss').format('MM/DD/YYYY hh:mm A') + ' EST'
    },
    datetimeCentral (value) {
      if (value === undefined) {
        return ''
      }
      return moment.utc(value, 'YYYY-MM-DD HH:mm:ss').subtract({ 'hours': 1 }).format('MM/DD/YYYY hh:mm A') + ' CST'
    }
  }
}
