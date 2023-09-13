import { useReducer } from "react";

type AgeTabsReducerProps = {
    age: string;
}
const AgesTabs = () => {
    const [state, setState] = useReducer((currentState: AgeTabsReducerProps, newState: AgeTabsReducerProps) => ({ ...currentState, ...newState }), {
        age: "All"
    });
    const { age } = state;
    const ages: string[] = ["All", "Dark", "Feudal", "Castle", "Imperial"];

    const onSelectAge = (value: string) => {
        setState({
            age: value
        })
    }
    return (
        <div className='age-tabs'>
            {
                ages.map(item => {
                    return <button onClick={() => onSelectAge(item)} className={`age-tabs_item ${item === age ? 'selected' : ''}`} key={item}>{item}</button>
                })
            }
        </div>
    )
}

export default AgesTabs