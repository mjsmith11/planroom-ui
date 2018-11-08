import { datetimeFilters } from '@/mixins/datetimeFilters'

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
    let result = datetimeFilters.filters.datetime('2018-03-11 16:00:00')
    expect(result).toBe('03/11/2018 04:00 PM EDT')
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
    let result = datetimeFilters.filters.datetimeCentral('2018-03-11 16:00:00')
    expect(result).toBe('03/11/2018 03:00 PM CDT')
  })

  it('changes date', () => {
    let result = datetimeFilters.filters.datetimeCentral('2018-03-09 00:30:00')
    expect(result).toBe('03/08/2018 11:30 PM CST')
  })
})

describe('unixDatetime filter', () => {
  it('returns date string with minutes under 10', () => {
    let result = datetimeFilters.filters.unixDatetime(1541646000)
    expect(result).toBe('2018-11-7 22:00:00')
  })
  it('returns date string with minutes over 10', () => {
    let result = datetimeFilters.filters.unixDatetime(1541649000)
    expect(result).toBe('2018-11-7 22:50:00')
  })
})
