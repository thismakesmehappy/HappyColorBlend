import Toggle from "@ui/components/helpers/Toggle";
import Group from "@ui/components/helpers/Group";
import React, {useState} from "react";
import useTokenNameStore from "@ui/store/useTokenNameStore";
import Explain from "@ui/components/helpers/Explain";
import Button from "@ui/components/helpers/Button";
import useSwatchStore from "@ui/store/useSwatchStore";
import {copyToClipboard, generateCSSVariables, generateSCSSVariables} from "@ui/helpers/variableExport";
import Toast from "@ui/components/helpers/Toast";

export const CreateTokens = () => {
    const [isCreatingVariables, setIsCreatingVariables] = useState(false);
    const [isCreatingStyles, setIsCreatingStyles] = useState(false);
    const [isCreatingSwatches, setIsCreatingSwatches] = useState(false);
    const [toastMessage, setToastMessage] = useState("");
    const [toastType, setToastType] = useState<"success" | "error" | "primary">("success");
    const [showToast, setShowToast] = useState(false);

    const swatchStore = useSwatchStore();
    const tokenStore = useTokenNameStore();

    const keepCSSClean = useTokenNameStore(state => state.keepCSSClean);
    const toggleKeepCSSClean = useTokenNameStore(state => state.toggleKeepCSSClean);

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

    const handleCloseToast = () => {
        setShowToast(false);
    };
    
    return (
        <div>
            <Explain>
                Names compliant removes trailing characters and follows standard naming.
            </Explain>
            <Group>
                <div className="figma-mr-sm d-flex"><Toggle
                    value={keepCSSClean}
                    onChange={toggleKeepCSSClean}
                    className={"d-inline-block figma-mr-sm"}
                    size={2}
                />
                    <div
                        className={"d-inline-block"}>Make CSS and SCSS variable names compliant
                    </div>
                </div>
                <div className={"d-flex justify-content-center align-items-center gap-3"}>
                    Copy to clipboard:
                    <Button
                        onClick={handleExportCSS}
                        disabled={isCreatingVariables || isCreatingStyles || isCreatingSwatches}
                        type={'secondary'}
                    >
                        CSS Variables
                    </Button>
                    <Button
                        onClick={handleExportSCSS}
                        disabled={isCreatingVariables || isCreatingStyles || isCreatingSwatches}
                        type={'secondary'}
                    >
                        SCSS Variables
                    </Button>
                </div>
            </Group>
            <Toast
                message={toastMessage}
                type={toastType}
                isVisible={showToast}
                onClose={handleCloseToast}
                duration={toastType === "error" ? 5000 : 3000}
            />
        </div>
    );
};