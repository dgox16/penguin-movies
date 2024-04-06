import {
    Button,
    Dropdown,
    DropdownItem,
    DropdownMenu,
    DropdownTrigger,
    Link,
    NavbarItem,
} from "@nextui-org/react";
import { IconContext } from "react-icons";
import { MdMovieEdit } from "react-icons/md";
import { TbMovie, TbShoppingCart } from "react-icons/tb";
import { useNavigate } from "react-router-dom";
import { RiAdminLine } from "react-icons/ri";

export const NavbarIsAuth = ({ user, elementsWidth }) => {
    const navigate = useNavigate();
    return (
        <>
            {user.isAdmin && (
                <>
                    <Dropdown>
                        <NavbarItem>
                            <DropdownTrigger>
                                <Button
                                    disableRipple={true}
                                    className="p-0 bg-transparent data-[hover=true]:bg-transparent text-small md:text-base "
                                    size={elementsWidth.buttonSize}
                                    variant="light"
                                    isIconOnly={true}
                                >
                                    <IconContext.Provider
                                        value={{
                                            size: elementsWidth.iconSize,
                                        }}
                                    >
                                        <RiAdminLine />
                                    </IconContext.Provider>
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
                                <span className="text-base lg:text-base">Inventory</span>
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
                                <span className="text-base lg:text-base">Purchases</span>
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
                                <span className="text-base lg:text-base">New Order</span>
                            </DropdownItem>
                        </DropdownMenu>
                    </Dropdown>
                </>
            )}
            <NavbarItem>
                <Button
                    as={Link}
                    href="/shoppingCart"
                    variant="light"
                    size={elementsWidth.buttonSize}
                    color="warning"
                    isIconOnly={true}
                >
                    <IconContext.Provider value={{ size: elementsWidth.iconSize }}>
                        <TbShoppingCart />
                    </IconContext.Provider>
                </Button>
            </NavbarItem>
        </>
    );
};
