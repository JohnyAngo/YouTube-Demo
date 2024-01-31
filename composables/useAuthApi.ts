import axios from 'axios'

export const useAuthApi = ( key: string ) => {
  const authApi = axios.create({
    baseURL: 'https://identitytoolkit.googleapis.com/v1/accounts',
    params: {
      key
    }
  })
  return { authApi }
}
