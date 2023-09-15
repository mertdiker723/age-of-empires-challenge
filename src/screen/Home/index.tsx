// Common
import ImageLoader from '../../common/ImageLoader';

// Assets & Styles
import ageOfEmpires from "../../assets/images/age-of-empires.png";
import "./Style.scss";

const Home = () => {

    return (
        <div className="home-container">
            <ImageLoader
                className="home-container_image"
                src={ageOfEmpires}
                alt="ageOfEmpires"
            />
        </div>
    );
};

export default Home;