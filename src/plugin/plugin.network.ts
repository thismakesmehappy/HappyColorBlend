import {PLUGIN, UI} from "@common/networkSides";
import {createAllSwatchVariables} from "./services/variableService";
import {createAllSwatchStyles} from "./services/styleService";
import {createAllSwatches} from "./services/swatchService";

export const PLUGIN_CHANNEL = PLUGIN.channelBuilder()
    .emitsTo(UI, (message) => {
        figma.ui.postMessage(message);
    })
    .receivesFrom(UI, (next) => {
        const listener: MessageEventHandler = (event) => next(event);
        figma.ui.on("message", listener);
        return () => figma.ui.off("message", listener);
    })
    .startListening();

// ---------- Message handlers

PLUGIN_CHANNEL.registerMessageHandler("ping", () => {
    return "pong";
});

PLUGIN_CHANNEL.registerMessageHandler("hello", (text) => {
    console.log("UI side said:", text);
});

PLUGIN_CHANNEL.registerMessageHandler("createRect", (width, height) => {
    if (figma.editorType === "figma") {
        const rect = figma.createRectangle();
        rect.x = 0;
        rect.y = 0;
        rect.name = "Plugin Rectangle # " + Math.floor(Math.random() * 9999);
        rect.fills = [
            {
                type: "SOLID",
                color: {
                    r: Math.random(),
                    g: Math.random(),
                    b: Math.random(),
                },
            },
        ];
        rect.resize(width, height);
        figma.currentPage.appendChild(rect);
        figma.viewport.scrollAndZoomIntoView([rect]);
        figma.closePlugin();
    }
});

PLUGIN_CHANNEL.registerMessageHandler("exportSelection", async () => {
    const selectedNodes = figma.currentPage.selection;
    if (selectedNodes.length === 0) {
        throw new Error("No selection is present.");
    }

    const selection = selectedNodes[0];
    const bytes = await selection.exportAsync({
        format: "PNG",
        contentsOnly: false,
    });

    return "data:image/png;base64," + figma.base64Encode(bytes);
});

PLUGIN_CHANNEL.registerMessageHandler("extractColorsFromSelection", async () => {
    const selectedNodes = figma.currentPage.selection;
    if (selectedNodes.length === 0) {
        throw new Error("No objects selected. Please select some objects to extract colors from.");
    }

    const extractedColors: Array<{ color: string; name: string }> = [];
    const colorSet = new Set<string>();

    function rgbToHex(r: number, g: number, b: number): string {
        const toHex = (n: number) => Math.round(n * 255).toString(16).padStart(2, '0');
        return toHex(r) + toHex(g) + toHex(b);
    }

    function extractColorsFromNode(node: SceneNode) {
        if ('fills' in node && node.fills && Array.isArray(node.fills)) {
            for (const fill of node.fills) {
                if (fill.type === 'SOLID' && fill.visible !== false) {
                    const hexColor = rgbToHex(fill.color.r, fill.color.g, fill.color.b).toUpperCase();
                    if (!colorSet.has(hexColor)) {
                        colorSet.add(hexColor);
                        extractedColors.push({
                            color: hexColor,
                            name: hexColor // Will be named properly in UI using ColorNamer
                        });
                    }
                }
            }
        }

        if ('strokes' in node && node.strokes && Array.isArray(node.strokes)) {
            for (const stroke of node.strokes) {
                if (stroke.type === 'SOLID' && stroke.visible !== false) {
                    const hexColor = rgbToHex(stroke.color.r, stroke.color.g, stroke.color.b).toUpperCase();
                    if (!colorSet.has(hexColor)) {
                        colorSet.add(hexColor);
                        extractedColors.push({
                            color: hexColor,
                            name: hexColor // Will be named properly in UI using ColorNamer
                        });
                    }
                }
            }
        }

        if ('children' in node) {
            for (const child of node.children) {
                extractColorsFromNode(child);
            }
        }
    }

    for (const node of selectedNodes) {
        extractColorsFromNode(node);
    }

    if (extractedColors.length === 0) {
        throw new Error("No solid colors found in selected objects.");
    }

    return extractedColors;
});

PLUGIN_CHANNEL.registerMessageHandler("extractSingleColorFromSelection", async () => {
    const selectedNodes = figma.currentPage.selection;
    if (selectedNodes.length === 0) {
        throw new Error("No objects selected. Please select some objects to extract a color from.");
    }

    const extractedColors: Array<{ color: string; name: string }> = [];
    const colorSet = new Set<string>();

    function rgbToHex(r: number, g: number, b: number): string {
        const toHex = (n: number) => Math.round(n * 255).toString(16).padStart(2, '0');
        return toHex(r) + toHex(g) + toHex(b);
    }

    function extractSurfaceColorsFromNode(node: SceneNode) {
        // Only extract fills (surface colors), not strokes
        if ('fills' in node && node.fills && Array.isArray(node.fills)) {
            for (const fill of node.fills) {
                if (fill.type === 'SOLID' && fill.visible !== false) {
                    const hexColor = rgbToHex(fill.color.r, fill.color.g, fill.color.b).toUpperCase();
                    if (!colorSet.has(hexColor)) {
                        colorSet.add(hexColor);
                        extractedColors.push({
                            color: hexColor,
                            name: hexColor // Will be named properly in UI using ColorNamer
                        });
                    }
                }
            }
        }

        if ('children' in node) {
            for (const child of node.children) {
                extractSurfaceColorsFromNode(child);
            }
        }
    }

    for (const node of selectedNodes) {
        extractSurfaceColorsFromNode(node);
    }

    if (extractedColors.length === 0) {
        throw new Error("No surface colors found in selected objects.");
    }

    if (extractedColors.length > 1) {
        throw new Error(`Multiple surface colors found (${extractedColors.length} colors). Please select a single object with only one surface color.`);
    }

    return extractedColors[0];
});

PLUGIN_CHANNEL.registerMessageHandler("createVariables", async (data) => {
    try {
        return await createAllSwatchVariables(data);
    } catch (error) {
        return {
            success: false,
            message: "Failed to create variables",
            error: error instanceof Error ? error.message : String(error)
        };
    }
});

PLUGIN_CHANNEL.registerMessageHandler("createStyles", async (data) => {
    try {
        return await createAllSwatchStyles(data);
    } catch (error) {
        return {
            success: false,
            message: "Failed to create styles",
            error: error instanceof Error ? error.message : String(error)
        };
    }
});

PLUGIN_CHANNEL.registerMessageHandler("createSwatches", async (data) => {
    try {
        return await createAllSwatches(data);
    } catch (error) {
        return {
            success: false,
            message: "Failed to create swatches",
            error: error instanceof Error ? error.message : String(error)
        };
    }
});
