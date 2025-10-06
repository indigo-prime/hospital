"use client";
import Image from 'next/image';
import Link from 'next/link';
import { IoCafeOutline } from 'react-icons/io5';

export default function Filter() {
    // Sample filter data (replace with API or props in production)
    const filters = [
        { name: 'Drinks', image: '/filters/drinks.jpg', link: '/category/food/drinks' },
        { name: 'Chicken', image: '/filters/chicken.jpg', link: '/category/food/chicken' },
        { name: 'Pizza', image: '/filters/pizza.jpg', link: '/category/food/pizza' },
        { name: 'Burger', image: '/filters/burger.jpg', link: '/category/food/burger' },
        { name: 'Seafood', image: '/filters/seafood.jpg', link: '/category/food/seafood' },
        { name: 'Dessert', image: '/filters/desert.jpg', link: '/category/food/dessert' },
        { name: 'Ice Cream', image: '/filters/ice-cream.jpg', link: '/category/food/ice-cream' },
        { name: 'Coffee', image: '/filters/coffee.jpg', link: '/category/food/coffee' },
        { name: 'Fries', image: '/filters/fries.jpg', link: '/category/food/fries' },
    ];

    return (
        <section className="mt-[69px] px-[20px] sm:px-[10px] md:px-[15px] ">
            <div className="max-w-[935px] mx-auto ">
                <div className="bg-gradient-to-br from-mtoko-light via-mtoko-secondary to-mtoko-primary to-mtoko-accent-80 rounded-[16px] p-[20px] overflow-x-auto whitespace-nowrap shadow-[0_4px_12px_rgba(0,0,0,0.15)]">
                    <div className="inline-flex gap-[20px]">
                        {filters.map((filter) => (
                            <Link
                                key={filter.name}
                                href={filter.link}
                                className="flex flex-col items-center text-mtoko-light w-[70px] flex-shrink-0 cursor-pointer hover:scale-105 transition-transform duration-300 no-underline hover:text-mtoko-light"
                            >
                                <div className="w-[70px] h-[70px] rounded-full p-[3px] bg-mtoko-light flex items-center justify-center">
                                    {/* Fallback to icon if image is missing */}
                                    {filter.image ? (
                                        <Image
                                            src={filter.image}
                                            width={100}
                                            height={20}
                                            alt={filter.name}
                                            className="w-full h-full rounded-full border-2 border-mtoko-primary object-cover"
                                        />
                                    ) : (
                                        <IoCafeOutline className="w-full h-full text-mtoko-primary" />
                                    )}
                                </div>
                                <span className="mt-[8px] text-[14px] font-medium text-center text-mtoko-light whitespace-nowrap overflow-hidden text-ellipsis max-w-[70px]">
                  {filter.name}
                </span>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}