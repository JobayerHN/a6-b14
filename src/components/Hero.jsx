import Image from "next/image";
import { ArrowDown } from "lucide-react";

export default function Hero() {
	const scrollToLibrary = () => {
		const librarySection = document.getElementById("library");
		if (librarySection) {
			librarySection.scrollIntoView({ behavior: "smooth" });
		}
	};

	return (
		<section className="w-full max-w-7xl mx-auto px-6 md:px-12 py-10 bg-black">
			<div></div>
			<div className="bg-[#12161f] border border-[#21262d] rounded-2xl p-8 md:p-12 flex flex-col lg:flex-row items-center justify-between gap-10 shadow-2xl">
				<div className="flex-1 space-y-6">
					<span className="text-[#ccff00] text-xs font-bold tracking-widest uppercase">
						workout library
					</span>

					<h1 className="font-oswald text-4xl sm:text-5xl lg:text-6xl font-bold uppercase tracking-wide leading-tight text-white">
						train with intent. log every set.
					</h1>

					<p className="text-gray-400 text-sm sm:text-base max-w-xl">
						FitLog is a dark, no-nonsense gym companion: pick a
						lift, lock it into today&apos;s plan, and watch the
						week&apos;s work add up.
					</p>

					<div>
						<button
							// onClick={scrollToLibrary}
							className="bg-[#ccff00] hover:bg-[#b3e600] text-black font-bold px-6 py-3.5 rounded-full text-xs uppercase tracking-wider flex items-center gap-2 transition-all shadow-lg cursor-pointer"
						>
							<span>browse workout</span>
							<ArrowDown size={16} />
						</button>
					</div>
				</div>

				<div className="flex-1 flex justify-center lg:justify-end">
					<div className="relative w-full max-w-[380px] h-[320px] sm:h-[380px]">
						<Image
							src="/banner.png"
							alt="Train with intent hero illustration"
							fill
							className="object-contain"
							priority
						/>
					</div>
				</div>
			</div>
		</section>
	);
}
