import moment from 'moment';
import 'moment/locale/id';

moment.updateLocale('id', {
  relativeTime: {
    future: '%s',
    past: '%s',
    s: '1 dtk',
    m: '1 mnt',
    mm: '%d mnt',
    h: '1 jam',
    hh: '%d jam',
    d: '1 hr',
    dd: '%d hr',
    M: '1 bln',
    MM: '%d bln',
    y: '1 thn',
    yy: '%d thn',
  },
});

export const getItemUniqById = (item: any): string => `key-${item?.id}`;

export const generateImageUrlPath = (path: string = ''): string => `path/${path}`;

export const wait = (ms: number): Promise<any> => new Promise((resolve) => {
  setTimeout(resolve, ms);
});

export const isPhoneNumber = (phone: string): boolean => {
  const reg = /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/im;
  return reg.test(phone);
};

export const dateFormat = (
  date?: string | number | Date | null,
  format = 'dddd, D MMMM YYYY',
): string => {
  if (date) {
    return moment(date).format(format);
  }
  return '-';
};

export const getAge = (date: string | number | Date | undefined): number => {
  const birthDate = moment(date);
  const now = moment();
  return now.diff(birthDate, 'years');
}

export const generateDate = (
  date: string | number | Date = new Date(),
): string => moment(date).format();

export const getDaysArray = (start: Date, end: Date) => {
  const arr = [];
  const dt = new Date(start);
  while (dt <= end) {
    arr.push(new Date(dt));
    dt.setDate(dt.getDate() + 1);
  }
  return arr;
};

export const isDateInRange = (dateToCheck: Date | string, startDate: Date | string, endDate: Date | string): boolean => {
  // Parse the dates and normalize to start of the day
  const date = moment(dateToCheck).startOf('day');
  const start = moment(startDate).startOf('day');
  const end = moment(endDate).startOf('day');

  // Check if the date is in range (inclusive of start and end dates)
  return date.isSameOrAfter(start) && date.isSameOrBefore(end);
};

export const getTotalDays = (startDate: Date | string, endDate: Date | string): number => {
  const startMoment = moment(startDate).startOf('day');
  const endMoment = moment(endDate).startOf('day');
  const totalDays = endMoment.diff(startMoment, 'days');

  return totalDays + 1;
};

export const getDifferentMinutes = (startDate: Date | string, endDate: Date | string): number => {
  const startMoment = moment(startDate);
  const endMoment = moment(endDate);
  const totalMinutes = endMoment.diff(startMoment, 'minutes');

  return totalMinutes;
};

export const generateLocalDateFromHour = (
  currentDate: string,
  hour: number,
) => {
  const date = new Date(currentDate);
  const offsetHour = date.getTimezoneOffset() / 60;
  date.setHours(hour + offsetHour);
  date.setMinutes(0);
  date.setSeconds(0);
  date.setMilliseconds(0);
  return date;
};

export function isEmptyValue(val: any): boolean {
  return val === undefined || val === null || val === '';
}
