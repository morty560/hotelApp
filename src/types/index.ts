export type HotelProps = {
    id: string;
    name: string;
    description: string;
    starRating: string;
    images: [{url: string}];
    address1: string;
    address2: string;
};

export type RoomProps = {
    id: string;
    name: string;
    longDescription: string;
    occupancy: {
        maxAdults: number;
        maxChildren: number;
        maxOverall: number;
    }
};

export type FilterProps = {
    starRating: number;
    adults: number;
    children: number;
};

export type ContextType = {
    hotels: HotelProps[];
    filter: FilterProps,
    setFilter: (filter: FilterProps) => void,
};