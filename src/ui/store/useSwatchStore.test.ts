import useSwatchStore, {
    buildNewSwatches,
    SwatchStoreInputSwatch, initialState
} from './useSwatchStore';

// Reset the store before each test
beforeEach(() => {

    // Reset to initial state
    useSwatchStore.setState({
        ...initialState
    });
});

describe('useSwatchStore', () => {
    test('initial state is set correctly', () => {
        const state = useSwatchStore.getState();

        expect(state.scaleStart.color).toBe('000000');
        expect(state.scaleEnd.color).toBe('FFFFFF');
        expect(state.primaryColors).toEqual([]);
        expect(state.numberOfSteps).toBe(9);
        expect(Array.from(state.getCombinedSteps())).toEqual([]);
    });

    test('setScaleStart updates scale start color and name', () => {
        const store = useSwatchStore;
        store.getState().setScaleStart('FF0000', 'Red');
        
        const updatedState = store.getState();
        expect(updatedState.scaleStart.color).toBe('FF0000');
        expect(updatedState.scaleStart.name).toBe('Red');
    });

    test('setScaleEnd updates scale end color and name', () => {
        const store = useSwatchStore;
        store.getState().setScaleEnd('00ff00', 'Green');

        const updatedState = store.getState();
        expect(updatedState.scaleEnd.color).toBe('00FF00');
        expect(updatedState.scaleEnd.name).toBe('Green');
    });

    test('addPrimaryColor adds a new primary color', () => {
        const store = useSwatchStore;
        const newColor: SwatchStoreInputSwatch = {
            color: 'FF0000',
            name: 'Red',
            id: '1',
        };

        store.getState().addPrimaryColor(newColor);

        const updatedState = store.getState();
        expect(updatedState.primaryColors.length).toBe(1);
        expect(updatedState.primaryColors[0]).toEqual(newColor);
    });

    test('removePrimaryColor removes a primary color', () => {
        const store = useSwatchStore;
        const color1: SwatchStoreInputSwatch = {
            color: 'FF0000',
            name: 'Red',
            id: '1',
        };

        const color2: SwatchStoreInputSwatch = {
            color: '00FF00',
            name: 'Green',
            id: '2',
        };

        store.getState().addPrimaryColor(color1);
        store.getState().addPrimaryColor(color2);
        store.getState().removePrimaryColor('1');

        const updatedState = store.getState();
        expect(updatedState.primaryColors.length).toBe(1);
        expect(updatedState.primaryColors[0]).toEqual(color2);
    });

    test('increaseSteps increases number of steps by 2', () => {
        const store = useSwatchStore;
        const initialSteps = store.getState().numberOfSteps;

        store.getState().increaseSteps();

        const updatedState = store.getState();
        expect(updatedState.numberOfSteps).toBe(initialSteps + 2);
        expect(updatedState.steps.length).toBe(11);
    });

    test('decreaseSteps decreases number of steps by 2', () => {
        const store = useSwatchStore;
        // Manually set numberOfSteps since setNumberOfSteps was removed
        store.setState({ numberOfSteps: 5 });
        store.getState().createSteps(); // Rebuild steps array
        const initialSteps = store.getState().numberOfSteps;

        store.getState().decreaseSteps();

        const updatedState = store.getState();
        expect(updatedState.numberOfSteps).toBe(initialSteps - 2);
    });

    test('addCustomStep adds a custom step', () => {
        const store = useSwatchStore;

        store.getState().addCustomStep(333);

        const endStore = store.getState();

        expect(endStore.customSteps.has(333)).toBe(true);
    });

    test('removeCustomStep removes a custom step', () => {
        const store = useSwatchStore;

        store.getState().addCustomStep(333);
        expect(store.getState().customSteps.has(333)).toBe(true);

        store.getState().removeCustomStep(333);


        expect(store.getState().customSteps.has(333)).toBe(false);
    });

    test('setCombinedSteps combines regular and custom steps', () => {
        const store = useSwatchStore;

        store.getState().addCustomStep(333);
        store.getState().addCustomStep(666);
        store.getState().setCombinedSteps();

        const combinedSteps = Array.from(store.getState().getCombinedSteps()).sort((a, b) => a - b);
        expect(combinedSteps).toEqual([100, 200, 300, 333, 400, 500, 600, 666, 700, 800, 900]);
    });

});

describe('buildNewSwatches', () => {
    test('builds swatches correctly', () => {
        const store = useSwatchStore;

        // Set up the store state first
        store.getState().setCombinedSteps(); // This populates combinedSteps

        const scaleStart: SwatchStoreInputSwatch = {
            color: '000000',
            name: 'Black',
            id: 'scaleStart'
        };

        const scaleEnd: SwatchStoreInputSwatch = {
            color: 'FFFFFF',
            name: 'White',
            id: 'scaleEnd'
        };

        const primaryColors: SwatchStoreInputSwatch[] = [
            {
                color: 'FF0000',
                name: 'Red',
                id: '1',
            }
        ];

        const swatches = buildNewSwatches(scaleStart, scaleEnd, primaryColors, store.getState());

        expect(swatches.length).toBe(1);
        expect(swatches[0].base).toEqual(primaryColors[0]);
        expect(swatches[0].swatches.length).toBe(9); // Should match numberOfSteps from initial state
        expect(swatches[0].swatches[0].step).toBe(100); // First step from createSteps
        expect(swatches[0].swatches[4].step).toBe(500); // Middle step
        expect(swatches[0].swatches[4].color).toBe('FF0000'); // Middle step should be the primary color
    });
});