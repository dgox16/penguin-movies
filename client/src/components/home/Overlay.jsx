import { motion } from "framer-motion";

export const Overlay = ({ children }) => {
    const variants = {
        open: { backgroundColor: "rgba(0,0,0,0.6)" },
        closed: { backgroundColor: "rgba(0,0,0,0)" },
    };
    return (
        <motion.div
            variants={variants}
            initial={"closed"}
            exit={"closed"}
            animate={"open"}
            className="fixed top-0 pt-16 left-0 w-full h-full bg-black/60 z-20 flex justify-center items-center "
            // onClick={() => {
            //     if (open) {
            //         console.info("Cerrar");
            //         close();
            //     } else {
            //         console.info("Abrir");
            //     }
            //     setOpen(!open);
            // }}
        >
            {children}
        </motion.div>
    );
};
