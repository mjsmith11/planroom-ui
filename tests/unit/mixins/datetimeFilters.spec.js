import { datetimeFilters } from '@/mixins/datetimeFilters'

describe('date filter', () => {
  it('returns blank on undefined', () => {
    const result = datetimeFilters.filters.date(undefined)
    expect(result).toBe('')
  })

  it('returns date as MM/DD/YYYY', () => {
    const result = datetimeFilters.filters.date('2018-04-08')
    expect(result).toBe('04/08/2018')
  })
})

describe('datetime filter', () => {
  it('returns blank on undefined', () => {
    const result = datetimeFilters.filters.datetime(undefined)
    expect(result).toBe('')
  })

  it('returns string with EST', () => {
    const result = datetimeFilters.filters.datetime('2018-03-10 08:00:00')
    expect(result).toBe('03/10/2018 08:00 AM EST')
  })

  it('returns string with EDT', () => {
    const result = datetimeFilters.filters.datetime('2018-03-11 16:00:00')
    expect(result).toBe('03/11/2018 04:00 PM EDT')
  })

  it('handles midnight eastern', () => {
    const result = datetimeFilters.filters.datetime('2018-03-10 00:00:00')
    expect(result).toBe('03/10/2018 12:00 AM EST')
  })

  it('handles noon eastern', () => {
    const result = datetimeFilters.filters.datetime('2018-03-10 12:00:00')
    expect(result).toBe('03/10/2018 12:00 PM EST')
  })

  it('handles December dates', () => {
    const result = datetimeFilters.filters.datetime('2018-12-10 08:00:00')
    expect(result).toBe('12/10/2018 08:00 AM EST')
  })

  it('handles January dates', () => {
    const result = datetimeFilters.filters.datetime('2018-01-10 08:00:00')
    expect(result).toBe('01/10/2018 08:00 AM EST')
  })
})

describe('datetimeCentral filter', () => {
  it('returns blank on undefined', () => {
    const result = datetimeFilters.filters.datetimeCentral(undefined)
    expect(result).toBe('')
  })

  it('returns string with CST', () => {
    const result = datetimeFilters.filters.datetimeCentral('2018-03-10 08:00:00')
    expect(result).toBe('03/10/2018 07:00 AM CST')
  })

  it('returns string with CDT', () => {
    const result = datetimeFilters.filters.datetimeCentral('2018-03-11 16:00:00')
    expect(result).toBe('03/11/2018 03:00 PM CDT')
  })

  it('changes date', () => {
    const result = datetimeFilters.filters.datetimeCentral('2018-03-09 00:30:00')
    expect(result).toBe('03/08/2018 11:30 PM CST')
  })

  it('handles noon central', () => {
    const result = datetimeFilters.filters.datetimeCentral('2018-03-10 13:00:00')
    expect(result).toBe('03/10/2018 12:00 PM CST')
  })

  it('handles midnight central', () => {
    const result = datetimeFilters.filters.datetimeCentral('2018-03-10 01:00:00')
    expect(result).toBe('03/09/2018 12:00 AM CST')
  })

  it('handles December dates', () => {
    const result = datetimeFilters.filters.datetimeCentral('2018-12-10 08:00:00')
    expect(result).toBe('12/10/2018 07:00 AM CST')
  })

  it('handles January dates', () => {
    const result = datetimeFilters.filters.datetimeCentral('2018-01-10 08:00:00')
    expect(result).toBe('01/10/2018 07:00 AM CST')
  })
})

describe('unixDatetime filter', () => {
  it('returns date string with minutes under 10', () => {
    const result = datetimeFilters.filters.unixDatetime(1541646000)
    expect(result).toBe('2018-11-7 22:00:00')
  })
  it('returns date string with minutes over 10', () => {
    const result = datetimeFilters.filters.unixDatetime(1541649000)
    expect(result).toBe('2018-11-7 22:50:00')
  })
})
