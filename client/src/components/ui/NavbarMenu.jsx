import { Link, NavbarMenu, NavbarMenuItem } from "@nextui-org/react";

export const NavbarList = ({ user }) => {
    const menuItems = [
        { label: "View movies", url: "/", onlyAdmin: false },
        { label: "Shopping cart", url: "/shoppingCart", onlyAdmin: false },
        { label: "Inventory", url: "/inventory", onlyAdmin: true },
        { label: "New order", url: "/order/new", onlyAdmin: true },
    ];

    return (
        <NavbarMenu>
            {user.isAdmin
                ? menuItems.map((item, index) => (
                      <NavbarMenuItem key={`${item}-${index}`}>
                          <Link
                              color={"foreground"}
                              className="w-full text-2xl font-bold"
                              href={item.url}
                              size="lg"
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
                                  color={"foreground"}
                                  className="w-full text-2xl font-bold"
                                  href={item.url}
                                  size="lg"
                              >
                                  {item.label}
                              </Link>
                          </NavbarMenuItem>
                      ))}
        </NavbarMenu>
    );
};
