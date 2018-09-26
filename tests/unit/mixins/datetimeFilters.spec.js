import { datetimeFilters } from '@/mixins/datetimeFilters'
import moment from 'moment-timezone'

describe('date filter', () => {
  it('returns blank on undefined', () => {
    let result = datetimeFilters.filters.date(undefined)
    expect(result).toBe('')
  })

  it('returns date as MM/DD/YYYY', () => {
    let result = datetimeFilters.filters.date('2018-04-08')
    expect(result).toBe('04/08/2018')
  })
})

describe('dateMoment filter', () => {
  it('returns blank on undefined', () => {
    let result = datetimeFilters.filters.dateMoment(undefined)
    expect(result).toBe('')
  })
  it('returns Eastern Time Object in DST', () => {
    let result = datetimeFilters.filters.dateMoment('2018-04-08')
    var expected = moment.parseZone('2018-04-08T00:00:00.000Z')
    expect(result.toString()).toBe(expected.toString())
  })
  it('returns Eastern Time Object not in DST', () => {
    let result = datetimeFilters.filters.dateMoment('2018-03-08')
    var expected = moment.parseZone('2018-03-08T00:00:00.000Z')
    expect(result.toString()).toBe(expected.toString())
  })
})

describe('datetime filter', () => {
  it('returns blank on undefined', () => {
    let result = datetimeFilters.filters.datetime(undefined)
    expect(result).toBe('')
  })

  it('returns string with EST', () => {
    let result = datetimeFilters.filters.datetime('2018-03-10 08:00:00')
    expect(result).toBe('03/10/2018 08:00 AM EST')
  })

  it('returns string with EDT', () => {
    let result = datetimeFilters.filters.datetime('2018-03-12 16:00:00')
    expect(result).toBe('03/12/2018 04:00 PM EDT')
  })
})

describe('datetimeCentral filter', () => {
  it('returns blank on undefined', () => {
    let result = datetimeFilters.filters.datetimeCentral(undefined)
    expect(result).toBe('')
  })

  it('returns string with CST', () => {
    let result = datetimeFilters.filters.datetimeCentral('2018-03-10 08:00:00')
    expect(result).toBe('03/10/2018 07:00 AM CST')
  })

  it('returns string with CDT', () => {
    let result = datetimeFilters.filters.datetimeCentral('2018-03-12 16:00:00')
    expect(result).toBe('03/12/2018 03:00 PM CDT')
  })

  it('changes date', () => {
    let result = datetimeFilters.filters.datetimeCentral('2018-03-09 00:30:00')
    expect(result).toBe('03/08/2018 11:30 PM CST')
  })
})
