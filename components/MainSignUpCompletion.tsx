import React, { Dispatch } from "react";
import { StoreState } from "../store/types";
import { UserActionType } from "../actions/types/user";
import { setUserIsLoggedIn } from "../actions/user";
import { withRouter } from "next/router";
import { connect } from "react-redux";
import axios from "axios";
import styles from "./MainSignUpCompletion.module.scss";
import { IMainSignUpCompletionProps, IMainSignUpCompletion, IMainSignUpCompletionStates } from "./types/MainSignUpCompletion";

class MainSignUpCompletion extends React.Component<IMainSignUpCompletionProps, IMainSignUpCompletionStates> {
    private inputRefs: any;
    constructor(props: IMainSignUpCompletionProps) {
        super(props);
        this.inputRefs = {};
        this.toggleBack = this.toggleBack.bind(this);
        this.handleInputOnChange = this.handleInputOnChange.bind(this);
        this.localSignUpCompletion = this.localSignUpCompletion.bind(this);
        this.state = {
            userCode0: "",
            userCode1: "",
            userCode2: "",
            userCode3: "",
            userCode4: "",
            userCode5: "",
            localSignUpIsSuccessfull: false,
            localSignUpErrMessage: "",
        };
    }

    private getUserCode() {
        const { userCode0, userCode1, userCode2, userCode3, userCode4, userCode5 } = this.state;
        return `${userCode0}${userCode1}${userCode2}${userCode3}${userCode4}${userCode5}`;
    }

    toggleBack() {
        this.props.completionToggle();
    }

    handleKeyDown(event) {
        const key = event.which;
        if (key === 8 || key === 9 || (key >= 48 && key <= 57) || (key >= 96 && key <= 105)) {
            return true;
        }

        event.preventDefault();
        return false;
    }

    handleKeyUp(index) {
        return (event) => {
            const key = event.which;
            if (key === 8 || key === 9 || (key >= 48 && key <= 57) || (key >= 96 && key <= 105)) {
                if (key === 8) {
                    this.onSubmitEditing(index, null, true);
                }
                return true;
            }

            event.preventDefault();
            return false;
        };
    }

    async localSignUpCompletion(event?: any) {
        if (event) {
            event.preventDefault();
        }

        try {
            const response = await axios.post(process.env["NEXT_PUBLIC_BASE_URL"] + "/api/user/signup/complete", {
                "email": this.props.userEmail,
                "code": this.getUserCode(),
            });
            if (response.status !== 200) {
                throw new Error("unknown status");
            }

            if (this.state.localSignUpErrMessage !== "") {
                this.setState({ localSignUpErrMessage: "" });
            }

            this.setState({ localSignUpIsSuccessfull: true });
            const func = () => {
                this.props.router.push("/login");
            };
            setTimeout(func.bind(this), 3000);
        } catch (error) {
            console.log("signUp error");
            console.log(error);
            if (error.response && error.response.status) {
                const message = (error.response.status === 400)
                                ? error.response.data.error
                                : "Unknown error. Please try again later.";
                this.setState({
                    localSignUpErrMessage: message,
                    userCode0: "",
                    userCode1: "",
                    userCode2: "",
                    userCode3: "",
                    userCode4: "",
                    userCode5: "",
                });
                this.inputRefs[0].focus();
            }
        }
    }

    onSubmitEditing(index, value?, backKey?) {
        if (backKey) {
            if (0 <= (index - 1)) {
                this.inputRefs[index - 1].focus();
            }
            return;
        }

        if (value === "") {
            return;
        }

        if (6 > (index + 1)) {
            this.inputRefs[index + 1].focus();
        }
    }

    detectSubmission() {
        if (this.getUserCode().length === 6) {
            this.localSignUpCompletion();
        }
    }

    handleInputOnChange(input: "userCode0" | "userCode1" | "userCode2" | "userCode3" | "userCode4" | "userCode5") {
        let func = (event) => {
            switch (input) {
                case "userCode0":
                    this.setState({userCode0: event.target.value}, this.detectSubmission);
                    this.onSubmitEditing(0, event.target.value);
                    break;
                case "userCode1":
                    this.setState({userCode1: event.target.value}, this.detectSubmission);
                    this.onSubmitEditing(1, event.target.value);
                    break;
                case "userCode2":
                    this.setState({userCode2: event.target.value}, this.detectSubmission);
                    this.onSubmitEditing(2, event.target.value);
                    break;
                case "userCode3":
                    this.setState({userCode3: event.target.value}, this.detectSubmission);
                    this.onSubmitEditing(3, event.target.value);
                    break;
                case "userCode4":
                    this.setState({userCode4: event.target.value}, this.detectSubmission);
                    this.onSubmitEditing(4, event.target.value);
                    break;
                case "userCode5":
                    this.setState({userCode5: event.target.value}, this.detectSubmission);
                    this.onSubmitEditing(5, event.target.value);
                    break;
            }
        };
        func = func.bind(this);
        return func;
    }

    render() {
        return (
               <section className={`hero is-light ${styles["full-height"]}`}>
                   <div id={styles.wrapper}>
                        <div id={styles.dialog}>
                            <span>Please enter the 6-digit verification code we sent to <strong>{this.props.userEmail}</strong>:</span>
                            <div id={styles.form}>
                                <input ref={(ref) => this.inputRefs[0] = ref} value={this.state.userCode0} onKeyUp={this.handleKeyUp(0)} onKeyDown={this.handleKeyDown} onChange={this.handleInputOnChange("userCode0")} type="number" inputMode="numeric" maxLength={1} size={1} min={0} max={9} pattern="[0-9]{1}" />
                                <input ref={(ref) => this.inputRefs[1] = ref} value={this.state.userCode1} onKeyUp={this.handleKeyUp(1)} onKeyDown={this.handleKeyDown} onChange={this.handleInputOnChange("userCode1")} type="number" inputMode="numeric" maxLength={1} size={1} min={0} max={9} pattern="[0-9]{1}" />
                                <input ref={(ref) => this.inputRefs[2] = ref} value={this.state.userCode2} onKeyUp={this.handleKeyUp(2)} onKeyDown={this.handleKeyDown} onChange={this.handleInputOnChange("userCode2")} type="number" inputMode="numeric" maxLength={1} size={1} min={0} max={9} pattern="[0-9]{1}" />
                                <input ref={(ref) => this.inputRefs[3] = ref} value={this.state.userCode3} onKeyUp={this.handleKeyUp(3)} onKeyDown={this.handleKeyDown} onChange={this.handleInputOnChange("userCode3")} type="number" inputMode="numeric" maxLength={1} size={1} min={0} max={9} pattern="[0-9]{1}" />
                                <input ref={(ref) => this.inputRefs[4] = ref} value={this.state.userCode4} onKeyUp={this.handleKeyUp(4)} onKeyDown={this.handleKeyDown} onChange={this.handleInputOnChange("userCode4")} type="number" inputMode="numeric" maxLength={1} size={1} min={0} max={9} pattern="[0-9]{1}" />
                                <input ref={(ref) => this.inputRefs[5] = ref} value={this.state.userCode5} onKeyUp={this.handleKeyUp(5)} onKeyDown={this.handleKeyDown} onChange={this.handleInputOnChange("userCode5")} type="number" inputMode="numeric" maxLength={1} size={1} min={0} max={9} pattern="[0-9]{1}" />
                                <button onClick={this.localSignUpCompletion} className="button is-block is-success is-rounded">Verify</button>
                                {
                                    this.state.localSignUpIsSuccessfull && <p className="help is-success">Awesome! You are registered! Redirect in 3 secs...</p>
                                }
                                {
                                    this.state.localSignUpErrMessage !== "" && <p className="help is-danger">{this.state.localSignUpErrMessage}</p>
                                }
                            </div>
                            <div>
                                <a onClick={this.toggleBack}>Change email address</a>
                            </div>
                        </div>
                    </div>
                </section>
        );
    }
}

const mapStateToProps = (state: StoreState, ownProps: IMainSignUpCompletion.IInnerProps): IMainSignUpCompletion.IStateFromProps => {
    return {
        userLoggedIn: state.userMisc.userLoggedIn,
    };
};

const mapDispatchToProps = (dispatch: Dispatch<UserActionType>, ownProps: IMainSignUpCompletion.IInnerProps): IMainSignUpCompletion.IPropsFromDispatch => {
    return {
        setUserIsLoggedIn: (userLoggedIn: boolean) => dispatch(setUserIsLoggedIn(userLoggedIn)),
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(withRouter(MainSignUpCompletion));