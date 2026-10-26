"use client";
import { useState } from "react";
import { useFit } from "@/context/FitContext";
import Link from "next/link";
import toast from "react-hot-toast";
import { Clock, Flame, Star, Check, X, ChevronDown } from "lucide-react";

export default function MyPlanPage() {
	const { planList, savedList, removeFromPlan, removeFromSaved } = useFit();
	const [activeTab, setActiveTab] = useState("plan");
	const [sortBy, setSortBy] = useState("duration");
	const [completedIds, setCompletedIds] = useState([]);

	const currentList = activeTab === "plan" ? planList : savedList;

	const sortedList = [...currentList].sort((a, b) => {
		if (sortBy === "duration") return (b.duration || 0) - (a.duration || 0);
		if (sortBy === "calories") return (b.calories || 0) - (a.calories || 0);
		if (sortBy === "rating") return (b.rating || 0) - (a.rating || 0);
		return 0;
	});

	const totalExercises = planList.length;
	const totalMinutes = planList.reduce(
		(sum, item) => sum + (Number(item.duration) || 0),
		0,
	);
	const totalCalories = planList.reduce(
		(sum, item) => sum + (Number(item.calories) || 0),
		0,
	);

	const handleMarkAsDone = (id, name) => {
		if (completedIds.includes(id)) {
			toast.error(`"${name}" is already marked as done!`);
			return;
		}
		setCompletedIds([...completedIds, id]);
		toast.success(`Completed "${name}"! Great work! 🎉`);
	};

	return (
		<div className="w-full max-w-7xl mx-auto px-6 md:px-12 py-10">
			<div className="mb-8">
				<h1 className="font-oswald text-3xl sm:text-4xl font-bold uppercase tracking-wide text-white">
					MY PLAN
				</h1>
				<p className="text-gray-400 text-sm mt-1">
					Cap of five lifts for today. Finish them, then load more.
				</p>
			</div>

			<div className="bg-[#12161f] border border-[#21262d] rounded-2xl grid grid-cols-1 sm:grid-cols-3 mb-8 overflow-hidden">
				<div className="p-6 sm:p-8">
					<p className="text-gray-400 text-xs font-medium uppercase tracking-wider mb-2">
						Exercises
					</p>
					<p className="font-oswald text-4xl sm:text-5xl font-bold text-[#ccff00]">
						{totalExercises}
					</p>
				</div>
				<div className="p-6 sm:p-8 border-t sm:border-t-0 sm:border-l border-[#21262d] relative">
					<p className="text-gray-400 text-xs font-medium uppercase tracking-wider mb-2">
						Minutes
					</p>
					<p className="font-oswald text-4xl sm:text-5xl font-bold text-white">
						{totalMinutes}
					</p>
				</div>
				<div className="p-6 sm:p-8 border-t sm:border-t-0 sm:border-l border-[#21262d] relative">
					<p className="text-gray-400 text-xs font-medium uppercase tracking-wider mb-2">
						Calories
					</p>
					<p className="font-oswald text-4xl sm:text-5xl font-bold text-white">
						{totalCalories}
					</p>
				</div>
			</div>

			<div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
				<div className="flex bg-[#12161f] border border-[#21262d] p-1 rounded-xl">
					<button
						onClick={() => setActiveTab("plan")}
						className={`px-5 py-2 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
							activeTab === "plan"
								? "bg-[#1f293d] text-white shadow"
								: "text-gray-400 hover:text-white"
						}`}
					>
						Today&apos;s Plan ({planList.length})
					</button>
					<button
						onClick={() => setActiveTab("saved")}
						className={`px-5 py-2 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
							activeTab === "saved"
								? "bg-[#1f293d] text-white shadow"
								: "text-gray-400 hover:text-white"
						}`}
					>
						Saved ({savedList.length})
					</button>
				</div>

				<div className="flex items-center gap-2 text-xs text-gray-400">
					<span>Sort By</span>
					<div className="relative inline-block">
						<select
							value={sortBy}
							onChange={(e) => setSortBy(e.target.value)}
							className="bg-[#12161f] border border-[#21262d] text-white text-xs rounded-lg px-3 py-2 pr-8 appearance-none focus:outline-none focus:border-[#ccff00] cursor-pointer"
						>
							<option value="duration">Duration</option>
							<option value="calories">Calories</option>
							<option value="rating">Rating</option>
						</select>
					</div>
				</div>
			</div>

			{sortedList.length === 0 ? (
				<div className="bg-[#12161f]/50 border border-dashed border-[#21262d] rounded-2xl py-20 px-6 text-center flex flex-col items-center justify-center space-y-4">
					<h3 className="font-oswald text-2xl font-bold uppercase tracking-wide text-white">
						NOTHING HERE YET
					</h3>
					<p className="text-gray-400 text-sm max-w-sm">
						Browse the library and add a lift to get today moving.
					</p>
					<Link
						href="/"
						className="bg-[#ccff00] hover:bg-[#b3e600] text-black font-bold px-6 py-3 rounded-full text-xs uppercase tracking-wider transition-all mt-2 cursor-pointer shadow-lg"
					>
						Go to workouts
					</Link>
				</div>
			) : (
				<div className="space-y-4">
					{sortedList.map((workout) => {
						const isDone = completedIds.includes(workout.id);

						return (
							<div
								key={workout.id}
								className={`bg-[#12161f] border border-[#21262d] rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 transition-all ${
									isDone
										? "opacity-60 border-green-800/40"
										: "hover:border-[#30363d]"
								}`}
							>
								<div className="flex items-center gap-4 w-full sm:w-auto">
									<div className="w-20 h-20 sm:w-24 sm:h-20 bg-[#1a212c] rounded-xl overflow-hidden flex-shrink-0">
										<img
											src={workout.image || "/banner.png"}
											alt={workout.name}
											className="w-full h-full object-cover"
										/>
									</div>

									<div className="space-y-1">
										<h4 className="font-oswald text-lg font-bold text-white uppercase tracking-wide flex items-center gap-2">
											<span>{workout.name}</span>
											{isDone && (
												<span className="text-[10px] bg-green-900/60 text-green-400 border border-green-600/40 px-2 py-0.5 rounded uppercase font-sans">
													Done
												</span>
											)}
										</h4>
										<p className="text-gray-400 text-xs">
											{workout.equipment}
										</p>

										<div className="flex items-center gap-4 pt-1 text-xs text-gray-300">
											<div className="flex items-center gap-1">
												<Clock
													size={13}
													className="text-gray-400"
												/>
												<span>
													{workout.duration} min
												</span>
											</div>
											<div className="flex items-center gap-1">
												<Flame
													size={13}
													className="text-gray-400"
												/>
												<span>
													{workout.calories} kcal
												</span>
											</div>
											<div className="flex items-center gap-1">
												<Star
													size={13}
													className="text-gray-400 fill-yellow-400 text-yellow-400"
												/>
												<span>{workout.rating}</span>
											</div>
										</div>
									</div>
								</div>

								<div className="flex items-center gap-3 w-full sm:w-auto justify-end border-t sm:border-t-0 border-[#21262d] pt-3 sm:pt-0">
									<Link
										href={`/workouts/${workout.id}`}
										className="bg-[#161b22] hover:bg-[#21262d] border border-gray-700 text-white font-medium px-4 py-2 rounded-full text-xs transition-colors"
									>
										View Details
									</Link>

									{activeTab === "plan" && (
										<button
											onClick={() =>
												handleMarkAsDone(
													workout.id,
													workout.name,
												)
											}
											disabled={isDone}
											className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold transition-all cursor-pointer ${
												isDone
													? "bg-gray-800 text-gray-500 cursor-not-allowed"
													: "bg-[#ccff00] hover:bg-[#b3e600] text-black"
											}`}
										>
											<Check size={14} />
											<span>
												{isDone
													? "Completed"
													: "Mark as Done"}
											</span>
										</button>
									)}

									<button
										onClick={() => {
											if (activeTab === "plan") {
												removeFromPlan(workout.id);
											} else {
												removeFromSaved(workout.id);
											}
										}}
										className="p-2 text-gray-400 hover:text-red-400 hover:bg-red-500/10 rounded-full transition-colors cursor-pointer"
										title="Remove"
									>
										<X size={18} />
									</button>
								</div>
							</div>
						);
					})}
				</div>
			)}
		</div>
	);
}
