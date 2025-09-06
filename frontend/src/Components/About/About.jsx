import { useNavigate } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";

export default function About() {
    const navigate = useNavigate();
    return (
        <div className="min-h-screen text-white bg-[linear-gradient(180deg,#103C64_0%,#103C63_100%)]">
            {/* navbar */}
            <Navbar/>

            {/* main */}
            <main className="mx-auto grid max-w-6xl items-center gap-10 px-6 pb-16 pt-10 lg:grid-cols-2">
                <div>
                    <h1 className="text-[36px] lg:text-6xl font-extrabold leading-tight">About Us</h1>
                    <p className="mt-6 text-[16px] lg:text-xl text-white/90 max-w-[560px]">
                        We are a premium hotel, providing exceptional services, luxurious
                        accommodations, and a memorable experience for our guests. Our
                        commitment to quality and guest satisfaction sets us apart.
                    </p>
                </div>
                <div className="flex justify-center lg:justify-end">
                    <img
                        src="hotel.jpg"
                        alt="Hotel exterior at twilight"
                        className="h-[360px] w-[450px] lg:h-[420px] lg:w-[520px] rounded-[32px] object-cover shadow-xl"
                    />
                </div>
            </main>
            {/* footer */}
            <Footer/>

        </div>
    );
}
