import PlaceMapCard from '../../../components/PlaceMapCard';
import PlaceCard from '../../../components/placeCard';
import AISuggestionForm from "@/components/AISuggestionForm";
import FoodGrid from "@/components/FoodGrid";
import CommentSection from "@/components/CommentSection";
import PlaceList from "@/components/PlaceList";

import FeaturesRules from "@/components/FeaturesRules";

export default function SearchPage() {
    return (
        <main className="max-w-[935px] mx-auto mt-20 mb-15 px-5 flex flex-col items-center ">
            <PlaceCard
                username="username"
                avatarSrc="/images/avatar.jpg"
                imageSrc="/images/food1.jpg"
                likes={12}
                location="Sinza"
                category="restaurant"
            />

            <PlaceMapCard
                mapSrc="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3961.5778633847704!2d39.27880217588073!3d-6.821084493176676!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x185c4b000cb3dc31%3A0x5f669b726ee0642!2sMnazi%20mmoja!5e0!3m2!1sen!2stz!4v1754916871184!5m2!1sen!2stz"
                location="Sinza"
            />

            <FeaturesRules/>


            <CommentSection/>

        </main>
    );
}