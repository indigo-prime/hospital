"use client";

import { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faUtensils, faStore, faSwimmer, faFutbol, faCocktail, faMusic, faWifi, faChair, faChild, faParking } from '@fortawesome/free-solid-svg-icons';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';

export default function SearchForm() {
    // State for form inputs
    const [priceRange, setPriceRange] = useState([3000, 7000]);
    const [sliderDirection, setSliderDirection] = useState('');
    const [categories, setCategories] = useState({
        'Fast Food': false,
        Restaurant: false,
        Swimming: false,
        Sports: false,
        'Night Life': false,
    });
    const [features, setFeatures] = useState({
        'Live Music': false,
        Wifi: false,
        'Outdoor Seats': false,
        'Kids Friendly': false,
        Parking: false,
    });
    const [ratings, setRatings] = useState({
        '5 stars': false,
        '4 stars': false,
        '3 stars': false,
        '2 stars': false,
        '1 star': false,
    });
    const [focusedSection, setFocusedSection] = useState('');

    const timerRef = useRef(null);

    const min = 0;
    const max = 10000;
    const step = 200;

    const currencyFormatter = new Intl.NumberFormat('en', {
        style: 'currency',
        currency: 'USD',
        maximumFractionDigits: 0,
    });

    useEffect(() => {
        return () => clearTimeout(timerRef.current);
    }, []);

    const handleSliderChange = (values) => {
        const previousMin = priceRange[0];
        const previousMax = priceRange[1];
        const newMin = values[0];
        const newMax = values[1];

        if (newMin > previousMin || newMax > previousMax) {
            setSliderDirection('up');
        } else if (newMin < previousMin || newMax < previousMax) {
            setSliderDirection('down');
        }

        setPriceRange(values);

        clearTimeout(timerRef.current);
        timerRef.current = setTimeout(() => setSliderDirection(''), 66);
    };

    const handleCategoryChange = (cat) => {
        setCategories((prev) => ({ ...prev, [cat]: !prev[cat] }));
    };

    const handleFeatureChange = (feature) => {
        setFeatures((prev) => ({ ...prev, [feature]: !prev[feature] }));
    };

    const handleRatingChange = (rating) => {
        setRatings((prev) => ({ ...prev, [rating]: !prev[rating] }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form submitted:', { priceRange, categories, features, ratings });
    };

    const handleSectionFocus = (section) => {
        setFocusedSection(section);
    };

    // Marks for pips (every 200, labels every 2000)
    const marks = {};
    for (let i = min; i <= max; i += step) {
        marks[i] = i % 2000 === 0 ? <span className="rc-slider-mark-text">{currencyFormatter.format(i)}</span> : null;
    }

    // Icon mappings for categories and features
    const categoryIcons = {
        'Fast Food': faUtensils,
        Restaurant: faStore,
        Swimming: faSwimmer,
        Sports: faFutbol,
        'Night Life': faCocktail,
    };

    const featureIcons = {
        'Live Music': faMusic,
        Wifi: faWifi,
        'Outdoor Seats': faChair,
        'Kids Friendly': faChild,
        Parking: faParking,
    };

    return (
        <div className="mt-[60px]">
            <form onSubmit={handleSubmit} className="max-w-[90vw] w-[640px] mx-auto bg-transparent rounded-lg p-5 relative z-10">
                {/* Header Section */}
                <div
                    className={`mb-3 bg-white border ${focusedSection === 'header' ? 'border-2 border-mtoko-primary' : 'border-[#dadce0]'} rounded-lg p-6 pt-5 relative transition-border duration-300`}
                    onClick={() => handleSectionFocus('header')}
                >
                    <div className="absolute top-[-1px] left-[-1px] w-[calc(100%+2px)] h-[10px] bg-mtoko-primary rounded-t-lg" />
                    <h1 className="font-['Roboto',_sans-serif] text-[32px] font-normal text-mtoko-dark leading-[135%]">
                        MTOKO
                    </h1>
                    <p className="font-['Roboto',_sans-serif] text-[14px] text-mtoko-dark mt-3">
                        Hi there! "Pick your vibe: set your budget, choose your spot, filter by fun, match features, and let top-rated adventures find you."
                    </p>
                </div>

                {/* Price Range Section */}
                <div
                    className={`mb-3 bg-white border ${focusedSection === 'price' ? 'border-2 border-mtoko-primary' : 'border-[#dadce0]'} rounded-lg p-6 pt-5 pb-15 relative transition-border duration-300`}
                    onClick={() => handleSectionFocus('price')}
                >
                    <label className="block text-mtoko-primary text-[16px] mb-2">What's your price range *</label>
                    <div className="flex justify-between mb-2 text-[14px] text-mtoko-primary">
                        <span>{currencyFormatter.format(priceRange[0])}</span>
                        <span>{currencyFormatter.format(priceRange[1])}</span>
                    </div>
                    <div className="relative mt-4">
                        <Slider
                            range
                            min={min}
                            max={max}
                            step={step}
                            value={priceRange}
                            onChange={handleSliderChange}
                            className={`rc-slider ${sliderDirection}`}
                            railStyle={{ backgroundColor: '#ccc', height: '5px', borderRadius: '3px' }}
                            trackStyle={{ background: 'linear-gradient(to right, #ccc, #FF6B00)', height: '5px', borderRadius: '3px' }}
                            handleStyle={{
                                width: '20px',
                                height: '20px',
                                backgroundColor: 'white',
                                border: '2px solid #FF6B00',
                                borderRadius: '50%',
                                top: '50%',
                                transform: 'translateY(-50%)',
                            }}
                            dotStyle={{ width: '1px', height: '5px', backgroundColor: 'rgba(51, 51, 51, 0.5)', border: 'none', borderRadius: '0', top: '10px' }}
                            marks={marks}
                        />
                    </div>
                </div>

                {/* Location Section */}
                <div
                    className={`mb-3 bg-white border ${focusedSection === 'location' ? 'border-2 border-mtoko-primary' : 'border-[#dadce0]'} rounded-lg p-6 pt-5 relative transition-border duration-300`}
                    onClick={() => handleSectionFocus('location')}
                >
                    <label className="block text-mtoko-primary text-[16px] mb-2">What's the location in mind *</label>
                    <input
                        type="text"
                        className="w-full bg-transparent border-none border-b border-[#dadce0] pb-2 outline-none transition-border duration-300 focus:border-b-2 focus:border-mtoko-primary"
                        placeholder="Enter location"
                        onFocus={() => handleSectionFocus('location')}
                    />
                </div>

                {/* Categories Section */}
                <div
                    className={`mb-3 bg-white border ${focusedSection === 'categories' ? 'border-2 border-mtoko-primary' : 'border-[#dadce0]'} rounded-lg p-6 pt-5 relative transition-border duration-300`}
                    onClick={() => handleSectionFocus('categories')}
                >
                    <label className="block text-mtoko-primary text-[16px] mb-2 col-span-2">Choose your categories</label>
                    <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                        {['Fast Food', 'Restaurant', 'Swimming', 'Sports', 'Night Life'].map((cat) => (
                            <div key={cat} className="form-element relative">
                                <input
                                    type="checkbox"
                                    id={cat}
                                    checked={categories[cat]}
                                    onChange={() => handleCategoryChange(cat)}
                                    className="absolute opacity-0 peer"
                                    onFocus={() => handleSectionFocus('categories')}
                                />
                                <label
                                    htmlFor={cat}
                                    className="flex flex-col justify-center items-center h-full cursor-pointer border-2 border-[#ddd] bg-white shadow-[0_5px_20px_2px_rgba(0,0,0,0.1)] text-center rounded-[5px] p-2 transition-all duration-200 peer-checked:border-mtoko-primary peer-checked:bg-mtoko-primary/10"
                                >
                                    <FontAwesomeIcon icon={categoryIcons[cat]} className="text-[25px]  text-mtoko-secondary peer-checked:text-mtoko-primary transition-all duration-200" />
                                    <span className="text-[15px]  text-mtoko-dark peer-checked:text-mtoko-primary mt-2 transition-all duration-200">{cat}</span>
                                    <span className="absolute top-2 left-2 w-[18px] h-[18px] bg-mtoko-primary text-white text-[14px] font-semibold rounded-full flex items-center justify-center opacity-0 scale-50 peer-checked:opacity-100 peer-checked:scale-100 transition-all duration-200">✓</span>
                                </label>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Special Features Section */}
                <div
                    className={`mb-3 bg-white border ${focusedSection === 'features' ? 'border-2 border-mtoko-primary' : 'border-[#dadce0]'} rounded-lg p-6 pt-5 relative transition-border duration-300`}
                    onClick={() => handleSectionFocus('features')}
                >
                    <label className="block text-mtoko-primary text-[16px] mb-2 col-span-2">Special Features</label>
                    <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                        {['Live Music', 'Wifi', 'Outdoor Seats', 'Kids Friendly', 'Parking'].map((feature) => (
                            <div key={feature} className="form-element relative">
                                <input
                                    type="checkbox"
                                    id={feature}
                                    checked={features[feature]}
                                    onChange={() => handleFeatureChange(feature)}
                                    className="absolute opacity-0 peer"
                                    onFocus={() => handleSectionFocus('features')}
                                />
                                <label
                                    htmlFor={feature}
                                    className="flex flex-col justify-center items-center h-full cursor-pointer border-2 border-[#ddd] bg-white shadow-[0_5px_20px_2px_rgba(0,0,0,0.1)] text-center rounded-[5px] p-2 transition-all duration-200 peer-checked:border-mtoko-primary peer-checked:bg-mtoko-primary/10"
                                >
                                    <FontAwesomeIcon icon={featureIcons[feature]} className="text-[25px] text-mtoko-secondary peer-checked:text-mtoko-primary transition-all duration-200" />
                                    <span className="text-[15px] text-mtoko-dark peer-checked:text-mtoko-primary mt-2 transition-all duration-200">{feature}</span>
                                    <span className="absolute top-2 left-2 w-[18px] h-[18px] bg-mtoko-primary text-white text-[14px] font-semibold rounded-full flex items-center justify-center opacity-0 scale-50 peer-checked:opacity-100 peer-checked:scale-100 transition-all duration-200">✓</span>
                                </label>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Ratings Section */}
                <div
                    className={`mb-3 bg-white border ${focusedSection === 'ratings' ? 'border-2 border-mtoko-primary' : 'border-[#dadce0]'} rounded-lg p-6 pt-5 relative transition-border duration-300`}
                    onClick={() => handleSectionFocus('ratings')}
                >
                    <label className="block text-mtoko-primary text-[16px] mb-2">Ratings *</label>
                    <ul className="list-none p-5 flex flex-wrap gap-2">
                        {['5 stars', '4 stars', '3 stars', '2 stars', '1 star'].map((rating) => (
                            <li key={rating} className="inline">
                                <input
                                    type="checkbox"
                                    id={rating}
                                    checked={ratings[rating]}
                                    onChange={() => handleRatingChange(rating)}
                                    className="absolute opacity-0 peer"
                                    onFocus={() => handleSectionFocus('ratings')}
                                />
                                <label
                                    htmlFor={rating}
                                    className="inline-flex items-center bg-white border-2 border-[rgba(139,139,139,0.3)] text-mtoko-primary rounded-[25px] whitespace-nowrap m-[3px_0] px-[12px] py-[8px] cursor-pointer transition-all duration-200 peer-checked:border-mtoko-primary peer-checked:bg-mtoko-primary peer-checked:text-white"
                                >
                                    <FontAwesomeIcon icon={faStar} className="text-[12px] mr-1.5 transition-transform duration-300 peer-checked:rotate-[-360deg]" />
                                    <span>{rating}</span>
                                </label>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Submit Button */}
                <button type="submit" className="bg-mtoko-primary text-white font-bold py-3 px-6 rounded-lg transition-all duration-300 hover:bg-mtoko-secondary">
                    Take Me There
                </button>
            </form>
        </div>
    );
}