import {
    Button,
    Dropdown,
    DropdownItem,
    DropdownMenu,
    DropdownTrigger,
    Link,
    NavbarContent,
    NavbarItem,
} from "@nextui-org/react";
import { IconContext } from "react-icons";
import { HiChevronDown } from "react-icons/hi2";
import { MdMovieEdit } from "react-icons/md";
import { TbMovie } from "react-icons/tb";
import { useNavigate } from "react-router-dom";

export const NavbarIsAuth = ({ user }) => {
    const navigate = useNavigate();
    return (
        <>
            <NavbarContent className="hidden md:flex gap-4" justify="center">
                <NavbarItem>
                    <Link
                        color="foreground"
                        className="text-small lg:text-base"
                        href="/shoppingCart"
                        aria-current="page"
                    >
                        Shopping Cart
                    </Link>
                </NavbarItem>
                {user.isAdmin && (
                    <>
                        <Dropdown>
                            <NavbarItem>
                                <DropdownTrigger>
                                    <Button
                                        disableRipple={true}
                                        className="p-0 bg-transparent data-[hover=true]:bg-transparent text-small lg:text-base "
                                        radius="sm"
                                        variant="light"
                                        endContent={<HiChevronDown />}
                                    >
                                        Admin
                                    </Button>
                                </DropdownTrigger>
                            </NavbarItem>
                            <DropdownMenu
                                aria-label="Admin"
                                className="w-[200px] text-2xl"
                                itemClasses={{
                                    base: "gap-4",
                                }}
                            >
                                <DropdownItem
                                    onClick={() => {
                                        navigate("/inventory");
                                    }}
                                    startContent={
                                        <IconContext.Provider value={{ size: "20" }}>
                                            <TbMovie />
                                        </IconContext.Provider>
                                    }
                                    textValue="inventory"
                                >
                                    <span className="text-base lg:text-base">
                                        Inventory
                                    </span>
                                </DropdownItem>
                                <DropdownItem
                                    onClick={() => {
                                        navigate("/purchases");
                                    }}
                                    startContent={
                                        <IconContext.Provider value={{ size: "20" }}>
                                            <MdMovieEdit />
                                        </IconContext.Provider>
                                    }
                                    textValue="Purchases"
                                >
                                    <span className="text-base lg:text-base">
                                        Purchases
                                    </span>
                                </DropdownItem>
                                <DropdownItem
                                    onClick={() => {
                                        navigate("/orders/new");
                                    }}
                                    startContent={
                                        <IconContext.Provider value={{ size: "20" }}>
                                            <MdMovieEdit />
                                        </IconContext.Provider>
                                    }
                                    textValue="New Order"
                                >
                                    <span className="text-base lg:text-base">
                                        New Order
                                    </span>
                                </DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                    </>
                )}
            </NavbarContent>
        </>
    );
};
