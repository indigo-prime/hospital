interface FoodCardProps {
    imageSrc: string;
    name: string;
    description: string;
    price: string;
}

export default function FoodCard({ imageSrc, name, description, price }: FoodCardProps) {
    return (
        <article className="relative max-w-[80%] mx-auto group">
            <img className="absolute max-w-[130%] -left-[15%] -top-[18%] z-10 transition-all duration-300 group-hover:-top-[20%] drop-shadow-[0_5px_10px_rgba(0,0,0,0.3)]" src={imageSrc} alt={name} />
            <div className="pt-[118%] rounded-t-[50%] rounded-b-[15px] bg-[#ededed] transition-all duration-300 group-hover:translate-y-[-5px] group-hover:shadow-[0_20px_40px_rgba(0,0,0,0.1)]">
                <div className="p-2.5 pb-[10px]">
                    <h2 className="text-[14px] font-bold">{name}</h2>
                    <p className="text-[10px] leading-[14px] text-[#a2a2a2]">{description}</p>
                </div>
                <div className="grid grid-cols-[1fr_35px]">
                    <h3 className="h-[30px] pl-[20px] pr-[10px] flex items-center text-[14px] font-bold">{price}</h3>
                    <button className="overflow-hidden w-[35px] h-[30px] bg-[#222222] border-none text-white rounded-tl-[15px] rounded-br-[15px] text-[20px] cursor-pointer transition-all duration-200 hover:opacity-80 hover:scale-105 active:scale-[0.8]">+</button>
                </div>
            </div>
        </article>
    );
}