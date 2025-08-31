import { useNavigate } from "react-router-dom";

export default function About() {
    const navigate = useNavigate();
    return (
        <div className="min-h-screen text-white bg-[linear-gradient(180deg,#103C64_0%,#103C63_100%)]">
            {/* navbar */}
            <nav className="flex items-center lg:justify-between px-5 lg:px-15 py-6 ">
                <span className="text-xl lg:text-2xl font-bold text-white">DeepSea</span>

                {/* Nav Links */}
                <div className="flex ml-10 lg:ml-0 gap-4 lg:gap-10">
                    <a onClick={navigate("/")} className="text-white/90 cursor-pointer hover:text-white">Home</a>
                    <a onClick={navigate("/")} className="text-white/90 cursor-pointer hover:text-white">Rooms</a>
                    <a onClick={navigate("/about")} className="text-white/90 cursor-pointer hover:text-white">About</a>
                    <a onClick={navigate("/login")} className="text-white/90 cursor-pointer hover:text-white">Login</a>
                </div>
            </nav>


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

            <footer className="bg-[#0d2e4f] text-white/80 py-8 mt-12">
                <div className="max-w-6xl mx-auto px-6 flex items-center justify-center text-center gap-5 lg:gap-12">

                    {/* Logo / Title */}
                    <span className="text-xl font-bold text-white">DeepSea</span>

                    {/* Copyright */}
                    <p className="text-sm text-white/60">
                        © {new Date().getFullYear()} DeepSea. All rights reserved.
                    </p>
                </div>
            </footer>



        </div>
    );
}
