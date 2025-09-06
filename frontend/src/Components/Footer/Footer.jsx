import React from 'react'

function Footer() {
    return (
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
    )
}

export default Footer
