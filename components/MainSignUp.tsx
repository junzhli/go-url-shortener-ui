import React, { Dispatch } from "react";
import GoogleSignButton from "./GoogleSignButton";
import { IMainLoginProps, IMainLogin } from "./types/MainLogin";
import { StoreState } from "../store/types";
import { UserActionType } from "../actions/types/user";
import { setUserIsLoggedIn } from "../actions/user";
import { withRouter } from "next/router";
import { connect } from "react-redux";
import { IMainSignUpProps, IMainSignUpStates } from "./types/MainSignUp";
import Link from "next/link";
import axios from "axios";
import { setLoginCookie } from "../utils/login";
import styles from "./MainSignUp.module.css";

class MainSignUp extends React.Component<IMainSignUpProps, IMainSignUpStates> {
    private popupListener: Window;
    private sendChildEvent: NodeJS.Timeout;
    constructor(props: IMainLoginProps) {
        super(props);
        this.googleSignUp = this.googleSignUp.bind(this);
        this.receiveMessage = this.receiveMessage.bind(this);
        this.handleInputOnChange = this.handleInputOnChange.bind(this);
        this.localSignUp = this.localSignUp.bind(this);
        this.state = {
            userEmail: "",
            userPassword: "",
            localSignUpIsSuccessfull: false,
            localSignUpErrMessage: "",
        };
    }

    async localSignUp(event: any) {
        event.preventDefault();
        try {
            const response = await axios.post(process.env["NEXT_PUBLIC_"] + "/api/user/signup", {
                "email": this.state.userEmail,
                "password": this.state.userPassword,
            });
            if (response.status !== 200) {
                throw new Error("unknown status");
            }

            if (this.state.localSignUpErrMessage !== "") {
                this.setState({ localSignUpErrMessage: "" });
            }

            this.setState({ localSignUpIsSuccessfull: true });
            this.forceUpdate();
            this.props.router.push("/login");
        } catch (error) {
            console.log("signUp error");
            console.log(error);
            if (error.response && error.response.status) {
                if (error.response.status === 400) {
                    this.setState({ localSignUpErrMessage: error.response.data.error });
                } else {
                    this.setState({ localSignUpErrMessage: "Unknown error. Please try again later." });
                }
            }
        }
    }

    googleSignUp(event: any) {
        this.popupListener = window.open(process.env["NEXT_PUBLIC_BASE_URL"] + "/api/user/sign/google");
        this.popupListener.addEventListener("message", this.receiveMessage, false);
        this.sendChildEvent = setInterval(() => {
            this.popupListener.postMessage("getAccessToken", process.env["NEXT_PUBLIC_BASE_URL"]);
        }, 1000);
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
            event.source.postMessage("closeWindow", event.origin);
            this.popupListener.removeEventListener("message", this.receiveMessage, false);
            clearInterval(this.sendChildEvent);

            setLoginCookie(accessToken);
            this.props.setUserIsLoggedIn(true);
            this.props.router.push("/dashboard");
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
                                Sign up with:
                            </div>
                            <GoogleSignButton onClick={this.googleSignUp} />
                        </div>
                        <div className="divider">OR</div>
                        <form onSubmit={this.localSignUp}>
                            {
                                this.state.localSignUpIsSuccessfull && <p className="help is-success">Awesome! You are registered!</p>
                            }
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
                                this.state.localSignUpErrMessage !== "" && <p className="help is-danger">{this.state.localSignUpErrMessage}</p>
                            }
                            <br />
                            <button className="button is-block is-fullwidth is-success is-medium is-rounded" type="submit">
                            Sign up with Email
                            </button>
                        </form>
                        <br/>
                        <nav className="level">
                            <div className="level-item has-text-centered">
                                <Link href="/login">
                                    <div>
                                        <a href="#">Already have an Account?</a>
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
)(MainSignUp));