export const Footer = () => {
    return (
        <footer className="mt-5 flex justify-center">
            <div className="text-center">
                <p className="py-3 text-text text-sm">
                    © 2024{" "}
                    <a
                        rel="noreferrer"
                        target="_blank"
                        href="https://portfolio-alpha-three-66.vercel.app/"
                    >
                        Diego Armando Gómez Martínez.
                    </a>
                    <span className="hidden sm:inline"> | </span>
                    <br aria-hidden="true" className="block sm:hidden" />
                    Casi todos los derechos reservados.
                </p>
            </div>
        </footer>
    );
};
