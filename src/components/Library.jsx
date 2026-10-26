"use client";
import { useFit } from "@/context/FitContext";
import Link from "next/link";
import { Clock, Flame, Star, Loader2 } from "lucide-react";

export default function Library() {
	const { workouts, loading, fetchWorkouts } = useFit();

	if (workouts.length === 0 && !loading) {
		fetchWorkouts();
	}

	return (
		<section
			id="library"
			className="w-full max-w-7xl mx-auto px-6 md:px-12 py-12"
		>
			<div className="flex items-center justify-between mb-8">
				<div>
					<h2 className="font-oswald tracking-[-0.75] leading-9 text-3xl md:text-4xl font-bold uppercase  text-white">
						The Library
					</h2>
					<p className="text-gray-400 text-sm mt-1">
						Twelve lifts covering every major muscle group.
					</p>
				</div>
			</div>

			{loading && (
				<div className="flex flex-col items-center justify-center py-20 gap-3">
					<Loader2 className="w-8 h-8 text-[#ccff00] animate-spin" />
					<p className="text-gray-400 text-sm">Loading workouts…</p>
				</div>
			)}

			{!loading && (
				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
					{workouts.map((workout) => (
						<Link
							href={`/workouts/${workout.id}`}
							key={workout.id}
							className="bg-[#12161f] border border-[#21262d] rounded-xl overflow-hidden hover:border-[#ccff00]/50 transition-all group flex flex-col justify-between"
						>
							<div className="relative w-full h-48 bg-[#1a212c] overflow-hidden">
								<img
									src={workout.image || "/banner.png"}
									alt={workout.name || "Workout"}
									className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
								/>
							</div>

							<div className="p-5 flex flex-col flex-grow justify-between space-y-4">
								<div className="space-y-2">
									<div className="flex flex-wrap gap-1.5">
										{workout.category?.map((cat, idx) => (
											<span
												key={idx}
												className="bg-[#1e2900] text-[#ccff00] text-[10px] font-bold px-2.5 py-0.5 rounded uppercase tracking-wider"
											>
												{cat}
											</span>
										))}
									</div>

									<h3 className="font-oswald text-lg font-bold text-white tracking-wide uppercase group-hover:text-[#ccff00] transition-colors">
										{workout.name}
									</h3>

									<p className="text-gray-400 text-xs">
										{workout.equipment}
									</p>
								</div>

								<div className="flex items-center justify-between pt-3 border-t border-[#21262d] text-xs text-gray-300">
									<div className="flex items-center gap-1">
										<Clock
											size={14}
											className="text-gray-400"
										/>
										<span>{workout.duration} min</span>
									</div>
									<div className="flex items-center gap-1">
										<Flame
											size={14}
											className="text-gray-400"
										/>
										<span>{workout.calories} kcal</span>
									</div>
									<div className="flex items-center gap-1">
										<Star
											size={14}
											className="text-gray-400 fill-yellow-400 text-yellow-400"
										/>
										<span>{workout.rating}</span>
									</div>
								</div>
							</div>
						</Link>
					))}
				</div>
			)}
		</section>
	);
}
