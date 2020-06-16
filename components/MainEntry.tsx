import React, { Dispatch } from "react";
import { StoreState } from "../store/types";
import { IMainLogin } from "./types/MainLogin";
import { UserActionType } from "../actions/types/user";
import { setUserIsLoggedIn } from "../actions/user";
import { withRouter } from "next/router";
import { connect } from "react-redux";
import { IMainEntryProps, IMainEntryStates } from "./types/MainEntry";
import Link from "next/link";
import styles from "./MainEntry.module.css";

class MainEntry extends React.Component<IMainEntryProps, IMainEntryStates> {
    constructor(props) {
        super(props);
        this.handleInputOnKeyPressed = this.handleInputOnKeyPressed.bind(this);
    }

    private handleInputOnKeyPressed(event) {
        if (event.key === "Enter") {
            this.props.router.push("/signup");
        }
    }

    render() {
        return (
           <div>
               <section className={`section hero is-info ${styles["full-height"]}`}>
               <div className="hero-body">
                <div className="container has-text-centered">
                    <div className="column is-6 is-offset-3">
                        <h1 className="title">
                            Your URL Shortener
                        </h1>
                        <h2 className="subtitle">
                            The best url shortener as ever.
                        </h2>
                        <div className="box">
                            <div className="field is-grouped">
                                <p className="control is-expanded">
                                    <input className="input" type="text" placeholder="Shorten your link" onKeyPress={this.handleInputOnKeyPressed} />
                                </p>
                                <p className="control">
                                    <Link href="/signup">
                                        <a className="button is-info">
                                            Sign Up
                                        </a>
                                    </Link>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

                </section>
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
)(MainEntry));