import React, {useEffect, useState, useRef} from 'react';
import LeftColumn from './components/LeftColumn';
import RightColumn from './components/RightColumn';
import ColumnDivider from './components/helpers/ColumnDivider';
import Area from "./components/helpers/Area";
import { 
    dispatchPluginMessage, 
    MessageHandlers, 
    HelloMessage, 
    UiReadyMessage 
} from './interfaces/PluginMessageTypes';

const App: React.FC = () => {
    const [message, setMessage] = useState<string>('');
    const [validationErrors, setValidationErrors] = useState<string[]>([]);
    const shadeTintRef = useRef<HTMLDivElement>(null);
    const stepsInputRef = useRef<HTMLDivElement>(null);
    const stepsRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // Type-safe message handlers
        const messageHandlers: MessageHandlers = {
            hello: (message: HelloMessage) => {
                setMessage(message.message);
                console.log('Received hello message:', message);
            },
            'ui-ready': (message: UiReadyMessage) => {
                console.log('UI ready message received:', message);
            },
            'create-swatches': (message) => {
                console.log('Create swatches request:', message);
                // TODO: Implement swatch creation logic
            },
            'create-styles': (message) => {
                console.log('Create styles request:', message);
                // TODO: Implement styles creation logic
            },
            'create-variables': (message) => {
                console.log('Create variables request:', message);
                // TODO: Implement variables creation logic
            },
            error: (message) => {
                console.error('Plugin error:', message.error, message.details);
                setValidationErrors(prev => [...prev, `Plugin error: ${message.error}`]);
            }
        };

        // Type-safe message listener with validation
        window.onmessage = (event) => {
            dispatchPluginMessage(
                event.data,
                messageHandlers,
                (error: string) => {
                    console.warn('Invalid plugin message received:', error);
                    setValidationErrors(prev => [...prev, `Message validation error: ${error}`]);
                }
            );
        };

        // Tell the plugin code that the UI is ready with type safety
        const uiReadyMessage: UiReadyMessage = {
            type: 'ui-ready',
            timestamp: Date.now()
        };
        parent.postMessage({pluginMessage: uiReadyMessage}, '*');

        // Function to update the shade-tint height CSS variable
        const updateShadeTintHeight = () => {
            if (shadeTintRef.current) {
                const height = shadeTintRef.current.offsetHeight;
                document.documentElement.style.setProperty('--shade-tint-height', `${height}px`);
            }
        };

        // Function to update the steps-input dimensions CSS variables
        const updateStepsInputDimensions = () => {
            if (stepsInputRef.current) {
                const height = stepsInputRef.current.offsetHeight;
                const width = stepsInputRef.current.offsetWidth;
                document.documentElement.style.setProperty('--steps-input-height', `${height}px`);
                document.documentElement.style.setProperty('--steps-input-width', `${width}px`);
            }
        };

        // Function to update the steps height CSS variable
        const updateStepsHeight = () => {
            if (stepsRef.current) {
                const height = stepsRef.current.offsetHeight;
                document.documentElement.style.setProperty('--steps-height', `${height}px`);
            }
        };

        // Initial updates
        updateShadeTintHeight();
        updateStepsInputDimensions();
        updateStepsHeight();

        // Set up resize observers to update dimensions when content changes
        const shadeTintResizeObserver = new ResizeObserver(updateShadeTintHeight);
        const stepsInputResizeObserver = new ResizeObserver(updateStepsInputDimensions);
        const stepsResizeObserver = new ResizeObserver(updateStepsHeight);

        if (shadeTintRef.current) {
            shadeTintResizeObserver.observe(shadeTintRef.current);
        }

        if (stepsInputRef.current) {
            stepsInputResizeObserver.observe(stepsInputRef.current);
        }

        if (stepsRef.current) {
            stepsResizeObserver.observe(stepsRef.current);
        }

        // Clean up the observers when the component unmounts
        return () => {
            if (shadeTintRef.current) {
                shadeTintResizeObserver.unobserve(shadeTintRef.current);
            }
            if (stepsInputRef.current) {
                stepsInputResizeObserver.unobserve(stepsInputRef.current);
            }
            if (stepsRef.current) {
                stepsResizeObserver.unobserve(stepsRef.current);
            }
            shadeTintResizeObserver.disconnect();
            stepsInputResizeObserver.disconnect();
            stepsResizeObserver.disconnect();
        };
    }, []);

    return (
        <Area id="container">
            <div>
                <LeftColumn shadeTintRef={shadeTintRef} />
                <ColumnDivider />
                <RightColumn />
            </div>
        </Area>
    );
};

export default App;
