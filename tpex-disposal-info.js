import { apiCall, sendNotify } from "./lib/common.js";

const main = async () => {
  const stocks = await apiCall('https://www.tpex.org.tw/openapi/v1/tpex_disposal_information');

  const noticeList = stocks.map((stock) => {
    const {
      SecuritiesCompanyCode, CompanyName, DispositionPeriod, DispositionReasons,
      ...others
    } = stock
  
    return `${CompanyName}, ${DispositionPeriod}, ${DispositionReasons}`
  })

  const title='上櫃處置有價證券資訊';
  const d = new Date();
  const noticeMessage = `${title} ${d.toLocaleString()}\n${noticeList.join("\n")}`;
  // console.log(noticeMessage)

  await sendNotify(noticeMessage);
}

main();