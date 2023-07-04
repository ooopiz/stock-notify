import { apiCall } from "./lib/common.js";

const main = async () => {
  if (!process.env.STOCKS_NOTIFY) {
    console.error('ENV not found: STOCKS_NOTIFY');
    process.exit(1);
  }


  const stocks = await apiCall('https://openapi.twse.com.tw/v1/announcement/punish');

  const noticeList = stocks.map((stock) => {
    const {
      Code,
      Name,
      NumberOfAnnouncement,
      ReasonsOfDisposition,
      DispositionPeriod,DispositionMeasures,
      Detail,
      ...others
    } = stock
  
    return `${Name}, ${NumberOfAnnouncement}, ${DispositionPeriod}, ${ReasonsOfDisposition}, ${DispositionMeasures}`
  })

  const title='上市-處置';
  const d = new Date();
  const noticeMessage = `${title} ${d.toLocaleString()}\n${noticeList.join("\n")}`;
  //console.log(noticeMessage)

  const options = {
    method: 'POST',
    headers: { Authorization: `Bearer ${process.env.STOCKS_NOTIFY}` },
    form: {
       message: noticeMessage,
       //notificationDisabled: true
    }
  }
  const sender = await apiCall('https://notify-api.line.me/api/notify', options);
  //console.log(sender)
}

main();