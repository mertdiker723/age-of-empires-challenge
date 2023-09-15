import { useState, useEffect } from 'react';
import FacebookCircularProgress from '../Loader/facebookCircularProgress';

type ImageLoaderProps = {
    src: string;
    className: string;
    alt: string;
}
const ImageLoader = ({ src, className, alt }: ImageLoaderProps) => {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const image = new Image();
        image.src = src;

        image.onload = () => {
            setIsLoading(false);
        };
    }, [src]);

    return (
        <div>
            {isLoading ? (
                <FacebookCircularProgress />
            ) : (
                <img src={src} className={className} alt={alt} />
            )}
        </div>
    );
};

export default ImageLoader;