import { Card, CardBody, CardHeader } from "@heroui/react";

export const Purchases = () => {
    return (
        <div className="flex justify-center mt-3 mx-6 ">
            <Card className="w-[122ch] p-2 sm:p-4">
                <CardHeader className="flex gap-3 mb-3">
                    <div className="flex flex-col">
                        <p className="text-2xl sm:text-3xl font-bold">Inventory</p>
                    </div>
                </CardHeader>
                <CardBody>Hola</CardBody>
            </Card>
        </div>
    );
};
