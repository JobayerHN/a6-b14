import "./globals.css";
import { Toaster } from "react-hot-toast";
import { FitProvider } from "@/context/FitContext";
import NavbarWrapper from "@/components/NavbarWrapper";
import Footer from "@/components/Footer";

export const metadata = {
	title: "FitLog — Workout Library",
	description: "A dark, no-nonsense gym companion",
};

export default function RootLayout({ children }) {
	return (
		<html lang="en" data-theme="dark">
			<head>
				<link rel="preconnect" href="https://fonts.googleapis.com" />
				<link
					rel="preconnect"
					href="https://fonts.gstatic.com"
					crossorigin
				/>
				<link
					href="https://fonts.googleapis.com/css2?family=Oswald&display=swap"
					rel="stylesheet"
				/>
			</head>
			<body className="antialiased bg-[#0b0c10] text-white min-h-screen flex flex-col justify-between font-sans">
				<FitProvider>
					<Toaster position="top-right" />
					<NavbarWrapper />
					<main className="grow">{children}</main>
					<Footer />
				</FitProvider>
			</body>
		</html>
	);
}
