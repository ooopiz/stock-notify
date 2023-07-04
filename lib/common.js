import got from 'got';

export const apiCall = async (url, opts={}) => {
  const response = await got(url, opts).json();
  return response;
}

export const sendNotify = async (message) => {
  if (!process.env.STOCKS_NOTIFY) {
    console.error('ENV not found: STOCKS_NOTIFY');
    process.exit(1);
  }

  const options = {
    method: 'POST',
    headers: { Authorization: `Bearer ${process.env.STOCKS_NOTIFY}` },
    form: {
       message: message,
       //notificationDisabled: true
    }
  }
  const sender = await apiCall('https://notify-api.line.me/api/notify', options);
  return sender;
}