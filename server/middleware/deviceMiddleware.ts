import { defineEventHandler, getHeader } from 'h3';

export default defineEventHandler((event) => {
  const userAgent = getHeader(event, 'user-agent') || '';

  // console.log('userAgrent',userAgent)
  
  // 判斷是否為移動設備
  const isMobile = /mobile|android|iphone|ipad|phone/i.test(userAgent);

  // console.log('是否為Mobile:',isMobile)
  
  // 將設備信息保存到 context 中
  event.context.isMobile = isMobile;
});