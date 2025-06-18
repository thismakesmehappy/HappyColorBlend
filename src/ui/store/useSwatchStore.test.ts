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

        expect(state.getShade().color).toBe('000000');
        expect(state.getTint().color).toBe('FFFFFF');
        expect(state.getPrimaryColors()).toEqual([]);
        expect(state.getNumberOfSteps()).toBe(9);
        expect(Array.from(state.getCombinedSteps())).toEqual([]);
    });

    test('setShade updates shade color and name', () => {
        const store = useSwatchStore.getState();
        store.setShade('FF0000', 'Red');

        expect(store.getShade().color).toBe('FF0000');
        expect(store.getShade().name).toBe('Red');
    });

    test('setTint updates tint color and name', () => {
        const store = useSwatchStore.getState();
        store.setTint('00ff00', 'Green');

        expect(store.getTint().color).toBe('00FF00');
        expect(store.getTint().name).toBe('Green');
    });

    test('addPrimaryColor adds a new primary color', () => {
        const store = useSwatchStore.getState();
        const newColor: SwatchStoreInputSwatch = {
            color: 'FF0000',
            name: 'Red',
            id: '1',
        };

        store.addPrimaryColor(newColor);

        expect(store.getPrimaryColors().length).toBe(1);
        expect(store.getPrimaryColors()[0]).toEqual(newColor);
    });

    test('updatePrimaryColor updates an existing primary color', () => {
        const store = useSwatchStore.getState();
        const newColor: SwatchStoreInputSwatch = {
            color: 'FF0000',
            name: 'Red',
            id: '1',
        };

        store.addPrimaryColor(newColor);
        store.updatePrimaryColor('1', '00FF00', 'Green');

        expect(store.getPrimaryColors()[0].color).toBe('00FF00');
        expect(store.getPrimaryColors()[0].name).toBe('Green');
    });

    test('removePrimaryColor removes a primary color', () => {
        const store = useSwatchStore.getState();
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

        store.addPrimaryColor(color1);
        store.addPrimaryColor(color2);
        store.removePrimaryColor('1');

        expect(store.getPrimaryColors().length).toBe(1);
        expect(store.getPrimaryColors()[0]).toEqual(color2);
    });

    test('increaseSteps increases number of steps by 2', () => {
        const store = useSwatchStore.getState();
        const initialSteps = store.numberOfSteps;

        store.increaseSteps();

        expect(store.getNumberOfSteps()).toBe(initialSteps + 2);
        expect(store.getSteps().length).toBe(11);
    });

    test('decreaseSteps decreases number of steps by 2', () => {
        const store = useSwatchStore.getState();
        store.setNumberOfSteps(5); // Set to 5 steps first
        const initialSteps = store.getNumberOfSteps();

        store.decreaseSteps();

        expect(store.getNumberOfSteps()).toBe(initialSteps - 2);
    });

    test('addCustomStep adds a custom step', () => {
        const store = useSwatchStore.getState();

        store.addCustomStep(333);

        expect(store.getCustomSteps().has(333)).toBe(true);
    });

    test('removeCustomStep removes a custom step', () => {
        const store = useSwatchStore.getState();

        store.addCustomStep(333);
        expect(store.getCustomSteps().has(333)).toBe(true);

        store.removeCustomStep(333);

        expect(store.getCustomSteps().has(333)).toBe(false);
    });

    test('setCombinedSteps combines regular and custom steps', () => {
        const store = useSwatchStore.getState();

        store.addCustomStep(333);
        store.addCustomStep(666);
        store.setCombinedSteps();

        const combinedSteps = Array.from(store.getCombinedSteps()).sort((a, b) => a - b);
        expect(combinedSteps).toEqual([50, 100, 200, 300, 333, 400, 500, 600, 666, 700, 800, 900, 950]);
    });

});

describe('buildNewSwatches', () => {
    test('builds swatches correctly', () => {
        const store = useSwatchStore.getState();

        const shade: SwatchStoreInputSwatch = {
            color: '000000',
            name: 'Black',
        };

        const tint: SwatchStoreInputSwatch = {
            color: 'FFFFFF',
            name: 'White',
        };

        const primaryColors: SwatchStoreInputSwatch[] = [
            {
                color: 'FF0000',
                name: 'Red',
                id: '1',
            }
        ];

        const swatches = buildNewSwatches(shade, tint, primaryColors, store);

        expect(swatches.length).toBe(1);
        expect(swatches[0].base).toEqual(primaryColors[0]);
        expect(swatches[0].swatches.length).toBe(11);
        expect(swatches[0].swatches[0].step).toBe(50);
        expect(swatches[0].swatches[5].step).toBe(500);
        expect(swatches[0].swatches[5].color).toBe('FF0000'); // Middle step should be the primary color
    });
});