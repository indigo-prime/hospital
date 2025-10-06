"use client";

import { useEffect, useState } from "react";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { notFound } from "next/navigation";
import { use } from "react"; // Import React.use
import PlaceCard2 from "../../../../components/PlaceCard2";
import PlaceMapCard from "../../../../components/PlaceMapCard";
import FeaturesRules from "../../../../components/FeaturesRules";
import CommentSection from "../../../../components/CommentSection";

interface Place {
    id: string;
    name: string;
    description: string;
    location: string;
    latitude?: number;
    longitude?: number;
    moods: string[];
    imageUrls: string[];
    likes: number;
    priceMin?: number;
    priceMax?: number;
    owner: { name: string; image: string };
    features: { id: string; name: string }[];
    rules: { id: string; text: string }[];
    placeMainCategories: { mainCategory: { name: string } }[];
    placeSubCategories: { subCategory: { name: string } }[];
}

export default function PlaceDetail({ params }: { params: Promise<{ id: string }> }) {
    const [place, setPlace] = useState<Place | null>(null);
    const supabase = useSupabaseClient();
    const resolvedParams = use(params); // Unwrap params using React.use()

    useEffect(() => {
        async function fetchPlace() {
            try {
                const { data, error } = await supabase
                    .from("Place")
                    .select(`
            *,
            owner:User(name, image),
            features:Feature(*),
            rules:Rule(*),
            placeMainCategories:PlaceMainCategory(mainCategory:MainCategory(name)),
            placeSubCategories:PlaceSubCategory(subCategory:SubCategory(name))
          `)
                    .eq("id", resolvedParams.id)
                    .single();

                if (error || !data) {
                    console.error("Error fetching place:", error?.message || "No data found");
                    notFound();
                    return;
                }

                setPlace(data);
            } catch (err) {
                console.error("Unexpected error:", err);
                notFound();
            }
        }

        fetchPlace();
    }, [resolvedParams.id, supabase]);

    if (!place) {
        return <div>Loading...</div>;
    }

    const categories = [
        ...place.placeMainCategories.map((c) => c.mainCategory.name),
        ...place.placeSubCategories.map((c) => c.subCategory.name),
    ];

    const mapSrc = `https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d15000!2d${place.longitude || 39.28}!3d${place.latitude || -6.8}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2stz!4v1724071234567`;

    return (
        <div className="container mx-auto px-4 py-8">
            <PlaceCard2
                placeId={place.id}
                username={place.owner.name}
                avatarSrc={place.owner.image || "/images/avatars/default.png"}
                name={place.name}
                imageSrc={place.imageUrls[0] || "/placeholder.jpg"}
                likes={place.likes}
                location={place.location}
                categories={categories}
                moods={place.moods}
                priceMin={place.priceMin || 0}
                priceMax={place.priceMax || 0}
                description={place.description}
            />
            <PlaceMapCard
                mapSrc={mapSrc}
                location={place.location}
                lat={place.latitude}
                lng={place.longitude}
            />
            <FeaturesRules features={place.features} rules={place.rules} />
            <CommentSection placeId={place.id} />
        </div>
    );
}