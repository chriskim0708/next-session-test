import axios from 'axios';
import cookie from 'react-cookies';

export function setToken(accessToken: string, refreshToken: string) {
  axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
  cookie.save('accessToken', accessToken, { path: '/', httpOnly: false });
  cookie.save('refreshToken', refreshToken, { path: '/', httpOnly: false });
}
