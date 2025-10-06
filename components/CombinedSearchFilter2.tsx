"use client";

import { useState, useRef, useEffect } from "react";
import Image from 'next/image';
import { IoCafeOutline } from 'react-icons/io5';
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Search, Filter, Check } from "lucide-react";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";

export const CombinedSearchFilter2 = () => {
    // Categories from Filter.jsx
    const categories = [
        { name: 'Hotel', image: '/filters/drinks.jpg' },
        { name: 'Restaurants', image: '/filters/chicken.jpg' },
        { name: 'Caffe', image: '/filters/pizza.jpg' },
        { name: 'Mama Ntilie', image: '/filters/burger.jpg' },
        { name: 'Desserts spots', image: '/filters/seafood.jpg' },
        { name: 'BBQ & Grills', image: '/filters/desert.jpg' },
        { name: 'Ice Cream', image: '/filters/ice-cream.jpg' },
        { name: 'Fast Food', image: '/filters/coffee.jpg' },
        { name: 'SeaFoods', image: '/filters/fries.jpg' },
        { name: 'Cultural Food', image: '/filters/ice-cream.jpg' },
        { name: 'Bites', image: '/filters/coffee.jpg' },
        { name: 'Fruits', image: '/filters/fries.jpg' },
    ];

    const moods = [
        "All",
        "Romantic",
        "Family-Friendly",
        "Adventure",
        "Cultural",
        "Relaxed",
        "Business",
        "Educational",
        "Shopping",
        "Historical",
    ];

    // Updated dummy data with price field
    const places = [
        { name: "Beach Cafe", categories: ["Caffe", "SeaFoods", "Ice Cream"], mood: "Relaxed", price: 5000 },
        { name: "City Grill", categories: ["BBQ & Grills", "Fast Food", "Restaurants"], mood: "Family-Friendly", price: 8000 },
        { name: "Downtown Hotel", categories: ["Hotel", "Desserts spots", "Cultural Food"], mood: "Romantic", price: 12000 },
        { name: "Market Bites", categories: ["Bites", "Fruits", "Mama Ntilie"], mood: "Cultural", price: 3000 },
        { name: "Seafood Spot", categories: ["SeaFoods", "BBQ & Grills"], mood: "Adventure", price: 9500 },
        { name: "Quick Eats", categories: ["Fast Food", "Ice Cream", "Fruits"], mood: "Shopping", price: 4000 },
    ];

    // States
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
    const [selectedMood, setSelectedMood] = useState("All");
    const [priceRange, setPriceRange] = useState<[number, number]>([2000, 10000]);

    const min = 0;
    const max = 15000;
    const step = 500;
    const currencyFormatter = new Intl.NumberFormat("en", {
        style: "currency",
        currency: "TZS",
        maximumFractionDigits: 0,
    });

    // Toggle category selection
    const toggleCategory = (categoryName: string) => {
        setSelectedCategories((prev) =>
            prev.includes(categoryName)
                ? prev.filter((cat) => cat !== categoryName)
                : [...prev, categoryName]
        );
    };

    // Filtering logic
    const filteredPlaces = places.filter((place) => {
        const matchesSearch = place.name.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesMood = selectedMood === "All" || place.mood === selectedMood;
        const matchesCategory =
            selectedCategories.length === 0 ||
            place.categories.some((cat) => selectedCategories.includes(cat));
        const matchesPrice = place.price >= priceRange[0] && place.price <= priceRange[1];

        return matchesSearch && matchesCategory && matchesMood && matchesPrice;
    });

    return (
        <div className="space-y-6">
            {/* Category Filter Section */}
            <section className="mt-[69px] px-[20px] sm:px-[10px] md:px-[15px]">
                <div className="max-w-[935px] mx-auto">
                    <div className="bg-gradient-to-br from-mtoko-light via-mtoko-secondary to-mtoko-primary rounded-[16px] p-[20px] overflow-x-auto whitespace-nowrap shadow-[0_4px_12px_rgba(0,0,0,0.15)]">
                        <div className="inline-flex gap-[20px]">
                            {categories.map((category) => {
                                const isSelected = selectedCategories.includes(category.name);
                                return (
                                    <div
                                        key={category.name}
                                        onClick={() => toggleCategory(category.name)}
                                        className="flex flex-col items-center text-mtoko-light w-[70px] flex-shrink-0 cursor-pointer hover:scale-105 transition-transform duration-300 relative"
                                    >
                                        <div className="w-[70px] h-[70px] rounded-full p-[3px] bg-mtoko-light flex items-center justify-center relative">
                                            {category.image ? (
                                                <Image
                                                    src={category.image}
                                                    width={100}
                                                    height={20}
                                                    alt={category.name}
                                                    className="w-full h-full rounded-full border-2 border-mtoko-primary object-cover"
                                                />
                                            ) : (
                                                <IoCafeOutline className="w-full h-full text-mtoko-primary" />
                                            )}
                                            {isSelected && (
                                                <Check className="absolute top-0 right-0 w-5 h-5 text-green-500 bg-white rounded-full p-1" />
                                            )}
                                        </div>
                                        <span className="mt-[8px] text-[14px] font-medium text-center text-mtoko-light max-w-[70px] truncate">
                                            {category.name}
                                        </span>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </section>

            {/* Location, Mood & Price Filters */}
            <Card className="mb-8 shadow-soft max-w-[935px] mx-auto">
                <CardContent className="p-6 space-y-6">
                    <div className="flex items-center gap-2 mb-2">
                        <Filter className="w-5 h-5 text-sunset-orange" />
                        <h3 className="text-lg font-semibold text-ocean-blue">
                            Additional Filters
                        </h3>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Location Name */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Location Name
                            </label>
                            <div className="relative">
                                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                <Input
                                    type="text"
                                    placeholder="Search places..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="pl-10"
                                />
                            </div>
                        </div>

                        {/* Mood */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Mood
                            </label>
                            <Select
                                value={selectedMood}
                                onValueChange={(value) => setSelectedMood(value)}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Select Mood" />
                                </SelectTrigger>
                                <SelectContent>
                                    {moods.map((mood) => (
                                        <SelectItem key={mood} value={mood}>
                                            {mood}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    {/* Price Range */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Price Range
                        </label>
                        <div className="flex justify-between text-xs text-gray-600 mb-2">
                            <span>{currencyFormatter.format(priceRange[0])}</span>
                            <span>{currencyFormatter.format(priceRange[1])}</span>
                        </div>
                        <Slider
                            range
                            min={min}
                            max={max}
                            step={step}
                            value={priceRange}
                            onChange={(val) => setPriceRange(val as [number, number])}
                            railStyle={{ backgroundColor: "#ccc", height: 6 }}
                            trackStyle={{ backgroundColor: "#FF6B00", height: 6 }}
                            handleStyle={{
                                width: 18,
                                height: 18,
                                border: "2px solid #FF6B00",
                                backgroundColor: "#fff",
                            }}
                        />
                    </div>
                </CardContent>
            </Card>

            {/* Filtered Results */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredPlaces.length > 0 ? (
                    filteredPlaces.map((place) => (
                        <Card key={place.name} className="p-4 shadow">
                            <h4 className="font-bold">{place.name}</h4>
                            <p className="text-sm text-gray-500">{place.categories.join(", ")}</p>
                            <p className="text-sm italic text-gray-400">{place.mood}</p>
                            <p className="text-sm font-semibold text-mtoko-primary">
                                {currencyFormatter.format(place.price)}
                            </p>
                        </Card>
                    ))
                ) : (
                    <p className="text-center text-gray-500">No places found.</p>
                )}
            </div>
        </div>
    );
};
