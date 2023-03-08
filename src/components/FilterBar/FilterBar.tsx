import Styles from "./FilterBar.module.scss";
import star from "../../assets/icons/star.png";
import starFull from "../../assets/icons/star-full.png";
import { useHotelsContext } from "../../store/HotelsContext";

const FilterBar = () => {
    const { filter, setFilter } = useHotelsContext();

    const handleFIlter = (idx: number) => {
        setFilter({
            ...filter,
            starRating: idx,
        });
    };

    const updateContext = (type: string, operation: string) => {
        switch ( true ) {
        case type === "adults" && operation === "increment":
            setFilter({
                ...filter,
                adults: filter.adults + 1,
            });
            break;
        case type === "adults" && operation === "decrement":
            if (filter.adults > 1) {
                setFilter({
                    ...filter,
                    adults: filter.adults - 1,
                });
            }
            break;
        case type === "children" && operation === "increment":
            setFilter({
                ...filter,
                children: filter.children + 1,
            });
            break;
        case type === "children" && operation === "decrement":
            if (filter.children > 0) {
                setFilter({
                    ...filter,
                    children: filter.children - 1,
                });
            }
            break;
        default:
            break;
        };
    };
    
    return (
        <div className={Styles.container}>
            <div className={Styles.filterContainer}>
                {Array(filter.starRating).fill(0).map((_, index) => (
                    <img key={index} src={starFull} alt="star" className={Styles.star} onClick={() => handleFIlter(index + 1)}/>
                ))}
                {Array(5 - filter.starRating).fill(0).map((_, index) => (
                    <img key={index} src={star} alt="star" className={Styles.star} onClick={() => handleFIlter(index + filter.starRating + 1)}/>
                ))}
            </div>
            <div className={Styles.filterContainer}>
                <button onClick={()=>updateContext('adults', 'decrement')} className={Styles.btn}>-</button><p>Adults: {filter.adults}</p><button onClick={()=>updateContext('adults', 'increment')} className={Styles.btn}>+</button>
            </div>
            <div className={Styles.filterContainer}>
                <button onClick={()=>updateContext('children', 'decrement')} className={Styles.btn}>-</button><p>Children: {filter.children}</p><button onClick={()=>updateContext('children', 'increment')} className={Styles.btn}>+</button>
            </div>
        </div>
    );
};

export default FilterBar;