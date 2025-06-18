import React, {useEffect, useState, useRef} from 'react';
import LeftColumn from './components/LeftColumn';
import RightColumn from './components/RightColumn';
import ColumnDivider from './components/helpers/ColumnDivider';
import Area from "./components/helpers/Area";

const App: React.FC = () => {
    const [message, setMessage] = useState<string>('');
    const shadeTintRef = useRef<HTMLDivElement>(null);
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
