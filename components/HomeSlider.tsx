import Image from "next/image";
import styles from "./HomeSlider.module.css";

export default function HomeSlider() {
    const rowImages = [
        [
            "/images/slider1.jpg",
            "/images/slider1-2.jpg",
            "/images/slider1-3.jpg",
            "/images/slider1-4.jpg",
            "/images/slider1-5.jpg",
            "/images/slider1-6.jpg",
            "/images/slider1-7.jpg",
            "/images/slider1-8.jpg",
        ],
        [
            "/images/slider1.jpg",
            "/images/slider2-2.jpg",
            "/images/slider2-3.jpg",
            "/images/slider2-4.jpg",
            "/images/slider2-5.jpg",
            "/images/slider2-6.jpg",
            "/images/slider2-7.jpg",
            "/images/slider2-8.jpg",
        ],
        [
            "/images/slider1.jpg",
            "/images/slider3-2.jpg",
            "/images/slider3-3.jpg",
            "/images/slider3-4.jpg",
            "/images/slider3-5.jpg",
            "/images/slider3-6.jpg",
            "/images/slider3-7.jpg",
            "/images/slider3-8.jpg",
        ],
    ];

    return (
        <section className={`home-slidery ${styles.homeSlidery} bg-mtoko-dark py-8 h-full`}>
            <div className="container-home-slider max-w-[90vw] lg:max-w-[1200px] mx-auto ">
                {rowImages.map((images, rowIndex) => (
                    <div
                        key={rowIndex}
                        className={`${styles.sliderHome} w-full h-[300px] md:h-[400px] overflow-hidden my-4`}
                        style={{ "--quantity": images.length, "--height": "300px", "--width": "320px" } as React.CSSProperties}
                    >
                        <div className={`${styles.list} flex w-full ${rowIndex === 1 ? styles.reverse : ""}`} style={{ minWidth: `calc(300px * ${images.length})` }}>
                            {images.map((src, index) => (
                                <div
                                    key={`${rowIndex}-${index}`}
                                    className={`${styles.item} absolute`}
                                    style={{ "--position": index + 1 } as React.CSSProperties}
                                >
                                    <Image
                                        src={src}
                                        alt={`Slide ${rowIndex + 1}-${index + 1}`}
                                        width={300}
                                        height={300}
                                        className="w-full h-full object-cover"
                                        priority={index === 0}
                                        loading={index === 0 ? "eager" : "lazy"}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}