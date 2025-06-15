// This file can be used to test React components in a more integrated way
// You can run this with Node.js or import it in a browser environment

// Import React and ReactDOM
const React = require('react');
const ReactDOM = require('react-dom');

// Import the components you want to test
// Note: You'll need to adjust the imports based on your actual file structure
const NumberToggle = require('./src/ui/components/helpers/NumberToggle').default;

// Create a simple test harness
class TestHarness {
    constructor() {
        this.tests = [];
    }

    addTest(name, component) {
        this.tests.push({name, component});
    }

    runTests(container) {
        if (!container) {
            console.error('No container provided for tests');
            return;
        }

        // Clear the container
        container.innerHTML = '';

        // Create a container for each test
        this.tests.forEach(test => {
            const testContainer = document.createElement('div');
            testContainer.className = 'test-container';

            const testName = document.createElement('h3');
            testName.textContent = test.name;
            testContainer.appendChild(testName);

            const componentContainer = document.createElement('div');
            componentContainer.className = 'component-container';
            testContainer.appendChild(componentContainer);

            container.appendChild(testContainer);

            // Render the component
            ReactDOM.render(test.component, componentContainer);
        });
    }
}

// Create a test harness
const harness = new TestHarness();

// Add tests for NumberToggle
function createNumberToggleTests() {
    // Default NumberToggle
    harness.addTest('Default NumberToggle', React.createElement(() => {
        const [value, setValue] = React.useState(5);
        return React.createElement(NumberToggle, {
            decreaseFunction: () => setValue(value - 1),
            increaseFunction: () => setValue(value + 1),
            value: value
        });
    }));

    // NumberToggle with Min Value
    harness.addTest('NumberToggle with Min Value', React.createElement(() => {
        const [value, setValue] = React.useState(3);
        return React.createElement(NumberToggle, {
            decreaseFunction: () => setValue(value - 1),
            increaseFunction: () => setValue(value + 1),
            minValue: 1,
            value: value
        });
    }));

    // NumberToggle with Max Value
    harness.addTest('NumberToggle with Max Value', React.createElement(() => {
        const [value, setValue] = React.useState(8);
        return React.createElement(NumberToggle, {
            decreaseFunction: () => setValue(value - 1),
            increaseFunction: () => setValue(value + 1),
            maxValue: 10,
            value: value
        });
    }));

    // NumberToggle with Min and Max Values
    harness.addTest('NumberToggle with Min and Max Values', React.createElement(() => {
        const [value, setValue] = React.useState(5);
        return React.createElement(NumberToggle, {
            decreaseFunction: () => setValue(value - 1),
            increaseFunction: () => setValue(value + 1),
            minValue: 1,
            maxValue: 10,
            value: value
        });
    }));

    // NumberToggle at Min Value
    harness.addTest('NumberToggle at Min Value', React.createElement(() => {
        const [value, setValue] = React.useState(1);
        return React.createElement(NumberToggle, {
            decreaseFunction: () => setValue(value - 1),
            increaseFunction: () => setValue(value + 1),
            minValue: 1,
            maxValue: 10,
            value: value
        });
    }));

    // NumberToggle at Max Value
    harness.addTest('NumberToggle at Max Value', React.createElement(() => {
        const [value, setValue] = React.useState(10);
        return React.createElement(NumberToggle, {
            decreaseFunction: () => setValue(value - 1),
            increaseFunction: () => setValue(value + 1),
            minValue: 1,
            maxValue: 10,
            value: value
        });
    }));
}

// Create the tests
createNumberToggleTests();

// Export the harness for use in browser or Node.js
if (typeof module !== 'undefined') {
    module.exports = harness;
}

// If running in a browser, automatically run the tests when the DOM is ready
if (typeof window !== 'undefined') {
    window.addEventListener('DOMContentLoaded', () => {
        const container = document.getElementById('test-container');
        if (container) {
            harness.runTests(container);
        } else {
            console.error('No test container found in the DOM');
        }
    });
}
