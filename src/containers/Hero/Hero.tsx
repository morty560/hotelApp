import style from "./Hero.module.scss";
import FilterBar from "../../components/FilterBar/FilterBar";

const Hero = () => {
    return (
        <div className={style.hero}>
            <div className="hero__content">
                <h1 className={style.heroTitle}>Find your perfect hotel</h1>
            </div>
            <FilterBar />
        </div>
    );
};

export default Hero;
