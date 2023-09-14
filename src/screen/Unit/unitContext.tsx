import { Fragment, createContext, useContext, useReducer } from "react";

type InitialStateType = {
    age?: string;
    checkbox: boolean;
};

const initialState: InitialStateType = {
    age: "All",
    checkbox: false
};

const StringContext = createContext<InitialStateType | undefined>(undefined);
const DispatchContext = createContext<React.Dispatch<{ type: string; payload: Partial<InitialStateType> }>>(() => { });

const unitEditReducer = (state: InitialStateType, action: { type: string; payload: Partial<InitialStateType> }): InitialStateType => {
    const { type, payload } = action;
    console.log(payload);

    switch (type) {
        case "AGE": {
            return { ...state, age: payload.age };
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
    return (action: { type: string; payload: Partial<InitialStateType> }) => context(action);
}