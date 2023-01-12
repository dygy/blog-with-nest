import NextApp, { AppProps } from 'next/app';
import { AppDataContext } from 'src/client/ssr/appData';
import { AppData } from 'src/shared/types/app-data';
import { initializeFetch } from 'src/shared/utils/fetch';
import React from 'react';
import '../global.scss';
class App extends NextApp<AppProps> {
  appData: AppData;

  constructor(props: AppProps) {
    super(props);

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    this.appData = props.pageProps.appData || {};

    initializeFetch(this.appData.basePath);
  }

  render() {
    const { Component, pageProps } = this.props;

    return (
      <React.StrictMode>
        <AppDataContext.Provider value={this.appData}>
          <Component {...pageProps} />
        </AppDataContext.Provider>
      </React.StrictMode>
    );
  }
}

export default App;
