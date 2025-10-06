import FoodCard from './FoodCard';

export default function FoodGrid() {
    const foods = [
        {
            imageSrc: 'https://i.ibb.co/RT0bjJq/food1.png',
            name: 'Salad Salad',
            description: 'Descripcion de la comida, con ingredientes',
            price: 'Sh 18750',
        },
        {
            imageSrc: 'https://i.ibb.co/JpwBtYk/food2.png',
            name: 'Chicken Sahani',
            description: 'Descripcion de la comida, con ingredientes',
            price: 'Sh 20050',
        },
        {
            imageSrc: 'https://i.ibb.co/JpwBtYk/food2.png',
            name: 'Nombre Comida',
            description: 'Descripcion de la comida, con ingredientes',
            price: 'Sh 7550',
        },
        {
            imageSrc: 'https://i.ibb.co/JpwBtYk/food2.png',
            name: 'Nombre Comida',
            description: 'Descripcion de la comida, con ingredientes',
            price: 'Sh 10750',
        },
    ];

    return (
        <div className="section-seven mb-3 mt-7">
            <div className="left-item">
                <div className="line w-full h-[1px] bg-[#dadce0]" />
            </div>
            <div className="section-four">
                <label className="block text-mtoko-primary text-[16px] mb-2">What you might like</label>
                <div className="container-checkbox mt-10">
                    <div className="list">
                        <div className="grid grid-cols-2 gap-6">
                            {foods.map((food, index) => (
                                <FoodCard key={index} {...food} />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}