import { apiCall, sendNotify } from "./lib/common.js";

const main = async () => {
  const stocks = await apiCall('https://openapi.twse.com.tw/v1/announcement/punish');

  const noticeList = stocks.map((stock) => {
    const {
      Code, Name, NumberOfAnnouncement, ReasonsOfDisposition, DispositionPeriod,DispositionMeasures, Detail,
      ...others
    } = stock
  
    return `${Name}, ${NumberOfAnnouncement}, ${DispositionPeriod}, ${ReasonsOfDisposition}, ${DispositionMeasures}`
  })

  const title='集中市場公布處置股票';
  const d = new Date();
  const noticeMessage = `${title} ${d.toLocaleString()}\n${noticeList.join("\n")}`;
  //console.log(noticeMessage)

  await sendNotify(noticeMessage);
}

main();