import React, { Component } from 'react';
import './HomeIntro.scss'
import AnchorLink from "react-anchor-link-smooth-scroll";
import { withTranslation } from 'react-i18next';

class HomeIntro extends Component {

    render() {
        const { t } = this.props
        return (
            <>
                <div className="homeintro">
                    <div className="conatiner">
                        <main className="homeintro-main">
                            <h2 className="site-title">{t('site-desc')}</h2>
                            <AnchorLink href="#find-stars">Find your favourite star here</AnchorLink>
                            <i className="fa fa-level-up icon-up" aria-hidden="true"></i>
                        </main>
                    </div>
                </div>
            </>
        );
    }
}

export default withTranslation()(HomeIntro);