"use client";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

export default function Navbar({ planCount = 0, savedCount = 0 }) {
	const pathname = usePathname();

	return (
		<header className="w-full bg-[#0a0c10] py-5 px-6 md:px-12">
			<div className="max-w-7xl mx-auto flex items-center justify-between">
				<Link href="/" className="flex items-center gap-3 group">
					<Image
						src="/logo.png"
						alt="FitLog Logo"
						width={28}
						height={28}
						className="object-contain"
					/>
					<span className="font-oswald text-2xl font-bold text-white tracking-wide uppercase">
						FITLOG
					</span>
				</Link>

				<nav className="flex items-center gap-2">
					<Link
						href="/"
						className={`px-5 py-1.5 rounded-full text-xs tracking-wider font-medium transition-all ${
							pathname === "/"
								? "bg-[#182500] text-[#ccff00]"
								: "text-gray-400 hover:text-white"
						}`}
					>
						Workouts
					</Link>
					<Link
						href="/my-plan"
						className={`px-5 py-1.5 rounded-full text-xs tracking-wider font-medium transition-all ${
							pathname === "/my-plan"
								? "bg-[#182500] text-[#ccff00]"
								: "text-gray-400 hover:text-white"
						}`}
					>
						My Plan
					</Link>
				</nav>

				<div className="flex items-center gap-5 text-xs text-gray-300">
					<Link
						href="/my-plan"
						className="flex items-center gap-2 hover:opacity-90"
					>
						<span>Plan</span>
						<span className="w-5 h-5 rounded-full bg-[#ccff00] text-black font-bold text-[11px] flex items-center justify-center">
							{planCount}
						</span>
					</Link>

					<Link
						href="/my-plan"
						className="flex items-center gap-2 hover:opacity-90"
					>
						<span>Saved</span>
						<span className="w-5 h-5 rounded-full border border-gray-600 text-gray-300 font-bold text-[11px] flex items-center justify-center">
							{savedCount}
						</span>
					</Link>
				</div>
			</div>
		</header>
	);
}
