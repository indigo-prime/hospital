import PlaceMapCard from '../../../components/PlaceMapCard';
import PlaceCard from '../../../components/placeCard';
import AISuggestionForm from "@/components/AISuggestionForm";
import FoodGrid from "@/components/FoodGrid";
import CommentSection from "@/components/CommentSection";
import PlaceList from "@/components/PlaceList";
import {SearchFilter} from "@/components/SearchFilter";

export default function SearchPage() {
    return (
        <main className="max-w-[935px] mx-auto mt-20 mb-15 px-5 flex flex-col items-center ">

            <AISuggestionForm />
            <FoodGrid />
            <SearchFilter/>


        </main>
    );
}