import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../store/auth";
import { logoutRequest } from "../../services/usersAdministration";
import {
    Autocomplete,
    AutocompleteItem,
    Button,
    Link,
    NavbarContent,
    NavbarItem,
    Spacer,
} from "@nextui-org/react";

export const NavbarIsAuth = () => {
    const { logout } = useAuthStore();
    const navigate = useNavigate();

    const logoutAndLogin = async () => {
        const { isSessionClosed } = await logoutRequest();
        if (isSessionClosed) {
            logout();
            navigate("login");
        }
    };

    const animals = [
        {
            label: "Cat",
            value: "cat",
            description: "The second most popular pet in the world",
        },
        { label: "Dog", value: "dog", description: "The most popular pet in the world" },
        { label: "Elephant", value: "elephant", description: "The largest land animal" },
        { label: "Lion", value: "lion", description: "The king of the jungle" },
        { label: "Tiger", value: "tiger", description: "The largest cat species" },
        { label: "Giraffe", value: "giraffe", description: "The tallest land animal" },
        {
            label: "Dolphin",
            value: "dolphin",
            description: "A widely distributed and diverse group of aquatic mammals",
        },
        {
            label: "Penguin",
            value: "penguin",
            description: "A group of aquatic flightless birds",
        },
        {
            label: "Zebra",
            value: "zebra",
            description: "A several species of African equids",
        },
        {
            label: "Shark",
            value: "shark",
            description:
                "A group of elasmobranch fish characterized by a cartilaginous skeleton",
        },
        {
            label: "Whale",
            value: "whale",
            description: "Diverse group of fully aquatic placental marine mammals",
        },
        {
            label: "Otter",
            value: "otter",
            description: "A carnivorous mammal in the subfamily Lutrinae",
        },
        {
            label: "Crocodile",
            value: "crocodile",
            description: "A large semiaquatic reptile",
        },
    ];

    const { isAuthenticated, user } = useAuthStore();

    return (
        <>
            <NavbarContent className="hidden lg:flex gap-4" justify="center">
                <NavbarItem isActive={true}>
                    <Link href="/">View movies</Link>
                </NavbarItem>
                <NavbarItem>
                    <Link color="foreground" href="/shoppingCart" aria-current="page">
                        Shopping Cart
                    </Link>
                </NavbarItem>
                <NavbarItem>
                    <Link color="foreground" href="/order/new" aria-current="page">
                        New Order
                    </Link>
                </NavbarItem>
                {isAuthenticated && user.isAdmin && (
                    <>
                        <NavbarItem>
                            <Link
                                color="foreground"
                                href="/inventory"
                                aria-current="page"
                            >
                                Inventory
                            </Link>
                        </NavbarItem>
                        <NavbarItem>|</NavbarItem>
                        <NavbarItem>
                            <Button
                                as={Link}
                                color="danger"
                                href="/"
                                variant="flat"
                                onClick={logoutAndLogin}
                            >
                                Logout
                            </Button>
                        </NavbarItem>
                    </>
                )}
            </NavbarContent>
            <NavbarContent justify="end">
                <NavbarItem>
                    <Autocomplete
                        size="sm"
                        label="Select an animal"
                        className="ax-w-xs w-40 xs:w-[160px] sm:w-[220px] "
                    >
                        {animals.map((animal) => (
                            <AutocompleteItem key={animal.value} value={animal.value}>
                                {animal.label}
                            </AutocompleteItem>
                        ))}
                    </Autocomplete>
                </NavbarItem>
            </NavbarContent>
        </>
    );
};
