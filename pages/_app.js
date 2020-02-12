import React from 'react';
import App from 'next/app';
import { Provider } from 'mobx-react';
import { ThemeProvider } from '@material-ui/styles';
import CssBaseline from "@material-ui/core/CssBaseline";
import initRootStore from '../stores/index';
import theme from '../theme.js';
import MUIContainer from '@material-ui/core/Container';


class CustomApp extends App {
    static async getInitialProps(appContext) {
        const mobxStore = initRootStore();
        appContext.ctx.mobxStore = mobxStore;
        // await mobxStore.AuthStore.checkAuthState();
        const appProps = await App.getInitialProps(appContext);
        return {
            ...appProps,
            initialMobxState: mobxStore,
        };
    }

    constructor(props) {
        super(props);
        const isServer = typeof window === 'undefined';
        this.mobxStore = isServer ? props.initialMobxState : initRootStore();
    }

    render() {
        const { Component, pageProps, from } = this.props;
        return (
            <Provider {...this.mobxStore}>
                <ThemeProvider theme={theme}>
                    <CssBaseline />
                    <MUIContainer maxWidth="lg">
                        <Component {...pageProps} from={from} />
                    </MUIContainer>
                </ThemeProvider>
            </Provider>
        );
    }
}

export default CustomApp;