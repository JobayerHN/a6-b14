import Link from "next/link";
import Image from "next/image";

export default function Footer() {
	return (
		<footer className="w-full bg-[#07090d] border-t border-[#1f242d] py-8 px-6 md:px-12 mt-auto">
			<div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
				<Link href="/" className="flex items-center gap-2">
					<Image
						src="/logo.png"
						alt="FitLog Logo"
						width={20}
						height={20}
						className="object-contain"
					/>
					<span className="font-oswald text-lg font-bold text-white tracking-wide">
						FITLOG
					</span>
				</Link>
				<p className="text-xs text-gray-400">
					© 2026 FitLog — Workout Library. Train hard, log honest.
				</p>
			</div>
		</footer>
	);
}
