import { Button } from "@nextui-org/react";

import { useState, useEffect } from "react";

const useScreenSize = () => {
    const [screenSize, setScreenSize] = useState({
        width: window.innerWidth,
        height: window.innerHeight,
    });

    useEffect(() => {
        const handleResize = () => {
            setScreenSize({
                width: window.innerWidth,
                height: window.innerHeight,
            });
        };

        window.addEventListener("resize", handleResize);

        // Clean up the event listener when the component unmounts
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    return screenSize;
};

export const ModalButtons = ({ alreadyInSc, close, handleSubmit, movie }) => {
    const screenSize = useScreenSize();
    useEffect(() => {
        console.info(screenSize);
    }, [screenSize]);

    const sizeButtons = screenSize.width < 640 ? "sm" : "lg";

    return (
        <div className="mt-3 sm:mt-12">
            <span className="justify-center">
                {movie.stock > 0 ? (
                    alreadyInSc ? (
                        <Button
                            className="mr-3"
                            size={sizeButtons}
                            color="warning"
                            isDisabled={true}
                        >
                            Already in stock
                        </Button>
                    ) : (
                        <Button
                            className="mr-3"
                            size={sizeButtons}
                            color="primary"
                            onClick={() => handleSubmit(movie)}
                        >
                            Add to shopping cart
                        </Button>
                    )
                ) : (
                    <Button
                        className="mr-3"
                        size={sizeButtons}
                        color="default"
                        isDisabled={true}
                    >
                        Not stock
                    </Button>
                )}
                <Button color="danger" size={sizeButtons} onClick={close}>
                    Close
                </Button>
            </span>
            {/* <span className="flex justify-center w-full md:hidden">
                <Button
                    className="mr-3"
                    size="sm"
                    color="primary"
                    onClick={() => handleSubmit(movie)}
                >
                    Add to shopping cart
                </Button>
                <Button color="danger" size="sm" onClick={close}>
                    Close
                </Button>
            </span> */}
        </div>
    );
};
