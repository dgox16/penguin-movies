import { NavbarMain } from "./Navbar/NavbarMain";

export const Template = ({ children }) => {
	return (
		<div className="flex flex-col min-h-screen dark text-foreground bg-background">
			<header className="fixed top-0 left-0 w-full h-16 z-50">
				<NavbarMain />
			</header>
			<main className="flex flex-1 mt-16">{children}</main>
		</div>
	);
};
