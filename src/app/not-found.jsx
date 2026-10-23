import Link from "next/link";
import { AlertCircle } from "lucide-react";

export default function NotFound() {
	return (
		<div className="w-full min-h-[70vh] flex flex-col items-center justify-center px-6 text-center">
			<div className="bg-[#12161f] border border-[#21262d] rounded-2xl p-10 max-w-md w-full flex flex-col items-center space-y-4 shadow-2xl">
				<div className="w-12 h-12 bg-red-500/10 text-red-500 rounded-full flex items-center justify-center">
					<AlertCircle size={28} />
				</div>
				<h1 className="font-oswald text-4xl font-bold uppercase tracking-wider text-white">
					404 — NOT FOUND
				</h1>
				<p className="text-gray-400 text-sm">
					The page you are looking for does not exist or has been
					moved.
				</p>
				<Link
					href="/"
					className="bg-[#ccff00] hover:bg-[#b3e600] text-black font-bold px-6 py-3 rounded-full text-xs uppercase tracking-wider transition-all mt-2 cursor-pointer shadow-lg"
				>
					Back to Workouts
				</Link>
			</div>
		</div>
	);
}
