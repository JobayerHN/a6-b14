"use client";
import React, { createContext, useContext, useState } from "react";
import toast from "react-hot-toast";
import { API_BASE } from "@/lib/api";

const FitContext = createContext();

export function FitProvider({ children }) {
	const [workouts, setWorkouts] = useState([]);
	const [loading, setLoading] = useState(false);
	const [hasFetched, setHasFetched] = useState(false);
	const [planList, setPlanList] = useState([]);
	const [savedList, setSavedList] = useState([]);

	const loadWorkouts = async () => {
		if (hasFetched || loading) return;
		setLoading(true);
		setHasFetched(true);
		try {
			const res = await fetch(API_BASE);
			const data = await res.json();
			const list = Array.isArray(data) ? data : data.workouts || [];
			setWorkouts(list);
		} catch (error) {
			toast.error("Failed to load workouts");
		} finally {
			setLoading(false);
		}
	};

	if (workouts.length === 0 && !hasFetched && !loading) {
		loadWorkouts();
	}

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

	const removeFromSaved = (id) => {
		setSavedList(savedList.filter((item) => item.id !== id));
		toast.success("Removed from saved list");
	};

	return (
		<FitContext.Provider
			value={{
				workouts,
				loading,
				planList,
				savedList,
				addToPlan,
				saveForLater,
				removeFromPlan,
				removeFromSaved,
			}}
		>
			{children}
		</FitContext.Provider>
	);
}

export function useFit() {
	return useContext(FitContext);
}
