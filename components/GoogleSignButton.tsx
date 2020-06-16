import styles from "./GoogleSignButton.module.scss";
import { IGoogleSignButtonProps } from "./types/GoogleSignButton";

const GoogleSignButton: React.FC<IGoogleSignButtonProps> = (props) => {
    return (
        <div className={styles["google-btn"]} onClick={props.onClick}>
            <div className={styles["google-icon-wrapper"]}>
                <img className={styles["google-icon"]} src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"/>
            </div>
            <p className={styles["btn-text"]}><b>Google</b></p>
        </div>
    );
};

export default GoogleSignButton;