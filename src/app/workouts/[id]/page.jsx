"use client";

import { useState, use } from "react";
import { useFit } from "@/context/FitContext";
import { API_BASE } from "@/lib/api";
import Link from "next/link";
import { ArrowLeft, Plus, Bookmark, Star } from "lucide-react";
export default function WorkoutDetail({ params }) {
	const unwrappedParams = use(params);
	const id = unwrappedParams.id;

	const { workouts, addToPlan, saveForLater } = useFit();

	const [workout, setWorkout] = useState(() => {
		return workouts.find((item) => String(item.id) === String(id)) || null;
	});
	const [loading, setLoading] = useState(!workout);

	if (!workout && loading) {
		fetch(`${API_BASE}/${id}`)
			.then((res) => res.json())
			.then((data) => {
				setWorkout(data);
				setLoading(false);
			})
			.catch(() => {
				setLoading(false);
			});
	}

	if (loading) {
		return (
			<div className="min-h-[60vh] flex items-center justify-center text-gray-400">
				Loading workout details...
			</div>
		);
	}

	if (!workout) {
		return (
			<div className="min-h-[60vh] flex flex-col items-center justify-center gap-4">
				<h2 className="font-oswald text-2xl font-bold text-white">
					Workout not found
				</h2>
				<Link
					href="/"
					className="bg-[#ccff00] text-black px-4 py-2 rounded-full text-xs font-bold uppercase"
				>
					Back to Workouts
				</Link>
			</div>
		);
	}

	return (
		<div className="w-full max-w-7xl mx-auto px-6 md:px-12 py-10">
			<Link
				href="/"
				className="inline-flex items-center gap-2 text-xs text-gray-400 hover:text-white mb-8 transition-colors"
			>
				<ArrowLeft size={16} />
				<span>Back to Workouts</span>
			</Link>

			<div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
				<div className="bg-[#12161f] border border-[#21262d] rounded-2xl overflow-hidden p-4">
					<div className="relative w-full h-[350px] sm:h-[450px] rounded-xl overflow-hidden bg-[#1a212c]">
						<img
							src={workout.image || "/banner.png"}
							alt={workout.name}
							className="w-full h-full object-cover"
						/>
					</div>
				</div>

				<div className="space-y-6">
					<div>
						<h1 className="font-oswald text-3xl sm:text-4xl font-bold uppercase tracking-wide text-white mb-2">
							{workout.name}
						</h1>
						<p className="text-gray-400 text-sm leading-relaxed">
							{workout.description ||
								"A compound movement designed to build strength and muscle mass effectively."}
						</p>
					</div>

					<div className="flex flex-wrap gap-2">
						{workout.category?.map((cat, idx) => (
							<span
								key={idx}
								className="bg-[#1e2900] text-[#ccff00] text-xs font-bold px-3 py-1 rounded uppercase tracking-wider"
							>
								{cat}
							</span>
						))}
					</div>

					<div className="bg-[#12161f] border border-[#21262d] rounded-xl overflow-hidden">
						<div className="divide-y divide-[#21262d] text-xs">
							<div className="flex justify-between p-3.5">
								<span className="text-gray-400 uppercase font-medium">
									Equipment
								</span>
								<span className="text-white font-semibold">
									{workout.equipment}
								</span>
							</div>
							<div className="flex justify-between p-3.5">
								<span className="text-gray-400 uppercase font-medium">
									Difficulty
								</span>
								<span className="text-white font-semibold">
									{workout.difficulty || "Intermediate"}
								</span>
							</div>
							<div className="flex justify-between p-3.5">
								<span className="text-gray-400 uppercase font-medium">
									Sets
								</span>
								<span className="text-white font-semibold">
									{workout.sets || 4}
								</span>
							</div>
							<div className="flex justify-between p-3.5">
								<span className="text-gray-400 uppercase font-medium">
									Reps
								</span>
								<span className="text-white font-semibold">
									{workout.reps || "6-8"}
								</span>
							</div>
							<div className="flex justify-between p-3.5">
								<span className="text-gray-400 uppercase font-medium">
									Duration
								</span>
								<span className="text-white font-semibold">
									{workout.duration} min
								</span>
							</div>
							<div className="flex justify-between p-3.5">
								<span className="text-gray-400 uppercase font-medium">
									Calories
								</span>
								<span className="text-white font-semibold">
									{workout.calories} kcal
								</span>
							</div>
							<div className="flex justify-between p-3.5">
								<span className="text-gray-400 uppercase font-medium">
									Rating
								</span>
								<span className="text-white font-semibold flex items-center gap-1">
									<Star
										size={12}
										className="fill-yellow-400 text-yellow-400"
									/>{" "}
									{workout.rating}
								</span>
							</div>
						</div>
					</div>

					<div className="flex flex-col sm:flex-row gap-4 pt-4">
						<button
							onClick={() => addToPlan(workout)}
							className="flex-1 bg-[#ccff00] hover:bg-[#b3e600] text-black font-bold py-3.5 px-6 rounded-full text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer shadow-lg"
						>
							<Plus size={16} />
							<span>Add to today&apos;s plan</span>
						</button>

						<button
							onClick={() => saveForLater(workout)}
							className="flex-1 bg-[#161b22] hover:bg-[#21262d] border border-gray-700 text-white font-bold py-3.5 px-6 rounded-full text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer"
						>
							<Bookmark size={16} />
							<span>Save for later</span>
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}
