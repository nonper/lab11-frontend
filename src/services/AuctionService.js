import axios from 'axios'

const apiClient = axios.create({
  baseURL: process.env.VUE_APP_BACKEND_URL,
  withCredentials: false,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
})

export default {
  getAuctions(perPage, page) {
    return apiClient.get('/auction?_limit=' + perPage + '&_page=' + page)
  },
  getAuctionByDescription(keyword, perPage, page) {
    return apiClient.get(
      '/auction?&description=' +
        keyword +
        '&_limit=' +
        perPage +
        '&_page=' +
        page
    )
  }
}
