import { apiCall, sendNotify } from "./lib/common.js";

const main = async () => {
  if (!process.env.STOCKS_NOTIFY) {
    console.error('ENV not found: STOCKS_NOTIFY');
    process.exit(1);
  }


  const stocks = await apiCall('https://openapi.twse.com.tw/v1/announcement/punish');

  const noticeList = stocks.map((stock) => {
    const {
      Code, Name, NumberOfAnnouncement, ReasonsOfDisposition, DispositionPeriod,DispositionMeasures, Detail,
      ...others
    } = stock
  
    return `${Name}, ${NumberOfAnnouncement}, ${DispositionPeriod}, ${ReasonsOfDisposition}, ${DispositionMeasures}`
  })

  const title='上市-處置';
  const d = new Date();
  const noticeMessage = `${title} ${d.toLocaleString()}\n${noticeList.join("\n")}`;
  //console.log(noticeMessage)

  await sendNotify(noticeMessage);
}

main();