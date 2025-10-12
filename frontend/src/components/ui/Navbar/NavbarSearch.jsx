import {
	Autocomplete,
	AutocompleteItem,
	Button,
	Modal,
	ModalBody,
	ModalContent,
	ModalFooter,
	ModalHeader,
	useDisclosure,
} from "@heroui/react";
import { useMoviesStore } from "../../../store/movies";
import { useNavigate } from "react-router-dom";
import { IconContext } from "react-icons";
import { TbSearch } from "react-icons/tb";

export const NavbarSearch = ({ elementsWidth }) => {
	const { movies } = useMoviesStore();
	const navigate = useNavigate();

	const { isOpen, onOpen, onOpenChange } = useDisclosure();

	const selectionHandler = (id) => {
		if (id !== null) {
			navigate(`/movies/${id}`, { replace: true });
		}
	};

	return (
		<>
			<Button
				onPress={onOpen}
				isIconOnly={true}
				color="primary"
				size={elementsWidth.buttonSize}
				variant="flat"
			>
				<IconContext.Provider value={{ size: elementsWidth.iconSize }}>
					<TbSearch />
				</IconContext.Provider>
			</Button>
			<Modal
				isOpen={isOpen}
				onOpenChange={onOpenChange}
				className="dark text-foreground bg-background"
			>
				<ModalContent>
					{(onClose) => (
						<>
							<ModalHeader className="flex flex-col gap-1">
								Movie Finder
							</ModalHeader>
							<ModalBody>
								<Autocomplete
									label="Search your movie..."
									className="dark text-foreground bg-background"
									onSelectionChange={(e) => {
										selectionHandler(e);
										onClose();
									}}
									allowsCustomValue={true}
								>
									{movies.map((movie) => (
										<AutocompleteItem key={movie.id} value={movie.id}>
											{movie.title}
										</AutocompleteItem>
									))}
								</Autocomplete>
							</ModalBody>
							<ModalFooter>
								<Button color="danger" onPress={onClose}>
									Close
								</Button>
							</ModalFooter>
						</>
					)}
				</ModalContent>
			</Modal>
		</>
	);
};
