#!/usr/bin/env node

import { apiCall, sendNotify } from "./lib/common.js";

const main = async () => {
  const stocks = await apiCall('https://openapi.twse.com.tw/v1/announcement/notetrans');

  const noticeList = stocks.map((stock) => {
    const {
      Code, Name, RecentlyMetAttentionSecuritiesCriteria,
      ...others
    } = stock
  
    return `${Name}, ${RecentlyMetAttentionSecuritiesCriteria}`
  })

  const title='集中市場公布注意累計次數異常資訊';
  const d = new Date();
  const noticeMessage = `${title} ${d.toLocaleString()}\n${noticeList.join("\n")}`;
  // console.log(noticeMessage)

  await sendNotify(noticeMessage);
}

main();
