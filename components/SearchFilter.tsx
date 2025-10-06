"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Search, Filter } from "lucide-react";

export const SearchFilter = () => {
    // Dummy data for testing
    const places = [
        { name: "Nungwi Beach", category: "Beach", mood: "Relaxed" },
        { name: "Stone Town Market", category: "Market", mood: "Cultural" },
        { name: "Mnemba Island", category: "Island", mood: "Adventure" },
        { name: "Dar es Salaam Mall", category: "Mall", mood: "Shopping" },
        { name: "Museum of Tanzania", category: "Museum", mood: "Educational" },
        { name: "Sea Cliff Restaurant", category: "Restaurant", mood: "Romantic" },
    ];

    const categories = [
        "All",
        "Restaurant",
        "Beach",
        "Island",
        "Market",
        "Mall",
        "Museum",
        "Water Park",
        "Monument",
        "Cultural Center",
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

    // States
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [selectedMood, setSelectedMood] = useState("All");

    // Filtering logic
    const filteredPlaces = places.filter((place) => {
        const matchesSearch = place.name.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = selectedCategory === "All" || place.category === selectedCategory;
        const matchesMood = selectedMood === "All" || place.mood === selectedMood;

        return matchesSearch && matchesCategory && matchesMood;
    });

    return (
        <div className="space-y-6">
            {/* Filter Card */}
            <Card className="mb-8 shadow-soft mt-4">
                <CardContent className="p-6">
                    <div className="flex items-center gap-2 mb-4">
                        <Filter className="w-5 h-5 text-sunset-orange" />
                        <h3 className="text-lg font-semibold text-ocean-blue">
                            Filter Places
                        </h3>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {/* Search Input */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Search
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

                        {/* Category Filter */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Category
                            </label>
                            <Select
                                value={selectedCategory}
                                onValueChange={(value) => setSelectedCategory(value)}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Select Category" />
                                </SelectTrigger>
                                <SelectContent>
                                    {categories.map((category) => (
                                        <SelectItem key={category} value={category}>
                                            {category}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        {/* Mood Filter */}
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
                </CardContent>
            </Card>

            {/* Filtered Results */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredPlaces.length > 0 ? (
                    filteredPlaces.map((place) => (
                        <Card key={place.name} className="p-4 shadow">
                            <h4 className="font-bold">{place.name}</h4>
                            <p className="text-sm text-gray-500">{place.category}</p>
                            <p className="text-sm italic text-gray-400">{place.mood}</p>
                        </Card>
                    ))
                ) : (
                    <p className="text-center text-gray-500">No places found.</p>
                )}
            </div>
        </div>
    );
};
