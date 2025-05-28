import React, {useEffect, useState, useRef} from 'react';
import LeftColumn from './components/LeftColumn';
import RightColumn from './components/RightColumn';
import ColumnDivider from './components/ColumnDivider';
import Area from "./components/Area";

const App: React.FC = () => {
    const [message, setMessage] = useState<string>('');
    const darkLightRef = useRef<HTMLDivElement>(null);
    const stepsInputRef = useRef<HTMLDivElement>(null);
    const stepsRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // Listen for messages from the plugin code
        window.onmessage = (event) => {
            // Check if pluginMessage exists before destructuring
            if (event.data.pluginMessage) {
                const {type, message} = event.data.pluginMessage;
                if (type === 'hello') {
                    setMessage(message);
                }
            }
        };

        // Tell the plugin code that the UI is ready
        parent.postMessage({pluginMessage: {type: 'ui-ready'}}, '*');

        // Function to update the dark-light height CSS variable
        const updateDarkLightHeight = () => {
            if (darkLightRef.current) {
                const height = darkLightRef.current.offsetHeight;
                document.documentElement.style.setProperty('--dark-light-height', `${height}px`);
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
        updateDarkLightHeight();
        updateStepsInputDimensions();
        updateStepsHeight();

        // Set up resize observers to update dimensions when content changes
        const darkLightResizeObserver = new ResizeObserver(updateDarkLightHeight);
        const stepsInputResizeObserver = new ResizeObserver(updateStepsInputDimensions);
        const stepsResizeObserver = new ResizeObserver(updateStepsHeight);

        if (darkLightRef.current) {
            darkLightResizeObserver.observe(darkLightRef.current);
        }

        if (stepsInputRef.current) {
            stepsInputResizeObserver.observe(stepsInputRef.current);
        }

        if (stepsRef.current) {
            stepsResizeObserver.observe(stepsRef.current);
        }

        // Clean up the observers when the component unmounts
        return () => {
            if (darkLightRef.current) {
                darkLightResizeObserver.unobserve(darkLightRef.current);
            }
            if (stepsInputRef.current) {
                stepsInputResizeObserver.unobserve(stepsInputRef.current);
            }
            if (stepsRef.current) {
                stepsResizeObserver.unobserve(stepsRef.current);
            }
            darkLightResizeObserver.disconnect();
            stepsInputResizeObserver.disconnect();
            stepsResizeObserver.disconnect();
        };
    }, []);

    return (
        <Area id="container">
            <div>
                <LeftColumn darkLightRef={darkLightRef} />
                <ColumnDivider />
                <RightColumn stepsRef={stepsRef} equalStepsRef={stepsInputRef} />
            </div>
        </Area>
    );
};

export default App;
