import Styles from "./Hotels.module.scss";
import { useHotelsContext } from "../../store/HotelsContext";
import HotelComponent from "../../components/HotelComponent/HotelComponent";
import { HotelProps } from "../../types";

const Hotels = () => {
    const {hotels, filter} = useHotelsContext();

    return (
        <div className={Styles.container}>
            <div className={Styles.hotels}>
                {hotels.filter((hotel: HotelProps) => parseInt(hotel.starRating) >= filter.starRating).map((hotel: HotelProps) => (
                    <HotelComponent
                        key={hotel.id}
                        {...hotel}
                    />
                ))}
            </div>
        </div>
    );
};

export default Hotels;