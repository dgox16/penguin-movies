import { Link } from "react-router-dom";

export const NavbarLink = ({ redirectTo, name, isHighlighted, onClick = null }) => {
    const linkNormal =
        "block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700";
    const linkHighligted =
        "block py-2 pl-3 pr-4 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500";

    return (
        <li>
            <Link
                to={redirectTo}
                onClick={onClick}
                className={isHighlighted ? linkHighligted : linkNormal}
            >
                {name}
            </Link>
        </li>
    );
};
