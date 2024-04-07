import { useState } from "react";
import { FormNewMovie } from "./FormNewMovie";

import { Button } from "@nextui-org/react";
export const SectionNewMovie = () => {
    const [addNewMovie, setAddNewMovie] = useState(false);

    return (
        <>
            <div className="flex flex-col justify-center items-center mt-6">
                <Button
                    variant="light"
                    size="lg"
                    className="italic font-semibold w-52 text-xl"
                    color={addNewMovie ? "danger" : "success"}
                    onClick={() => setAddNewMovie(!addNewMovie)}
                >
                    {addNewMovie ? "Cancel" : "Add a new movie..."}
                </Button>
            </div>
            {addNewMovie && <FormNewMovie />}
        </>
    );
};
