// Test script to verify hex validation logic
const testHexValidation = (currentValue, newInput) => {
    const newValue = currentValue + newInput;
    // Simulate the validation logic from handleColorHexChange
    if (newValue.length <= 6 && /^[0-9A-Fa-f]*$/.test(newValue)) {
        return newValue;
    }
    return currentValue; // No change if validation fails
};

console.log("Testing hex validation logic:");

// Test cases
const testCases = [
    { current: "", input: "A", expected: "A", description: "Valid hex char on empty string" },
    { current: "A", input: "B", expected: "AB", description: "Valid hex char, length < 6" },
    { current: "ABCDE", input: "F", expected: "ABCDEF", description: "Valid hex char, reaching length 6" },
    { current: "ABCDEF", input: "1", expected: "ABCDEF", description: "Valid hex char but already length 6" },
    { current: "ABC", input: "G", expected: "ABC", description: "Invalid hex char" },
    { current: "123", input: "z", expected: "123", description: "Invalid hex char (lowercase z)" },
    { current: "12", input: "9", expected: "129", description: "Valid hex digit" },
    { current: "AB", input: "c", expected: "ABc", description: "Valid hex char (lowercase)" },
];

testCases.forEach(testCase => {
    const result = testHexValidation(testCase.current, testCase.input);
    const passed = result === testCase.expected;
    console.log(`${passed ? "✓" : "✗"} ${testCase.description}: "${testCase.current}" + "${testCase.input}" = "${result}" (expected: "${testCase.expected}")`);
});