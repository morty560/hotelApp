import Styles from "./HotelComponent.module.scss";
import { useState, useEffect } from "react";
import star from "../../assets/icons/star.png";
import starFull from "../../assets/icons/star-full.png";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import { useHotelsContext } from "../../store/HotelsContext";
import { HotelProps, RoomProps } from "../../types";
import { getData } from "../../utils/getData";

const HotelComponent = ({id, name, images, address1, address2, starRating}: HotelProps) => {
    const [ hotelRooms, setHotelRooms ] = useState([]);
    const { filter } = useHotelsContext();

    const filteredRooms = hotelRooms.filter((room: RoomProps) => 
    room.occupancy.maxAdults >= filter.adults 
    && room.occupancy.maxChildren >= filter.children 
    && (room.occupancy.maxOverall ? room.occupancy.maxOverall : room.occupancy.maxChildren + room.occupancy.maxAdults) >= filter.adults + filter.children);

    useEffect(() => {
        getData(`https://obmng.dbm.guestline.net/api/roomRates/OBMNG/${id}`)
            .then((data) => {
                const {rooms} = data
                setHotelRooms(rooms);
            });
    }, [id]);

    return (
        <>
            <div className={Styles.container}>
                <div className={Styles.images}>
                    <Slider
                        dots={true}
                        infinite={true}
                        speed={500}
                        slidesToShow={1}
                        slidesToScroll={1}
                    >
                        {images.map((image) => (
                            <img alt={image.url} key={image.url} src={image.url} className={Styles.image}/>
                        ))}
                    </Slider>
                </div>
                <div className={Styles.nameContainer}>
                    <h2>{name}</h2>
                    <p>{address1}</p>
                    <p>{address2}</p>
                </div>
                <div className={Styles.starRating}>
                    {Array.from({length: parseFloat(starRating)}, (_, i) => (
                        <img alt='star' className={Styles.star} key={i} src={starFull}/>
                    ))}
                    {Array.from({length: 5 - parseFloat(starRating)}, (_, i) => (
                        <img alt='star' className={Styles.star} key={i} src={star}/>
                    ))}
                </div>
            </div>
            <div className={Styles.rooms}>
                {filteredRooms.length === 0 && 
                    <div className={Styles.room}>
                        <p>No rooms available</p>
                    </div>
                }   
                {filteredRooms.map((room: RoomProps) => (
                    <div className={Styles.room} key={room.id}>
                        <div className={Styles.roomName}>
                            <h3>{room.name}</h3>
                            <p>Adults: {room.occupancy.maxAdults}</p>
                            <p>Children: {room.occupancy.maxChildren}</p>
                        </div>
                        <div className={Styles.roomDescription}>
                            <p>{room.longDescription}</p>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
};

export default HotelComponent;