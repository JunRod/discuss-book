
'use server'

import DropZone from "@/src/components/dropzone";
import { Button } from "@/src/components/ui/button";
import { Newsreader } from 'next/font/google'
import SVG from "@/src/components/svg";

// If loading a variable font, you don't need to specify the font weight
const newsreader = Newsreader({
	weight: ['400', '700'],
	style: 'italic',
})

export default async function Home() {

	return (
		<main className="flex flex-row items-center">
			<div className="flex flex-col basis-1/4 w-4 h-4" />
			<div className="flex flex-col justify-center basis-2/4">
				<div className="text-center">
					<h2 className="text-center font-testSohneBuch text-[4rem]">
						Create a
						<span className={`${newsreader.className} text-[4rem]`}> Discussion </span>
						Space
					</h2>
					<h3 className="font-TestSohneLeicht text-[2rem] relative top-[-1.5rem]">Discuss with other people whatever you like.</h3>
				</div>
				<div className="flex flex-row justify-center gap-10">
					<Button variant="outline" size='default' style={{ fontSize: '1.4rem', borderRadius: '0.5rem' }}>Private</Button>
					<Button variant="outline" size='default' style={{ fontSize: '1.4rem' }}>Public</Button>
				</div>
				<div className="flex flex-row justify-center mt-10">
					<DropZone />
				</div>
			</div>
			<div className="w-[7rem] h-[10rem] right-[20rem] cursor-pointer basis-1/4">
				<SVG
					type="rowRight"
					color="var(--neutral100)"
				/>
			</div>
		</main>
	);
}
