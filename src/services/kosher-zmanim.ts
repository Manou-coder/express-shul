import { getZmanimJson, Options } from 'kosher-zmanim'

// const options: Options = {
//   date: new Date(),
//   locationName: 'Jerusalem',
//   latitude: 31.771959,
//   longitude: 35.217018,
//   timeZoneId: 'Asia/Jerusalem',
//   elevation: 800,
//   complexZmanim: true,
// }

// const zmanim = getZmanimJson(options)
// console.log('zmanim: ', zmanim)

export const getZmaneiAyom = (options: Options) => {
  return getZmanimJson(options)
}
