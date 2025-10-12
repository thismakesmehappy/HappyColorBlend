import React, {useState, useCallback} from "react";
import useSwatchStore from "@ui/store/useSwatchStore";
import {v4 as uuidv4} from "uuid";
import Toast from "@ui/components/helpers/Toast";
import {TOAST_DURATION} from "../../../constants/uiConstants";
import ColorInput from "@ui/components/helpers/ColorInput";
import Group from "@ui/components/helpers/Group";

const BrandColorInput = () => {
    const addPrimaryColor = useSwatchStore((state) => state.addPrimaryColor);
    const buildSwatches = useSwatchStore((state) => state.buildSwatches);
    const colorExists = useSwatchStore((state) => state.colorExists);

    const [showErrorToast, setShowErrorToast] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const hideErrorToast = () => {
        setShowErrorToast(false);
    };

    const handleAddPrimaryColor = (name: string, hex: string) => {
        const normalizedColorHex = hex.toUpperCase();

        if (colorExists(normalizedColorHex)) {
            setErrorMessage(`Color #${normalizedColorHex} already exists`);
            setShowErrorToast(true);
            return;
        }

        const newBrandColor = {
            color: normalizedColorHex,
            name: name,
            id: uuidv4(),
        };
        addPrimaryColor(newBrandColor);
        buildSwatches();
    };

    return (
        <Group>
            <ColorInput
                nameSource=""
                hexSource=""
                onSubmit={handleAddPrimaryColor}
                submitLabel={"Add"}
            />

            <Toast
                message={errorMessage}
                type="error"
                duration={TOAST_DURATION}
                isVisible={showErrorToast}
                onClose={hideErrorToast}
            />
        </Group>
    );
};

export default BrandColorInput;
