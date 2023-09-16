import { useStateDispatch, useUnitState } from "../../../screen/Unit/unitContext";

const AgesTabs = () => {
    const dispatch = useStateDispatch();
    const stateUnit = useUnitState();

    const ages: string[] = ["All", "Dark", "Feudal", "Castle", "Imperial"];

    const onSelectAge = (value: string) => {
        const payload = {
            ...stateUnit,
            age: value
        };
        dispatch({
            type: "AGE", payload
        });
    };

    return (
        <div className='age-tabs'>
            {
                ages.map(item => {
                    return (
                        <button
                            onClick={() => onSelectAge(item)}
                            className={`age-tabs_item ${item === stateUnit.age ? 'selected' : ''}`}
                            key={item}>
                            {item}
                        </button>
                    );
                })
            }
        </div>
    );
};

export default AgesTabs;