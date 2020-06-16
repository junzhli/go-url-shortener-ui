import { IPaginationButtonProps } from "./types/PaginationButton";
import Link from "next/link";

const PaginationButton: React.FC<IPaginationButtonProps> = (props) => {

    return (
        props.disabled ?
        (
            <a className={props.className} disabled={true}>{props.title}</a>
        ) :
        (
            <Link href={props.link}>
                <a className={props.className}>{props.title}</a>
            </Link>
        )
    );
};

export default PaginationButton;