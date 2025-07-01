import React, { useState } from "react";
import Help from "@ui/components/helpers/Help";
import Toast from "@ui/components/helpers/Toast";
import { UI_CHANNEL } from "@ui/app.network";
import { PLUGIN } from "@common/networkSides";
import { prepareSwatchVariableData } from "@ui/helpers/variableDataPrep";
import { prepareSwatchStyleData } from "@ui/helpers/styleDataPrep";
import { prepareSwatchCreationData } from "@ui/helpers/swatchDataPrep";
import useSwatchStore from "@ui/store/useSwatchStore";
import useTokenNameStore from "@ui/store/useTokenNameStore";

const OutputButtons = () => {
    const [isCreatingVariables, setIsCreatingVariables] = useState(false);
    const [isCreatingStyles, setIsCreatingStyles] = useState(false);
    const [isCreatingSwatches, setIsCreatingSwatches] = useState(false);
    const [toastMessage, setToastMessage] = useState("");
    const [toastType, setToastType] = useState<"success" | "error" | "primary">("success");
    const [showToast, setShowToast] = useState(false);

    // Get store data
    const swatchStore = useSwatchStore();
    const tokenStore = useTokenNameStore();

    const handleCreateVariables = async () => {
        setIsCreatingVariables(true);
        setToastMessage("Creating variables...");
        setToastType("primary");
        setShowToast(true);

        try {
            // Prepare the data
            const variableData = prepareSwatchVariableData(swatchStore, tokenStore);

            // Call the plugin
            const result = await UI_CHANNEL.request(PLUGIN, "createVariables", [variableData]);

            if (result.success) {
                setToastMessage(result.message);
                setToastType("success");
            } else {
                setToastMessage(result.error || result.message);
                setToastType("error");
            }
        } catch (error) {
            setToastMessage(`Failed to create variables: ${error instanceof Error ? error.message : String(error)}`);
            setToastType("error");
        } finally {
            setIsCreatingVariables(false);
            setShowToast(true);
        }
    };

    const handleCreateStyles = async () => {
        setIsCreatingStyles(true);
        setToastMessage("Creating styles...");
        setToastType("primary");
        setShowToast(true);

        try {
            // Prepare the data
            const styleData = prepareSwatchStyleData(swatchStore, tokenStore);

            // Call the plugin
            const result = await UI_CHANNEL.request(PLUGIN, "createStyles", [styleData]);

            if (result.success) {
                setToastMessage(result.message);
                setToastType("success");
            } else {
                setToastMessage(result.error || result.message);
                setToastType("error");
            }
        } catch (error) {
            setToastMessage(`Failed to create styles: ${error instanceof Error ? error.message : String(error)}`);
            setToastType("error");
        } finally {
            setIsCreatingStyles(false);
            setShowToast(true);
        }
    };

    const handleCreateSwatches = async () => {
        setIsCreatingSwatches(true);
        setToastMessage("Creating swatches...");
        setToastType("primary");
        setShowToast(true);

        try {
            // Prepare the data with default display settings
            const swatchData = prepareSwatchCreationData(swatchStore, tokenStore, {
                displayWidth: 1200,
                swatchSize: 64,
                fontSize: 12
            });

            // Call the plugin
            const result = await UI_CHANNEL.request(PLUGIN, "createSwatches", [swatchData]);

            if (result.success) {
                setToastMessage(result.message);
                setToastType("success");
            } else {
                setToastMessage(result.error || result.message);
                setToastType("error");
            }
        } catch (error) {
            setToastMessage(`Failed to create swatches: ${error instanceof Error ? error.message : String(error)}`);
            setToastType("error");
        } finally {
            setIsCreatingSwatches(false);
            setShowToast(true);
        }
    };

    const handleCloseToast = () => {
        setShowToast(false);
    };

    return (
        <>
            <div className={"sticky-bottom figma-p-md bg-white d-flex justify-content-around"}>
                <button 
                    className={"btn btn-primary figma-bg-primary figma-text-light figma-mr-sm"}
                    onClick={handleCreateVariables}
                    disabled={isCreatingVariables || isCreatingStyles || isCreatingSwatches}
                >
                    {isCreatingVariables ? "Creating..." : "Add Variables"}
                </button>
                <button 
                    className={"btn btn-primary figma-bg-primary figma-text-light figma-mr-sm"}
                    onClick={handleCreateStyles}
                    disabled={isCreatingVariables || isCreatingStyles || isCreatingSwatches}
                >
                    {isCreatingStyles ? "Creating..." : "Add Styles"}
                </button>
                <button 
                    className={"btn btn-primary figma-bg-primary figma-text-light figma-mr-sm"}
                    onClick={handleCreateSwatches}
                    disabled={isCreatingVariables || isCreatingStyles || isCreatingSwatches}
                >
                    {isCreatingSwatches ? "Creating..." : "Create Swatches"}
                </button>
                <Help
                    content={"These buttons will create Figma variables, color styles, or swatch components from your generated color palette"}
                    id="output-buttons-tooltip"
                    placement={"top"} />
            </div>

            <Toast 
                message={toastMessage}
                type={toastType}
                isVisible={showToast}
                onClose={handleCloseToast}
                duration={toastType === "error" ? 5000 : 3000}
            />
        </>
    );
};

export default OutputButtons
