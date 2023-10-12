import { useState } from "react";
import LoadingComponent from "./LoadingComponent";
import "./ImgComponent.scss";

interface ImgComponentProps {
  image: string;
}

const ImgComponent: React.FC<ImgComponentProps> = ({ image }) => {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <>
      {isLoading && (
        <div className="Loader-container">
          <div className="loader">
            <LoadingComponent />
          </div>
        </div>
      )}
      <img
        className="book-img"
        src={image}
        onLoad={() => setIsLoading(false)}
        onError={(e) => {
          const target = e.target as HTMLImageElement;
          target.src =
            "https://starwars-visualguide.com/assets/img/placeholder.jpg";
        }}
        alt="book-img"
      />
    </>
  );
};

export default ImgComponent;
