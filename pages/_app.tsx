import '../styles/globals.css';
import React, { useEffect } from 'react';
import NextApp, { AppContext, AppProps } from 'next/app';
import cookies from 'next-cookies';
import { setToken } from '../lib/tokenManager';
import axios from 'axios';

const App = ({ Component, pageProps }: AppProps) => {
  useEffect(() => {
    // setToken('asdfasfasdf', 'aasdfsadfsadf');

    async function test() {
      //console.log('test');
      await axios.get('http://localhost:3000/api/hello2');
      // console.log(result);
    }
    test();
  }, [pageProps]);
  return <Component {...pageProps} />;
};

App.getInitialProps = async (appContext: AppContext) => {
  const appProps = await NextApp.getInitialProps(appContext);
  const { ctx } = appContext;
  const req: any = ctx.req;
  console.log('req', req.headers);
  console.log('session', req.session);
  const allCookies = cookies(ctx);
  await axios.get('http://localhost:3000/api/hello');
  const accessTokenByCookie = allCookies['accessToken'];
  if (accessTokenByCookie !== undefined) {
    const refreshTokenByCookie = allCookies['refreshToken'] || '';
    // setToken(accessTokenByCookie, refreshTokenByCookie);
  }
  return {
    ...appProps,
  };
};

export default App;
