import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faComment, faPaperPlane, faBookmark, faMapMarkerAlt, faEllipsisH } from '@fortawesome/free-solid-svg-icons';

interface RestaurantCardProps {
    username: string;
    avatarSrc: string;
    imageSrc: string;
    likes: number;
    location: string;
    category: string;
}

export default function PlaceCard({ username, avatarSrc, imageSrc, likes, location, category }: RestaurantCardProps) {
    return (
        <div className="bg-white border border-transparent rounded-lg mb-6">
            {/* Restaurant Header */}
            <div className="flex justify-between items-center p-[14px_16px]">
                <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-full overflow-hidden">
                        <img src={avatarSrc} alt={`${username} avatar`} className="w-full h-full object-cover" />
                    </div>
                    <span className="font-semibold text-sm text-mtoko-dark">{username}</span>
                </div>
                <div className="cursor-pointer text-mtoko-dark">
                    <FontAwesomeIcon icon={faBookmark} className="fa-icon  text-[24px] md:text-[24px] text-mtoko-dark cursor-pointer hover:text-mtoko-primary" />

                </div>
            </div>

            {/* Restaurant Image */}
            <div className="w-full">
                <img src={imageSrc} alt="Restaurant" className="w-full h-auto object-cover" />
            </div>

            {/* Restaurant Actions */}
            <div className="flex justify-between items-center p-[10px_16px]">
                <div className="flex gap-4">
                    <FontAwesomeIcon icon={faHeart} className="fa-icon text-[24px] md:text-[24px] text-mtoko-secondary cursor-pointer hover:text-mtoko-primary" />
                    <FontAwesomeIcon icon={faComment} className="fa-icon text-[24px] md:text-[24px] text-mtoko-secondary cursor-pointer hover:text-mtoko-primary" />
                    <FontAwesomeIcon icon={faPaperPlane} className="fa-icon text-[24px] md:text-[24px] text-mtoko-secondary cursor-pointer hover:text-mtoko-primary" />
                </div>


            </div>

            {/* Likes */}
            <div className="px-4 font-semibold text-sm text-mtoko-dark mb-2">{likes} likes</div>

            {/* category */}
            <div className="px-4 pb-4 flex items-center gap-2 text-sm text-mtoko-dark">
                <FontAwesomeIcon icon={faMapMarkerAlt} className="fa-icon text-[24px] md:text-[24px] text-mtoko-secondary" />
                <span>Type: {category}</span>
            </div>
            {/* Location */}
            <div className="px-4 pb-4 flex items-center gap-2 text-sm text-mtoko-dark">
                <FontAwesomeIcon icon={faMapMarkerAlt} className="fa-icon text-[24px] md:text-[24px] text-mtoko-secondary" />
                <span>Location: {location}</span>
            </div>
        </div>
    );
}