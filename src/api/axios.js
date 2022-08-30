import axios from 'axios'

export default axios.create({
  // baseURL: 'https://5co7shqbsf.execute-api.ap-northeast-2.amazonaws.com/production/' // 변경 전
  baseURL: 'https://n38lcff1wk.execute-api.ap-northeast-2.amazonaws.com' // 변경 후
});