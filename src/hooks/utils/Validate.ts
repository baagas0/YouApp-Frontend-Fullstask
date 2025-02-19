export default class Validate {
  static expiryTimestamp(expiryTimestamp: number) {
    const isValid = (new Date(expiryTimestamp)).getTime() > 0;
    if (!isValid) {
      // console.warn('Invalid expiryTimestamp settings', expiryTimestamp); // eslint-disable-line
    }
    return isValid;
  }

  static onExpire(onExpire?: () => void | undefined) {
    const isValid = onExpire && typeof onExpire === 'function';
    if (onExpire && !isValid) {
      // console.warn('Invalid onExpire settings function', onExpire); // eslint-disable-line
    }
    return isValid;
  }
}
