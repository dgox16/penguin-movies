import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/auth";
import { useMoviesStore } from "../store/movies";
import {
    Card,
    CardBody,
    CardHeader,
    Table,
    TableBody,
    TableCell,
    TableColumn,
    TableHeader,
    TableRow,
    getKeyValue,
} from "@nextui-org/react";

export const Inventory = () => {
    const { movies } = useMoviesStore();
    const { user } = useAuthStore();
    const navigate = useNavigate();

    useEffect(() => {
        if (!user.isAdmin) {
            navigate("/");
        }
    }, [user]);

    const columns = [
        {
            key: "title",
            label: "TITLE",
        },
        {
            key: "year",
            label: "YEAR",
        },
        {
            key: "price",
            label: "PRICE ($)",
        },
        {
            key: "stock",
            label: "STOCK",
        },
    ];

    return (
        <div className="flex justify-center mt-3 mx-6 ">
            <Card className="w-[122ch] p-2 sm:p-4">
                <CardHeader className="flex gap-3 mb-3">
                    <div className="flex flex-col">
                        <p className="text-2xl sm:text-3xl font-bold">Inventory</p>
                    </div>
                </CardHeader>
                <CardBody className="p-0">
                    <Table aria-label="Table with inventory">
                        <TableHeader columns={columns}>
                            {(column) => (
                                <TableColumn key={column.key}>{column.label}</TableColumn>
                            )}
                        </TableHeader>
                        <TableBody items={movies}>
                            {(item) => (
                                <TableRow key={item._id}>
                                    {(columnKey) => (
                                        <TableCell>
                                            {getKeyValue(item, columnKey)}
                                        </TableCell>
                                    )}
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </CardBody>
            </Card>
        </div>
    );
};
