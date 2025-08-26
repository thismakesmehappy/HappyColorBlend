// Tooltip placement constants
export const PLACEMENTS = {
    BOTTOM_START: "bottom-start",
    BOTTOM_END: "bottom-end",
    TOP: "top",
    RIGHT: "right",
    LEFT: "left",
    BOTTOM: "bottom"
} as const;

// Tooltip type constants  
export const TOOLTIP_TYPES = {
    ERROR: "error",
    SUCCESS: "success",
    WARNING: "warning",
    PRIMARY: "primary",
    COMPONENT: "component"
} as const;

// Tooltip width constants
export const TOOLTIP_WIDTHS = {
    NARROW: "150",
    MEDIUM: "200",
    WIDE: "250",
    EXTRA_WIDE: "300"
} as const;

// Centralized tooltip configuration
export const TOOLTIPS = {
    PREVIEW_SWATCHES: {
        content: "Preview your generated color swatches",
        id: "preview-swatches-tooltip",
        placement: PLACEMENTS.BOTTOM_START,
        type: TOOLTIP_TYPES.COMPONENT,
        maxWidth: TOOLTIP_WIDTHS.MEDIUM
    },
    SCALE_START: {
        content: "The starting color of your scale that will be mixed with your primary colors; click the pencil to edit manually, or select an object on the board and use the eyedropper to pull the color",
        id: "scale-start-tooltip",
        placement: PLACEMENTS.BOTTOM_START,
        type: TOOLTIP_TYPES.COMPONENT,
        maxWidth: TOOLTIP_WIDTHS.NARROW
    },
    SCALE_END: {
        content: "The ending color of your scale that will be mixed with your primary colors; click the pencil to edit manually, or select an object on the board and use the eyedropper to pull the color",
        id: "scale-end-tooltip",
        placement: PLACEMENTS.BOTTOM_START,
        type: TOOLTIP_TYPES.COMPONENT,
        maxWidth: TOOLTIP_WIDTHS.NARROW
    },
    PRIMARY_COLORS: {
        content: "These are the base colors that will be mixed into scales, one scale per color; click the pust to create a new swatch and to edit manually, or select any number of objects on the board and use the eyedropper to pull the colors",
        id: "primary-colors-tooltip",
        placement: PLACEMENTS.TOP,
        type: TOOLTIP_TYPES.COMPONENT,
        maxWidth: TOOLTIP_WIDTHS.NARROW
    },
    NEUTRAL_SCALE_NAME: {
        content: "Name for the gradation created by blending your start and end colors; if mixing black and white, this would be your gray scale",
        id: "ramp-name-tooltip",
        placement: PLACEMENTS.TOP,
        type: TOOLTIP_TYPES.COMPONENT,
        maxWidth: TOOLTIP_WIDTHS.MEDIUM
    },
    EQUAL_STEPS: {
        content: "These are the evenly spaced color step values that will be used to generate your color ramps (excluding 0 and 1000)",
        id: "equal-steps-badges-tooltip",
        placement: PLACEMENTS.BOTTOM_END,
        type: TOOLTIP_TYPES.COMPONENT,
        maxWidth: TOOLTIP_WIDTHS.MEDIUM
    },
    CUSTOM_STEPS: {
        content: "These are your custom color step values that can be removed by clicking the minus icon",
        id: "custom-steps-badges-tooltip",
        placement: PLACEMENTS.TOP,
        type: TOOLTIP_TYPES.COMPONENT,
        maxWidth: TOOLTIP_WIDTHS.MEDIUM
    },
    CUSTOM_STEPS_INPUT: {
        content: "Add specific step values (1-999) to create specific color stops",
        id: "custom-steps-input-tooltip",
        placement: PLACEMENTS.RIGHT,
        type: TOOLTIP_TYPES.COMPONENT,
        maxWidth: TOOLTIP_WIDTHS.MEDIUM
    },
    EQUAL_STEPS_CONTROL: {
        content: "Create evenly distributed color stops between your scale endpoints",
        id: "equal-steps-control-tooltip",
        placement: PLACEMENTS.BOTTOM,
        type: TOOLTIP_TYPES.COMPONENT,
        maxWidth: TOOLTIP_WIDTHS.MEDIUM
    },
    TOKEN_SETTINGS: {
        content: "Customize how token names are formatted relative to the swatch name: how words are cased, how spaces are treated, and if you want to prefix or suffix with dashed or underscores",
        id: "token-settings-tooltip",
        placement: PLACEMENTS.TOP,
        type: TOOLTIP_TYPES.COMPONENT,
        maxWidth: TOOLTIP_WIDTHS.WIDE
    },
    OUTPUT_BUTTONS: {
        content: "Generate assets from your scales: swatches appear on your pasteboard, variables and styles int he corresponding panels, and CSS and SCSS are copied to your clipboard to be pasted",
        id: "output-buttons-tooltip",
        placement: PLACEMENTS.TOP,
        type: TOOLTIP_TYPES.COMPONENT,
        maxWidth: TOOLTIP_WIDTHS.MEDIUM
    }
} as const;

export type TooltipKey = keyof typeof TOOLTIPS;

// Helper function to get tooltip props for components
export const getTooltipProps = (key: TooltipKey) => TOOLTIPS[key];