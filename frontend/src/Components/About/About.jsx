export default function About() {
    return (
        <div className="min-h-screen text-white bg-[linear-gradient(180deg,#103C64_0%,#103C63_100%)]">
            {/* navbar */}
            <nav className="flex items-center lg:justify-between px-5 lg:px-15 py-6 ">
                <span className="text-xl lg:text-2xl font-bold text-white">DeepSea</span>

                {/* Nav Links */}
                <div className="flex ml-10 lg:ml-0 gap-4 lg:gap-10">
                    <a className="text-white/90 cursor-pointer hover:text-white">Home</a>
                    <a className="text-white/90 cursor-pointer hover:text-white">Rooms</a>
                    <a className="text-white/90 cursor-pointer hover:text-white">About</a>
                    <a className="text-white/90 cursor-pointer hover:text-white">Login</a>
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
        </div>
    );
}
