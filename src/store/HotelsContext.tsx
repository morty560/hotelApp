import { createContext, ReactNode, useContext, useState} from "react";
import { ContextType, FilterProps } from "../types";

export const initialState: ContextType = {
    hotels: [],
    filter: {
        starRating: 3,
        adults: 1,
        children: 0,
    },
    setFilter: () => {},
};

export const HotelsContext = createContext<ContextType>(initialState);

const HotelsContextProvider = ({ children, context }: {children: ReactNode, context: ContextType}) => {
        const [filter, setFilter] = useState<FilterProps>(initialState.filter);

        return (
            <HotelsContext.Provider value={{...context, filter, setFilter}}>
                {children}
            </HotelsContext.Provider>
        );
    };

export const useHotelsContext = (): ContextType => useContext(HotelsContext);

export default HotelsContextProvider;
