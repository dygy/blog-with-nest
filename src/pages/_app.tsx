import NextApp, { AppProps } from 'next/app';
import { AppDataContext } from 'src/client/ssr/appData';
import { AppData } from 'src/shared/types/app-data';
import { initializeFetch } from 'src/shared/utils/fetch';
import React from 'react';
import '../global.scss';

type pagePropType = {
  appData: AppData;
};
class App extends NextApp<AppProps> {
  appData: AppData;

  constructor(props: AppProps) {
    super(props);
    this.appData = (props.pageProps as pagePropType).appData || {};

    initializeFetch(this.appData.basePath);

    if ('appData' in props.pageProps) {
    }
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
