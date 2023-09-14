import { useReducer } from "react";
import { useStateDispatch, useStateString } from "../../../screen/Unit/unitContext";

// type AgeTabsReducerProps = {
//     age: string;
// }
const AgesTabs = () => {
    // const [state, setState] = useReducer((currentState: AgeTabsReducerProps, newState: AgeTabsReducerProps) => ({ ...currentState, ...newState }), {
    //     age: "All"
    // });

    const dispatch = useStateDispatch();
    const stateString = useStateString();

    const ages: string[] = ["All", "Dark", "Feudal", "Castle", "Imperial"];

    const onSelectAge = (value: string) => {
        dispatch({
            type: "AGE", payload: {
                age: value
            }
        })
    }

    return (
        <div className='age-tabs'>
            {
                ages.map(item => {
                    return <button onClick={() => onSelectAge(item)} className={`age-tabs_item ${item === stateString.age ? 'selected' : ''}`} key={item}>{item}</button>
                })
            }
        </div>
    )
}

export default AgesTabs