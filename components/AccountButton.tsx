import { Icon } from "@mdi/react";
import { mdiAccountDetails } from "@mdi/js";
import styles from "./AccountButton.module.css";
import { IAccountButtonProps } from "./types/AccountButton";
import { getUserAccessToken } from "../utils/login";
import { StoreState } from "../store/types";
import { IMainLogin } from "./types/MainLogin";
import { Dispatch } from "react";
import { UserActionType } from "../actions/types/user";
import { setUserIsLoggedIn } from "../actions/user";
import { connect } from "react-redux";
import jwtDecode from "jwt-decode";

const AccountButton: React.FC<IAccountButtonProps> = (props) => {
    let email = null;
    const token = getUserAccessToken();
    if (token !== null) {
        try {
            email = jwtDecode(token).email;
        } catch (error) {
            console.log("decode token error");
            console.log(error);
            props.setUserIsLoggedIn(false);
        }
    }

    return (
        <div className="navbar-item has-dropdown is-hoverable">
            <button className="button is-inverted is-outlined">
                    <span className={styles.email}>
                        {email}
                    </span>
                    <Icon path={mdiAccountDetails}
                    title="User Profile"
                    size={1.2}
                    color="black"
                    />


                    <div className="navbar-dropdown is-right">
                        <a className="navbar-item" onClick={props.logoutOnClick.bind(this)}>
                            Log out
                        </a>
                    </div>
            </button>
        </div>
    );
};

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

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(AccountButton);