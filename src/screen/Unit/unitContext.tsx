import { Fragment, createContext, useContext, useReducer } from "react";

export type InitialStateType = {
    age: string;
    checkbox: {
        wood: boolean,
        food: boolean,
        gold: boolean
    };
    costs: {
        woodSlider: number,
        foodSlider: number,
        goldSlider: number,
    }
};

const initialState: InitialStateType = {
    age: "All",
    checkbox: {
        wood: false,
        food: false,
        gold: false
    },
    costs: {
        woodSlider: 0,
        foodSlider: 0,
        goldSlider: 0,
    }
};

const StringContext = createContext<InitialStateType | undefined>(initialState);
const DispatchContext = createContext<React.Dispatch<{ type: string; payload: InitialStateType }>>(() => { });

const unitEditReducer = (state: InitialStateType, action: { type: string; payload: InitialStateType }): InitialStateType => {
    const { type, payload } = action;

    switch (type) {
        case "AGE": {
            return { ...state, age: payload.age };
        }
        case "CHECKBOX": {
            return { ...state, checkbox: payload.checkbox };
        }
        case "SLIDER": {
            return { ...state, costs: payload.costs };
        }
        default:
            return state;
    }
};

export const UnitEditContextProvider = ({ children }: { children: React.ReactNode[]; }) => {
    const [state, dispatch] = useReducer(unitEditReducer, initialState);

    return (
        <StringContext.Provider value={state}>
            <DispatchContext.Provider value={dispatch}>
                {children.map((child, index) => (
                    <Fragment key={index}>{child}</Fragment>
                ))}
            </DispatchContext.Provider>
        </StringContext.Provider>
    );
};

export function useStateString() {
    const context = useContext(StringContext);
    if (context === undefined) {
        throw new Error("useStateString must be used within a UnitEditContext");
    }
    return context;
}

export function useStateDispatch() {
    const context = useContext(DispatchContext);
    if (context === undefined) {
        throw new Error("useStateDispatch must be used within a UnitEditContext");
    }
    return (action: { type: string; payload: InitialStateType }) => context(action);
}