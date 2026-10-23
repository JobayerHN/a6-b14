"use client";
import Link from "next/link";
import Image from "next/image";
import { Clock, Flame, Star } from "lucide-react";

export default function WorkoutCard({ workout }) {
	const { id, name, image, category, equipment, duration, calories, rating } =
		workout;

	return (
		<Link
			href={`/workout/${id}`}
			className="bg-[#12161f] border border-[#21262d] rounded-2xl overflow-hidden hover:border-[#ccff00]/50 transition-all duration-300 flex flex-col group cursor-pointer"
		>
			<div className="relative w-full h-48 bg-[#1a1f2c] overflow-hidden">
				<Image
					src={image}
					alt={name}
					fill
					className="object-cover group-hover:scale-105 transition-transform duration-300"
				/>
			</div>

			<div className="p-5 flex flex-col flex-1 justify-between gap-4">
				<div className="space-y-2">
					<div className="flex flex-wrap gap-1.5">
						{Array.isArray(category) ? (
							category.map((cat, index) => (
								<span
									key={index}
									className="bg-[#ccff00] text-black text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider"
								>
									{cat}
								</span>
							))
						) : (
							<span className="bg-[#ccff00] text-black text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
								{category}
							</span>
						)}
					</div>

					<h3 className="font-oswald text-lg font-bold text-white uppercase tracking-wide group-hover:text-[#ccff00] transition-colors">
						{name}
					</h3>

					<p className="text-xs text-gray-400">
						{Array.isArray(equipment)
							? equipment.join(", ")
							: equipment}
					</p>
				</div>

				<div className="flex items-center gap-4 text-xs text-gray-300 pt-3 border-t border-[#21262d]">
					<div className="flex items-center gap-1">
						<Clock size={14} className="text-gray-400" />
						<span>{duration}</span>
					</div>
					<div className="flex items-center gap-1">
						<Flame size={14} className="text-gray-400" />
						<span>{calories}</span>
					</div>
					<div className="flex items-center gap-1">
						<Star
							size={14}
							className="text-yellow-400 fill-yellow-400"
						/>
						<span>{rating}</span>
					</div>
				</div>
			</div>
		</Link>
	);
}
