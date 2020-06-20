import React from "react";
import Head from "next/head";
import MainBanner from "./MainBanner";
import styles from "./MainLayout.module.css";

class MainLayout extends React.Component<{}, any> {
    render() {
        return (
            <div className={`${styles["page-container"]}`}>
                <Head>
                    <title>sh.it - URL Shortener</title>
                    <link rel="icon" href="/favicon.ico" />
                    <link rel="stylesheet" type="text/css" href="//fonts.googleapis.com/css?family=Open+Sans" />
                    <meta name="viewport" content="width=device-width, initial-scale=1"/>
                    <meta name="google-site-verification" content="3dqKi_d2RLPOHQTSn2yMATcPlo63HCAkfGZrwnFkGpE" />
                    <script async={true} defer={true} src="https://buttons.github.io/buttons.js" />
                </Head>
                <main>
                    <div className={`${styles["content-wrap"]}`}>
                        <MainBanner />
                        {this.props.children}
                    </div>
                </main>

                <footer className={`${styles.footer} footer`}>
                    <div className="content has-text-centered">
                        <p>
                        <a className="github-button" href="https://github.com/junzhli/url-shortener" data-icon="octicon-star" aria-label="Star junzhli/url-shortener on GitHub">Star</a>&nbsp;&nbsp;
                        <strong>sh.it</strong> by <a href="https://github.com/junzhli">Jeremy Li</a>. The source code is licensed <a href="http://opensource.org/licenses/mit-license.php">MIT</a>.&nbsp;&nbsp;
                        </p>
                    </div>
                </footer>
            </div>
        );
    }
}

export default MainLayout;