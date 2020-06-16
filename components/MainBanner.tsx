import { IMainBannerProps, IMainBannerStates } from "./types/MainBanner";
import React, { Dispatch } from "react";
import Link from "next/link";
import { StoreState } from "../store/types";
import { IMainLogin } from "./types/MainLogin";
import { UserActionType } from "../actions/types/user";
import { setUserIsLoggedIn } from "../actions/user";
import { connect } from "react-redux";
import { withRouter } from "next/router";
import AccountButton from "./AccountButton";
import { isUserLogin, removeUserAccessToken, getUserAccessToken } from "../utils/login";
import { shortenUrl, UnauthorizedError } from "../utils/api";

class MainBanner extends React.Component<IMainBannerProps, IMainBannerStates> {
    private readonly mobileWidth: number;
    constructor(props) {
        super(props);
        this.mobileWidth = 1024;
        this.state = {
            url: "",
            isMobile: (typeof window !== "undefined" && window.innerWidth <= this.mobileWidth),
            mobileMenuIsActive: false,
        };
        this.handleInputOnChange = this.handleInputOnChange.bind(this);
        this.logout = this.logout.bind(this);
        this.urlShorten = this.urlShorten.bind(this);
        this.handleInputOnKeyPressed = this.handleInputOnKeyPressed.bind(this);
        this.openMenu = this.openMenu.bind(this);
    }

    private async urlShorten() {
        try {
            await shortenUrl(process.env["NEXT_PUBLIC_BASE_URL"], getUserAccessToken(), this.state.url);
        } catch (error) {
            if (error instanceof UnauthorizedError) {
                this.props.setUserIsLoggedIn(false);
            } else {
                // TODO: better visualization
                alert(error);
            }
        }
        window.location.reload();
    }

    private handleInputOnChange(input: "url") {
        let func = (event) => {
            switch (input) {
                case "url":
                    this.setState({url: event.target.value});
                    break;
            }
        };
        func = func.bind(this);
        return func;
    }

    private async handleInputOnKeyPressed(event) {
        if (event.key === "Enter") {
            try {
                await this.urlShorten();
            } catch (error) {
                // TODO: better visualization
                alert(error);
            }
        }
    }

     logout(event: any) {
        this.props.setUserIsLoggedIn(false);
    }

    openMenu() {
        this.setState({mobileMenuIsActive: !this.state.mobileMenuIsActive});
    }

    resize() {
        if (!this.state.isMobile && window.innerWidth <= this.mobileWidth) {
            this.setState({isMobile: true});
        }

        if (this.state.isMobile && window.innerWidth > this.mobileWidth) {
            this.setState({isMobile: false});
        }
    }

    componentDidMount() {
        if (isUserLogin()) {
            this.props.setUserIsLoggedIn(true);
        } else {
            this.props.setUserIsLoggedIn(false);
        }

        window.addEventListener("resize", this.resize.bind(this));
    }

    componentWillUnmount() {
        window.removeEventListener("resize", this.resize.bind(this));
    }

    componentDidUpdate(preProps: IMainBannerProps) {
        if (preProps.userLoggedIn !== this.props.userLoggedIn) {
            if (this.props.userLoggedIn) {
                this.props.router.push("/dashboard");
            } else {
                removeUserAccessToken();
                this.props.router.push("/");
            }
        }
    }

    render() {
        return (
            <div className="container">
                <nav className="navbar" role="navigation" aria-label="main navigation">
                <div className="navbar-brand">
                    <Link href={(this.props.userLoggedIn) ? "/dashboard" : "/"}>
                        <div className="navbar-item" >
                            <img src="/sh-it-logo.png" width="112" height="28" />
                        </div>
                    </Link>

                    <a role="button" onClick={this.openMenu} className={`navbar-burger burger ${(this.state.mobileMenuIsActive) && "is-active"}`} aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
                    <span aria-hidden="true"/>
                    <span aria-hidden="true"/>
                    <span aria-hidden="true"/>
                    </a>
                </div>

                <div id="navbarBasicExample" className={`navbar-menu ${(this.state.mobileMenuIsActive) && "is-active"}`}>
                    <div className="navbar-start">
                        {
                            this.props.userLoggedIn && (
                                <div className="navbar-item">
                                    <div className="field is-grouped">
                                        <p className="control is-expanded">
                                            <input className="input" onChange={this.handleInputOnChange("url")} onKeyPress={this.handleInputOnKeyPressed} type="url" placeholder="Shorten your link" required={true}/>
                                        </p>
                                        <p className="control">
                                            <a className="button is-info" onClick={this.urlShorten}>
                                                Shorten
                                            </a>
                                        </p>
                                    </div>
                                </div>
                            )
                        }
                    </div>
                    <div className="navbar-end">
                        <div className="navbar-item">
                            {this.props.userLoggedIn ?
                                (
                                    <AccountButton logoutOnClick={this.logout} />
                                ) :
                                (
                                    <div className="buttons">
                                        <Link href="/login">
                                            <div className="button is-light">
                                                <strong>Log in</strong>
                                            </div>
                                        </Link>
                                        <Link href="/signup">
                                            <div className="button is-light">
                                                <strong>Sign up</strong>
                                            </div>
                                        </Link>
                                    </div>
                                )
                            }
                        </div>
                    </div>
                </div>
                </nav>
            </div>
        );
    }
}

const mapStateToProps = (state: StoreState, ownProps: IMainLogin.IInnerProps): IMainLogin.IStateFromProps => {
    return {
        userLoggedIn: state.userMisc.userLoggedIn,
    };
};

const mapDispatchToProps = (dispatch: Dispatch<UserActionType>, ownProps: IMainLogin.IInnerProps): IMainLogin.IPropsFromDispatch => {
    return {
        setUserIsLoggedIn: (userLoggedIn: boolean) => dispatch(setUserIsLoggedIn(userLoggedIn)),
    };
};

export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps,
)(MainBanner));