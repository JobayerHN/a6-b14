"use client";
import Navbar from "./Navbar";
import { useFit } from "@/context/FitContext";

export default function NavbarWrapper() {
	const { planList, savedList } = useFit();
	return <Navbar planCount={planList.length} savedCount={savedList.length} />;
}
