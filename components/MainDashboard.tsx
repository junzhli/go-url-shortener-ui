import React, { Dispatch } from "react";
import { withRouter } from "next/router";
import { IMainDashboardProps, IMainDashboardStates } from "./types/MainDashboard";
import { Icon } from "@mdi/react";
import { mdiContentCopy, mdiTrashCanOutline } from '@mdi/js';
import copy from 'copy-to-clipboard';
import styles from "./MainDashboard.module.css";
import PaginationButton from "./PaginationButton";
import { deleteUserUrl, UnauthorizedError } from "../utils/api";
import { getUserAccessToken } from "../utils/login";
import { StoreState } from "../store/types";
import { IMainLogin } from "./types/MainLogin";
import { UserActionType } from "../actions/types/user";
import { setUserIsLoggedIn } from "../actions/user";
import { connect } from "react-redux";

class MainDashboard extends React.Component<IMainDashboardProps, IMainDashboardStates> {
    constructor(props) {
        super(props);
        this.handleLinkCopyOnClick = this.handleLinkCopyOnClick.bind(this);
        this.handleDeletionOnClick = this.handleDeletionOnClick.bind(this);
    }

    private handleLinkCopyOnClick(text: string) {
        return (event) => {
            copy(text);
        };
    }

    private async handleDeletionOnClick(id: string) {
        try {
            await deleteUserUrl(process.env["NEXT_PUBLIC_BASE_URL"], getUserAccessToken(), id);
            window.location.reload();
        } catch (error) {
            if (error instanceof UnauthorizedError) {
                this.props.setUserIsLoggedIn(false);
            } else {
                // TODO: better visualization
                console.log("url deletion failed");
                alert(error);
            }
        }
    }

    render() {
        return (
           <div className={`${styles["is-fullheight"]}`}>
                <section className="section">
                    <div className="container">
                        <div className={`${styles["table-fixed-height"]}`}>
                            <table className={`${styles["table-fixed-layout"]} table is-fullwidth is-hoverable`}>
                                <thead>
                                    <tr>
                                        <th><abbr title="Origin">Origin URL</abbr></th>
                                        <th><abbr title="Shorten">Shorten URL</abbr></th>
                                        <th><abbr title="Options">Hits</abbr></th>
                                        <th><abbr title="Options">Options</abbr></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        this.props.urlsMapping.map(({oriUrl, shortenUrl, hits}) => {
                                            return (
                                                <tr key={shortenUrl}>
                                                    <td className={`${styles["text-overflow-ellipsis"]}`}>{oriUrl}</td>
                                                    <td>
                                                        <a className="margin-right mr-1" target="_blank" href={`${process.env["NEXT_PUBLIC_BASE_URL"]}/r/${shortenUrl}`}>{shortenUrl}</a>
                                                        <button className="button is-small is-rounded" onClick={this.handleLinkCopyOnClick(`${process.env["NEXT_PUBLIC_BASE_URL"]}/r/${shortenUrl}`)}>
                                                            <Icon path={mdiContentCopy}
                                                                title="Copy to clipboard"
                                                                size={0.63}
                                                                color="black"
                                                            />
                                                        </button>
                                                    </td>
                                                    <td>{hits}</td>
                                                    <td>
                                                        <button className="button is-small is-danger is-rounded" onClick={this.handleDeletionOnClick.bind(null, shortenUrl)}>
                                                            <span className="margin-right mr-1">Delete</span>
                                                            <Icon path={mdiTrashCanOutline}
                                                                title="Delete"
                                                                size={0.5}
                                                                color="white"
                                                            />
                                                        </button>
                                                    </td>
                                                </tr>
                                            );
                                        })
                                    }

                                </tbody>
                            </table>
                        </div>
                        <nav className="pagination" role="navigation" aria-label="pagination">
                            <PaginationButton title="Previous" className="pagination-previous" link={`/dashboard?page=${this.props.page - 1}`} disabled={this.props.page - 1 <= 0} />
                            <PaginationButton title="Next page" className="pagination-next" link={`/dashboard?page=${this.props.page + 1}`} disabled={this.props.page + 1 > this.props.totalPage} />
                            <ul className="pagination-list">
                                {/* <li>
                                    <a className="pagination-link is-current" aria-label="Page 1" aria-current="page">1</a>
                                </li>
                                <li>
                                    <a className="pagination-link" aria-label="Goto page 2">2</a>
                                </li>
                                <li>
                                    <a className="pagination-link" aria-label="Goto page 3">3</a>
                                </li> */}
                            </ul>
                        </nav>
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

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(withRouter(MainDashboard));