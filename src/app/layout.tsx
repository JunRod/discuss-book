'use server'

import { CustomSidebarProvider } from "@/src/components/sidebarProvider";
import SVG from "../components/svg";
import { PanelLeft } from "lucide-react";

export default async function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {

	return (
		<html lang="en" >
			<body className="overflow-hidden">
				<CustomSidebarProvider>
					<div className="h-dvh bg-red w-full flex flex-col justify-between pr-[1rem] pl-[1rem] pb-[1rem] gap-4">
						{Array.from({ length: 2 }).map((_, i) => (
							<div key={i}
								className={
									`z-[-1] absolute w-[45rem] h-[40rem] 
							${i === 1
										? 'transform scale-y-[-1] scale-x-[-1] bottom-[-4rem] right-[20rem]'
										: 'left-[20rem] top-[-3rem]'
									}`
								}>
								<SVG
									type="painting"
									color='var(--neutral500)'
								/>
							</div>
						))}
						<header
							className="flex flex-row w-full h-[5%] items-center"
						>
							<div className="basis-1/5" />
							<h1 className="font-testSohneBuch text-[3.2rem] text-center cursor-pointer basis-3/5">
								DiscussBook
							</h1>
							<div className="flex flex-col justify-center items-end basis-1/5 h-full cursor-pointer ">
								<div
									id="container-search"
									className="w-[2.5rem] h-[2.5rem]"
								>
									<SVG
										type="search"
										color='var(--neutral500)'
									/>
								</div>
							</div>
						</header>
						{children}
						<footer className="flex flex-row justify-between bottom-0 w-full h-[3%]">
							<div className="relative cursor-pointer">
								<PanelLeft color="#737373" />
							</div>
							<div className="w-[2.5rem] h-[2.5rem] cursor-pointer">
								<a
									rel="noopener noreferrer"
									href={'https://x.com/JunRod_'}
									target="_blank"
								>
									<SVG
										type="x"
										color='var(--neutral500)'
									/>
								</a>
							</div>
						</footer>
					</div>
				</CustomSidebarProvider>
			</body>
		</html >
	);
}
