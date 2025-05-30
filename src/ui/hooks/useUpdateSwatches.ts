import useSwatchStore from "../store/useSwatchStore";

const useUpdateSwatches = () => {

    const buildSwatches = useSwatchStore((state) => state.buildSwatches);
    buildSwatches();
}

export default useUpdateSwatches;