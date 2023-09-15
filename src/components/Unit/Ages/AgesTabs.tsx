import { useStateDispatch, useStateString } from "../../../screen/Unit/unitContext";

const AgesTabs = () => {
    const dispatch = useStateDispatch();
    const stateString = useStateString();

    const ages: string[] = ["All", "Dark", "Feudal", "Castle", "Imperial"];

    const onSelectAge = (value: string) => {
        const payload = {
            ...stateString,
            age: value
        };
        dispatch({
            type: "AGE", payload
        });
    };
    console.log("asdas");

    return (
        <div className='age-tabs'>
            {
                ages.map(item => {
                    return (
                        <button
                            onClick={() => onSelectAge(item)}
                            className={`age-tabs_item ${item === stateString.age ? 'selected' : ''}`}
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