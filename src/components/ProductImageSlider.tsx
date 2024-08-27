// "use client"
// import { useEffect, useState } from 'react';
// import Image from 'next/image';
// import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

// const fetchSlides = async () => {
//     const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/slides`);
//     const data = await response.json();
//     if (data.ok) {
//         return data.data;
//     } else {
//         console.error(data.message);
//         return [];
//     }
// };

// export default function ProductImageSlider() {
//     const [slides, setSlides] = useState<any[]>([]);
//     const [error, setError] = useState<string | null>(null);

//     useEffect(() => {
//         const loadSlides = async () => {
//             try {
//                 const fetchedSlides = await fetchSlides();
//                 setSlides(fetchedSlides);
//             } catch (error) {
//                 setError('حدث خطأ أثناء تحميل البيانات');
//             }
//         };
//         loadSlides();
//     }, []);

//     if (error) {
//         return <div>{error}</div>;
//     }

//     return (
//         <div className="relative w-full max-w-6xl mx-auto overflow-hidden" dir="ltr">
//             <div className="relative">
//                 <div className="overflow-hidden">
//                     <div className="flex">
//                         {slides.map((slide: any) => (
//                             <div key={slide.id} className="flex-shrink-0 w-full relative h-[300px] md:h-[400px] overflow-hidden">
//                                 <Image
//                                     src={slide.imgSrc}
//                                     alt={slide.altText}
//                                     width={1600}
//                                     height={900}
//                                     className="w-full h-full object-cover"
//                                 />
//                                 <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-6">
//                                     <div className="text-white space-y-2">
//                                         <h3 className="text-2xl md:text-3xl font-bold">{slide.title}</h3>
//                                         <p className="text-sm md:text-base">{slide.description}</p>
//                                     </div>
//                                 </div>
//                             </div>
//                         ))}
//                     </div>
//                 </div>
//                 <button className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white/70 hover:bg-white/90 rounded-full p-2 shadow-md transition-colors">
//                     <FaChevronLeft className="w-6 h-6 text-gray-700" />
//                 </button>
//                 <button className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white/70 hover:bg-white/90 rounded-full p-2 shadow-md transition-colors">
//                     <FaChevronRight className="w-6 h-6 text-gray-700" />
//                 </button>
//             </div>
//         </div>
//     );
// }

"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const fetchSlides = async () => {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/slides`);
        const data = await response.json();
        if (response.ok) {
            return data.data;
        } else {
            console.error(data.message);
            return [];
        }
    } catch (error) {
        console.error("Error fetching slides:", error);
        return [];
    }
};

export default function ProductImageSlider() {
    const [slides, setSlides] = useState<any[]>([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const loadSlides = async () => {
            try {
                const fetchedSlides = await fetchSlides();
                if (fetchedSlides.length > 0) {
                    setSlides(fetchedSlides);
                } else {
                    setError("No slides found.");
                }
            } catch (error) {
                setError("حدث خطأ أثناء تحميل البيانات");
            }
        };
        loadSlides();
    }, []);

    const handlePrevClick = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === 0 ? slides.length - 1 : prevIndex - 1
        );
    };

    const handleNextClick = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === slides.length - 1 ? 0 : prevIndex + 1
        );
    };

    if (error) {
        return <div>{error}</div>;
    }

    if (slides.length === 0) {
        return <div>Loading...</div>;
    }

    return (
        <div className="relative w-full max-w-6xl mx-auto overflow-hidden" dir="ltr">
            <div className="relative">
                <div className="overflow-hidden">
                    <div
                        className="flex transition-transform duration-500"
                        style={{
                            transform: `translateX(-${currentIndex * 100}%)`,
                        }}
                    >
                        {slides.map((slide: any, index: number) => (
                            <div
                                key={slide.id}
                                className="flex-shrink-0 w-full relative h-[300px] md:h-[400px] overflow-hidden"
                            >
                                <Image
                                    src={slide.imgSrc}
                                    alt={slide.altText}
                                    width={1600}
                                    height={900}
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-6">
                                    <div className="text-white space-y-2">
                                        <h3 className="text-2xl md:text-3xl font-bold">{slide.title}</h3>
                                        <p className="text-sm md:text-base">{slide.description}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <button
                    onClick={handlePrevClick}
                    className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white/70 hover:bg-white/90 rounded-full p-2 shadow-md transition-colors"
                >
                    <FaChevronLeft className="w-6 h-6 text-gray-700" />
                </button>
                <button
                    onClick={handleNextClick}
                    className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white/70 hover:bg-white/90 rounded-full p-2 shadow-md transition-colors"
                >
                    <FaChevronRight className="w-6 h-6 text-gray-700" />
                </button>
            </div>
        </div>
    );
}
