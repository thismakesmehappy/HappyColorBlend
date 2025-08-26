import React, {useState} from "react";
import Help from "@ui/components/helpers/Help";
import Toast from "@ui/components/helpers/Toast";
import {UI_CHANNEL} from "@ui/app.network";
import {PLUGIN} from "@common/networkSides";
import {prepareSwatchVariableData} from "@ui/helpers/variableDataPrep";
import {prepareSwatchStyleData} from "@ui/helpers/styleDataPrep";
import {prepareSwatchCreationData} from "@ui/helpers/swatchDataPrep";
import {generateCSSVariables, generateSCSSVariables, copyToClipboard} from "@ui/helpers/variableExport";
import useSwatchStore from "@ui/store/useSwatchStore";
import useTokenNameStore from "@ui/store/useTokenNameStore";
import {getTooltipProps} from "@ui/constants/tooltips";
import "@ui/styles/bootstrap/bootstrap.scss";

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
            // Prepare the data using the full store object
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
            // Prepare the data using the full store object
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
            // Prepare the data with default display settings using the full store object
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

    const handleExportCSS = async () => {
        try {
            const cssVariables = generateCSSVariables(swatchStore, tokenStore);

            // Check if we have any variables to copy
            if (!cssVariables || cssVariables.length < 10) {
                setToastMessage("No color data available to export. Please add some primary colors first.");
                setToastType("error");
                setShowToast(true);
                return;
            }

            const success = await copyToClipboard(cssVariables);

            if (success) {
                setToastMessage("CSS variables copied to clipboard!");
                setToastType("success");
            } else {
                // Show the generated content in the error message as a fallback
                setToastMessage("Clipboard access failed. Check browser console for generated CSS variables.");
                console.log("Generated CSS Variables:\n", cssVariables);
                setToastType("error");
            }
            setShowToast(true);
        } catch (error) {
            setToastMessage(`Failed to export CSS variables: ${error instanceof Error ? error.message : String(error)}`);
            setToastType("error");
            setShowToast(true);
        }
    };

    const handleExportSCSS = async () => {
        try {
            const scssVariables = generateSCSSVariables(swatchStore, tokenStore);

            // Check if we have any variables to copy
            if (!scssVariables || scssVariables.length < 10) {
                setToastMessage("No color data available to export. Please add some primary colors first.");
                setToastType("error");
                setShowToast(true);
                return;
            }

            const success = await copyToClipboard(scssVariables);

            if (success) {
                setToastMessage("SCSS variables copied to clipboard!");
                setToastType("success");
            } else {
                // Show the generated content in the error message as a fallback
                setToastMessage("Clipboard access failed. Check browser console for generated SCSS variables.");
                console.log("Generated SCSS Variables:\n", scssVariables);
                setToastType("error");
            }
            setShowToast(true);
        } catch (error) {
            setToastMessage(`Failed to export SCSS variables: ${error instanceof Error ? error.message : String(error)}`);
            setToastType("error");
            setShowToast(true);
        }
    };

    const handleCloseToast = () => {
        setShowToast(false);
    };

    return (
        <>
            <div className={"sticky-bottom figma-p-md"}>
                <div id="nav-bottom">
                    <div className={"hstack gap-0"}>
                        <div className={"vstack gap-2"}>
                            <div className={"hstack mx-auto"}>
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
                            </div>
                            <div className={"hstack mx-auto"}>
                                <button
                                    className={"btn btn-primary figma-bg-primary figma-text-light figma-mr-sm"}
                                    onClick={handleExportCSS}
                                    disabled={isCreatingVariables || isCreatingStyles || isCreatingSwatches}
                                >
                                    Copy CSS Variables
                                </button>
                                <button
                                    className={"btn btn-primary figma-bg-primary figma-text-light"}
                                    onClick={handleExportSCSS}
                                    disabled={isCreatingVariables || isCreatingStyles || isCreatingSwatches}
                                >
                                    Copy SCSS Variables
                                </button>
                            </div>
                        </div>
                        <div className={"d-inline-block figma-ml-xs"}>
                            <Help {...getTooltipProps("OUTPUT_BUTTONS")} className={"figma-ml-xs"}
                            />
                        </div>

                    </div>
                </div>
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
