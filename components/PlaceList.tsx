"use client";

import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import PlaceCard from "@/components/placeCard";
import "../styles/restaurant-list.css";

export default function PlaceList() {
    const restaurants = [
        { username: "Restaurant1", avatarSrc: "/images/avatar1.jpg", imageSrc: "/images/food1.jpg", likes: 12, location: "Sinza", price: 20, name: "Special Pizza", rating: 4.5 },
        { username: "Restaurant2", avatarSrc: "/images/avatar2.jpg", imageSrc: "/images/food1.jpg", likes: 15, location: "Downtown", price: 20, name: "Special Pizza", rating: 4.5 },
        { username: "Restaurant3", avatarSrc: "/images/avatar3.jpg", imageSrc: "/images/food1.jpg", likes: 8, location: "Uptown", price: 20, name: "Special Pizza", rating: 4.5 },
        { username: "Restaurant4", avatarSrc: "/images/avatar4.jpg", imageSrc: "/images/food1.jpg", likes: 20, location: "Midtown", price: 20, name: "Special Pizza", rating: 4.5 },
        { username: "Restaurant5", avatarSrc: "/images/avatar5.jpg", imageSrc: "/images/food5.jpg", likes: 10, location: "Sinza", price: 20, name: "Special Pizza", rating: 4.5 },
        { username: "Restaurant6", avatarSrc: "/images/avatar6.jpg", imageSrc: "/images/food6.jpg", likes: 18, location: "Downtown", price: 20, name: "Special Pizza", rating: 4.5 },
        // Add more for pagination testing
    ];

    const itemsPerPage = 3;
    const [currentPage, setCurrentPage] = useState(1);
    const totalPages = Math.ceil(restaurants.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentRestaurants = restaurants.slice(startIndex, startIndex + itemsPerPage);

    const handlePageChange = (page: number) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    return (
        <section id="restaurant-list" className="restaurant-list py-8 bg-mtoko-light relative z-10">
            <div className="container max-w-[90vw] lg:max-w-[124rem] px-4 mx-auto my-4">
                <h2 className="section-heading text-center text-[clamp(2rem,4vw,2.5rem)] text-mtoko-primary py-6">You Might Like</h2>
                <div className="restaurant-grid flex flex-col items-center gap-4 max-w-[935px] mx-auto">
                    {currentRestaurants.map((restaurant, index) => (
                        <PlaceCard key={index} {...restaurant} />
                    ))}
                </div>
                <div className="pagination flex items-center justify-center gap-2 mt-6">
                    <button
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                        className="pagination-button w-8 h-8 rounded-full bg-white text-dark-blue disabled:opacity-50 flex items-center justify-center"
                        aria-label="Previous page"
                    >
                        <FontAwesomeIcon icon={faArrowLeft} className="text-sm" />
                    </button>
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                        <button
                            key={page}
                            onClick={() => handlePageChange(page)}
                            className={`pagination-button w-8 h-8 rounded-full flex items-center justify-center ${
                                currentPage === page ? "bg-mtoko-primary text-white" : "bg-white text-dark-blue"
                            }`}
                            aria-label={`Page ${page}`}
                        >
                            {page}
                        </button>
                    ))}
                    <button
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className="pagination-button w-8 h-8 rounded-full bg-white text-dark-blue disabled:opacity-50 flex items-center justify-center"
                        aria-label="Next page"
                    >
                        <FontAwesomeIcon icon={faArrowRight} className="text-sm" />
                    </button>
                </div>
            </div>
        </section>
    );
}