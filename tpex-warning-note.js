#!/usr/bin/env node

import { apiCall, sendNotify } from "./lib/common.js";

const main = async () => {
  const stocks = await apiCall('https://www.tpex.org.tw/openapi/v1/tpex_trading_warning_note');

  const noticeList = stocks.map((stock) => {
    const {
      SecuritiesCompanyCode, CompanyName, AccumulationSituation,
      ...others
    } = stock
  
    return `${CompanyName}, ${AccumulationSituation}`
  })

  const title='上櫃公布注意累計次數異常資訊';
  const d = new Date();
  const noticeMessage = `${title} ${d.toLocaleString()}\n${noticeList.join("\n")}`;
  // console.log(noticeMessage)

  await sendNotify(noticeMessage);
}

main();
