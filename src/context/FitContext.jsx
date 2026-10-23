"use client";
import React, { createContext, useContext, useState } from "react";
import toast from "react-hot-toast";
import { API_BASE } from "@/lib/api";

const FitContext = createContext();

export function FitProvider({ children }) {
	const [workouts, setWorkouts] = useState([]);
	const [loading, setLoading] = useState(false);
	const [planList, setPlanList] = useState([]);
	const [savedList, setSavedList] = useState([]);

	const fetchWorkouts = async () => {
		if (workouts.length > 0) return workouts;
		setLoading(true);
		try {
			const res = await fetch(API_BASE);
			const data = await res.json();

			const list = Array.isArray(data) ? data : data.workouts || [];
			setWorkouts(list);
			setLoading(false);
			return list;
		} catch (error) {
			toast.error("Failed to load workouts");
			setLoading(false);
			return [];
		}
	};

	const addToPlan = (workout) => {
		if (planList.some((item) => item.id === workout.id)) {
			toast.error("Already in today's plan!");
			return;
		}
		if (planList.length >= 5) {
			toast.error("Cap of five lifts reached for today!");
			return;
		}
		setPlanList([...planList, workout]);
		toast.success("Added to today's plan");
	};

	const saveForLater = (workout) => {
		if (savedList.some((item) => item.id === workout.id)) {
			toast.error("Already saved for later!");
			return;
		}
		setSavedList([...savedList, workout]);
		toast.success("Saved for later");
	};

	const removeFromPlan = (id) => {
		setPlanList(planList.filter((item) => item.id !== id));
		toast.success("Removed from plan");
	};

	return (
		<FitContext.Provider
			value={{
				workouts,
				loading,
				fetchWorkouts,
				planList,
				savedList,
				addToPlan,
				saveForLater,
				removeFromPlan,
			}}
		>
			{children}
		</FitContext.Provider>
	);
}

export function useFit() {
	return useContext(FitContext);
}
