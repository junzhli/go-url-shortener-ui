import React, { Dispatch } from "react";
import GoogleSignButton from "./GoogleSignButton";
import { IMainLoginProps, IMainLoginStates, IMainLogin } from "./types/MainLogin";
import { setUserIsLoggedIn } from "../actions/user";
import { StoreState } from "../store/types";
import { UserActionType } from "../actions/types/user";
import { connect } from "react-redux";
import { withRouter } from "next/router";
import Link from "next/link";
import axios from "axios";
import { setLoginCookie } from "../utils/login";
import styles from "./MainLogin.module.css";

class MainLogin extends React.Component<IMainLoginProps, IMainLoginStates> {
    constructor(props: IMainLoginProps) {
        super(props);
        this.googleSignIn = this.googleSignIn.bind(this);
        this.receiveMessage = this.receiveMessage.bind(this);
        this.localSignIn = this.localSignIn.bind(this);
        this.handleInputOnChange = this.handleInputOnChange.bind(this);
        this.state = {
            userEmail: "",
            userPassword: "",
            localSignInErrMessage: "",
        };
    }

    async localSignIn(event: any) {
        event.preventDefault();
        try {
            const response = await axios.post(process.env["NEXT_PUBLIC_BASE_URL"] + "/api/user/sign/", {
                "email": this.state.userEmail,
                "password": this.state.userPassword,
            });
            if (response.status !== 200) {
                throw new Error("unknown status");
            }
            const accessToken = response.data.issueToken;
            setLoginCookie(accessToken);
            this.props.setUserIsLoggedIn(true);
            this.props.router.push("/");
        } catch (error) {
            console.log("signIn error");
            console.log(error);
            if (error.response && error.response.status) {
                if (error.response.status === 400) {
                    this.setState({ localSignInErrMessage: error.response.data.error });
                } else {
                    this.setState({ localSignInErrMessage: "Unknown error. Please try again later." });
                }
            }
        }
    }

    googleSignIn(event: any) {
        window.open(process.env["NEXT_PUBLIC_BASE_URL"] + "/api/user/sign/google");
        window.addEventListener("message", this.receiveMessage, false);
    }

    receiveMessage(event) {
        if (!event && !event.origin && !event.data) {
            return;
        }
        if (event.origin !== process.env["NEXT_PUBLIC_BASE_URL"]) {
            return;
        }

        if (event.data.accessToken !== undefined) {
            const accessToken = event.data.accessToken;
            window.removeEventListener("message", this.receiveMessage, false);

            setLoginCookie(accessToken);
            this.props.setUserIsLoggedIn(true);
        }
    }

    handleInputOnChange(input: "userEmail" | "userPassword") {
        let func = (event) => {
            switch (input) {
                case "userEmail":
                    this.setState({userEmail: event.target.value});
                    break;
                case "userPassword":
                    this.setState({userPassword: event.target.value});
                    break;
            }
        };
        func = func.bind(this);
        return func;
    }

    render() {
        return (
               <section className={`hero is-light ${styles["full-height"]}`}>
                    <div className="level-item has-text-centered">
                        <div className="login">
                            <div className="container is-fluid">
                                <div className="notification is-capitalized has-text-weight-medium">
                                    Log in with:
                                </div>
                                <GoogleSignButton onClick={this.googleSignIn} />
                            </div>
                            <div className="divider">OR</div>
                            <form onSubmit={this.localSignIn}>
                                <div className="field">
                                    <div className="control">
                                        <input className="input is-medium is-rounded" value={this.state.userEmail} onChange={this.handleInputOnChange("userEmail")} type="email" placeholder="Email" autoComplete="username" required={true} />
                                    </div>
                                </div>
                                <div className="field">
                                    <div className="control">
                                        <input className="input is-medium is-rounded" value={this.state.userPassword} onChange={this.handleInputOnChange("userPassword")} type="password" placeholder="**********" autoComplete="current-password" required={true} />
                                    </div>
                                </div>
                                {
                                    this.state.localSignInErrMessage !== "" && <p className="help is-danger">{this.state.localSignInErrMessage}</p>
                                }
                                <br />
                                <button className="button is-block is-fullwidth is-primary is-medium is-rounded" type="submit">
                                Login with Email
                                </button>
                            </form>
                            <br/>
                            <nav className="level">
                                <div className="level-item has-text-centered">
                                <Link href="/signup">
                                    <div>
                                        <a href="#">Create an Account</a>
                                    </div>
                                </Link>
                                </div>
                            </nav>
                        </div>
                    </div>
                </section>
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
)(MainLogin));