import Image from "next/image";

export default function VideoBackgroundSection() {
    return (
        <section className="video-background-section relative h-screen w-full">
            <div className="background-video-container fixed top-0 left-0 w-full h-screen z-[-1]">
                <video autoPlay muted loop playsInline className="w-full h-full object-cover">
                    <source src="/videos/chocolate.mp4" type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
            </div>
            <div className="container flex flex-col justify-center h-full relative z-1">
                <div className="text-container">
                    <div className="text-left absolute left-[30px] sm:left-[100px] lg:left-[300px] top-1/2 -translate-y-1/2 ">
                        <h2 className="text-2xl sm:text-3xl lg:text-5xl font-bold text-mtoko-light">Chocolate makes</h2>
                    </div>
                    <div className="text-right absolute right-[30px] sm:right-[100px] lg:right-[0px] top-1/2 -translate-y-1/2 ">
                        <h2 className="text-2xl sm:text-3xl lg:text-5xl font-bold text-mtoko-light">Everything better.</h2>
                    </div>
                </div>
                <div className="image-container mt-[50px] sm:mt-[80px] lg:mt-[150px]">
                    <Image
                        src="/images/bg1.png"
                        alt="Main Image"
                        width={500}
                        height={300}
                        className="main-image absolute left-[30px] sm:left-[100px] lg:left-[300px] max-w-[60%] sm:max-w-[50%] lg:max-w-[40%] animate-grow hidden lg:block"
                    />
                    <Image
                        src="/images/bg1b.png"
                        alt="Secondary Image"
                        width={300}
                        height={200}
                        className="secondary-image absolute right-[30px] sm:right-[100px] lg:right-[300px] max-w-[60%] sm:max-w-[50%] lg:max-w-[20%] animate-grow"
                    />
                </div>
            </div>
        </section>
    );
}