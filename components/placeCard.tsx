"use client"

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {
    faHeart,
    faComment,
    faPaperPlane,
    faBookmark,
    faMapMarkerAlt,
    faEllipsisH
} from '@fortawesome/free-solid-svg-icons';
import {Badge} from "@/components/ui/badge";
import {Button} from "@/components/ui/button";
import {useState} from 'react';

interface RestaurantCardProps {
    username: string;
    avatarSrc: string;
    imageSrc: string;
    likes: number;
    location: string;
    category: string;
}

export default function PlaceCard({username, avatarSrc, imageSrc, likes, location, category}: RestaurantCardProps) {
    const [isExpanded, setIsExpanded] = useState(false);
    const description =
        "A beautiful beach with golden sands, calm waters, and breathtaking sunsets. Perfect for family outings, romantic evenings, and water sports enthusiasts.";
    const truncatedDescription =
        description.length > 100 ? description.substring(0, 100) + "..." : description;

    return (
        <div className="bg-white border border-transparent rounded-lg mb-6">
            {/* Restaurant Header */}
            <div className="flex justify-between items-center p-[14px_16px]">
                <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-full overflow-hidden">
                        <img src={avatarSrc} alt={`${username} avatar`} className="w-full h-full object-cover"/>
                    </div>
                    <span className="font-semibold text-sm text-mtoko-dark">{username}</span>
                </div>
                <div className="cursor-pointer text-mtoko-dark">
                    <FontAwesomeIcon icon={faBookmark}
                                     className="fa-icon  text-[24px] md:text-[24px] text-mtoko-dark cursor-pointer hover:text-mtoko-primary"/>

                </div>
            </div>

            {/* Restaurant Image */}
            <div className="w-full ">
                <img src={imageSrc} alt="Restaurant" className="w-full h-auto object-cover"/>
            </div>


            {/* Description */}
            <p className="text-muted-foreground mb-4 flex-1 mt-4 ml-4">
                {isExpanded ? description : truncatedDescription}
                {description.length > 100 && (
                    <Button
                        variant="link"
                        size="sm"
                        className="p-0 h-auto text-sunset-orange"
                        onClick={() => setIsExpanded(!isExpanded)}
                    >
                        {isExpanded ? "Show Less" : "Read More"}
                    </Button>
                )}
            </p>

            {/* Location */}
            <div className="px-4 pb-4 flex items-center gap-2 text-sm text-mtoko-dark">
                <FontAwesomeIcon icon={faMapMarkerAlt}
                                 className="fa-icon text-[24px] md:text-[24px] text-mtoko-secondary"/>
                <span> {category}</span>
            </div>

            {/* Price range */}
            <div className="grid grid-rows-[1fr_auto]">
                <Badge variant="secondary"
                       className=" justify-self-end mr-3 px-4 py-2 text-[14px] bg-mtoko-secondary text-mtoko-light hover:bg-savannah-gold/30">
                    TSh 788 800 - TSh 788 888
                </Badge>
            </div>


            {/* Category Tags */}
            <div className="flex flex-wrap gap-2 mb-4 m-auto mx-auto ml-4">
                <Badge
                    variant="outline"
                    style={{
                        borderColor: "#1E90FF",
                        color: "#1E90FF",
                        backgroundColor: "rgba(30,144,255,0.1)",
                        fontSize: "16px",
                    }}
                >
                    Beach
                </Badge>
                <Badge
                    variant="outline"
                    className="border-sunset-orange/50 text-sunset-orange bg-sunset-orange/10"
                >
                    Relaxing
                </Badge>
                <Badge
                    variant="outline"
                    className="border-sunset-orange/50 text-sunset-orange bg-sunset-orange/10"
                >
                    Romantic
                </Badge>
                <Badge variant="outline" className="border-muted text-muted-foreground">
                    +2
                </Badge>
            </div>

            {/* Mood Tags */}
            <div className="flex flex-wrap gap-2 mb-4 m-auto mx-auto ml-24 ">
                <Badge
                    variant="outline"
                    style={{
                        borderColor: "#1E90FF",
                        color: "#1E90FF",
                        backgroundColor: "rgba(30,144,255,0.1)",
                        fontSize: "12px",
                    }}
                >
                    Beach
                </Badge>
                <Badge
                    variant="outline"
                    className="border-sunset-orange/50 text-sunset-orange bg-sunset-orange/10"
                >
                    Relaxing
                </Badge>
                <Badge
                    variant="outline"
                    className="border-sunset-orange/50 text-sunset-orange bg-sunset-orange/10"
                >
                    Romantic
                </Badge>
                <Badge variant="outline" className="border-muted text-muted-foreground">
                    mood
                </Badge>
            </div>


        </div>
    );
}