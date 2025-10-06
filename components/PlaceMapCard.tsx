import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faBookmark } from '@fortawesome/free-solid-svg-icons';

interface RestaurantMapCardProps {
    mapSrc: string;
    location: string;
}

export default function RestaurantMapCard({ mapSrc, location }: RestaurantMapCardProps) {
    return (
        <>
        <div className="bg-white border border-transparent rounded-lg mb-6 w-full">
            {/* Map Iframe */}
            <div className="w-full">
                <iframe
                    src={mapSrc}
                    className="w-full h-[300px] border-0"
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
            </div>

            {/* Actions */}
            <div className="flex justify-between items-center p-[10px_16px]">
                <div className="flex gap-4">
                    <FontAwesomeIcon
                        icon={faHeart}
                        className="fa-icon text-[24px] md:text-[24px] text-mtoko-dark cursor-pointer hover:text-mtoko-primary"
                    />
                </div>
                <FontAwesomeIcon
                    icon={faBookmark}
                    className="fa-icon text-[24px] md:text-[24px] text-mtoko-dark cursor-pointer hover:text-mtoko-primary"
                />
            </div>

            {/* Location */}
            <div className="px-4 font-semibold text-sm text-mtoko-dark mb-2">Location: {location}</div>
        </div>
    <div className="bg-white border border-transparent rounded-lg mb-6 w-full">
        {/* Actions */}
        <div className="flex justify-between items-center p-[10px_16px]">
            <div className="flex gap-4">
                <FontAwesomeIcon
                    icon={faHeart}
                    className="fa-icon text-[24px] md:text-[24px] text-mtoko-dark cursor-pointer hover:text-mtoko-primary"
                />
            </div>
            <FontAwesomeIcon
                icon={faBookmark}
                className="fa-icon text-[24px] md:text-[24px] text-mtoko-dark cursor-pointer hover:text-mtoko-primary"
            />
        </div>

        {/* Location */}
        <div className="flex justify-between items-center p-[10px_16px]">
            <div className="flex items-center gap-4">
                <FontAwesomeIcon
                    icon={faHeart}
                    className="fa-icon text-[24px] md:text-[24px] text-mtoko-dark cursor-pointer hover:text-mtoko-primary"
                />
                <span className="font-semibold text-sm text-mtoko-dark">location</span>
            </div>
            <span className="font-semibold text-sm text-mtoko-dark">{location}</span>
        </div>
    </div>
        </>
    );
}