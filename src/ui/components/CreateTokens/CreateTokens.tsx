import Toggle from "@ui/components/helpers/Toggle";
import Group from "@ui/components/helpers/Group";
import React, {useState} from "react";
import useTokenNameStore from "@ui/store/useTokenNameStore";
import Explain from "@ui/components/helpers/Explain";
import Button from "@ui/components/helpers/Button";
import {
    copyToClipboard,
    downloadFile,
    generateCSSVariables,
    generateSCSSVariables,
    handleExport
} from "@ui/helpers/variableExport";
import Toast from "@ui/components/helpers/Toast";
import {Col, FormControl, Row} from "react-bootstrap";
import {isValidHexColor} from "@ui/helpers/colorMethods";

export const CreateTokens = () => {
    const [toastMessage, setToastMessage] = useState("");
    const [toastType, setToastType] = useState<"success" | "error" | "primary">("success");
    const [showToast, setShowToast] = useState(false);

    const keepCSSClean = useTokenNameStore(state => state.keepCSSClean);
    const toggleKeepCSSClean = useTokenNameStore(state => state.toggleKeepCSSClean);

    const handleExportSCSS = async () => {
        const result = await handleExport(
            generateSCSSVariables,
            copyToClipboard,
            "SCSS variables copied to clipboard!"
        );

        setToastMessage(result.message);
        setToastType(result.type);
        setShowToast(true);
    };

    const handleDownloadSCSS = async () => {
        const result = await handleExport(
            generateSCSSVariables,
            downloadFile,
            "SCSS variables downloaded!",
            "scss-variables.scss"
        );

        setToastMessage(result.message);
        setToastType(result.type);
        setShowToast(true);
    };

    const handleExportCSS = async () => {
        const result = await handleExport(
            generateCSSVariables,
            copyToClipboard,
            "CSS variables copied to clipboard!"
        );

        setToastMessage(result.message);
        setToastType(result.type);
        setShowToast(true);
    };

    const handleDownloadCSS = async () => {
        const result = await handleExport(
            generateCSSVariables,
            downloadFile,
            "CSS variables downloaded!",
            "css-variables.css"
        );

        setToastMessage(result.message);
        setToastType(result.type);
        setShowToast(true);
    };

    const handleCloseToast = () => {
        setShowToast(false);
    };

    return (
        <div>
            <Explain>
                Export design tokens.
            </Explain>
            <Group>
                <p>CSS Variables</p>
                <Row className={"gx-2 mb-2"}>
                    <Col>
                        <Button
                            onClick={handleExportCSS}
                            type={'primary'}
                            className={"w-100"}
                        >
                            Clipboard</Button>
                    </Col>
                    <Col>
                        <Button
                            onClick={handleDownloadCSS}
                            type={'primary'}
                            className={"w-100"}

                        >
                            File</Button>
                    </Col>
                </Row>
            </Group>
            <Group>
                <p>SCSS Variables</p>
                <Row className={"gx-2 mb-2"}>
                    <Col xs={6}>
                        <Button
                            onClick={handleExportSCSS}
                            type={'primary'}
                            className={"w-100"}

                        >
                            Clipboard</Button>
                    </Col>
                    <Col xs={6}>
                        <Button
                            onClick={handleDownloadSCSS}
                            type={'primary'}
                            className={"w-100"}
                        >
                            File</Button>
                    </Col>
                </Row>
            </Group>
            {/*TODO: Add option for https://www.designtokens.org*/}
            {/*TODO: We now only remove training characters; let's make all standards*/}
            <Explain>
                Compliant names use standard naming and ignore naming options.
            </Explain>
            <Group>
                <div className="figma-mr-sm d-flex">
                    <Toggle
                        value={keepCSSClean}
                        onChange={toggleKeepCSSClean}
                        className={"d-inline-block figma-mr-sm"}
                        size={1}
                    />
                    <div
                        className={"d-inline-block"}>Compliant names
                    </div>
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