import { Link, NavbarMenu, NavbarMenuItem } from "@nextui-org/react";

export const NavbarList = ({ user, logout }) => {
    const menuItems = [
        { label: "View movies", url: "/", onlyAdmin: false },
        { label: "Shopping cart", url: "/shoppingCart", onlyAdmin: false },
        { label: "Inventory", url: "/inventory", onlyAdmin: true },
        { label: "New order", url: "/order/new", onlyAdmin: true },
        { label: "Logout", url: "/", onlyAdmin: false },
    ];

    return (
        <NavbarMenu>
            {user.isAdmin
                ? menuItems.map((item, index) => (
                      <NavbarMenuItem key={`${item}-${index}`}>
                          <Link
                              color={item.label === "Logout" ? "danger" : "foreground"}
                              className="w-full"
                              href={item.url}
                              size="lg"
                              onPress={item.label === "Logout" ? logout : null}
                          >
                              {item.label}
                          </Link>
                      </NavbarMenuItem>
                  ))
                : menuItems
                      .filter((item) => !item.onlyAdmin)
                      .map((item, index) => (
                          <NavbarMenuItem key={`${item}-${index}`}>
                              <Link
                                  color={
                                      item.label === "Logout" ? "danger" : "foreground"
                                  }
                                  className="w-full"
                                  href={item.url}
                                  size="lg"
                                  onPress={item.label === "Logout" ? logout : null}
                              >
                                  {item.label}
                              </Link>
                          </NavbarMenuItem>
                      ))}{" "}
        </NavbarMenu>
    );
};
