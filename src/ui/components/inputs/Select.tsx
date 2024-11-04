import { useEffect, useRef, useState } from "react";


interface Props {
	items: SelectItem[];
	defaultSelected: SelectItem;
	onChange: (value: string) => void;
}

type SelectItem = {
	title: string;
	value: string;
}

export const Select = ({ items, onChange, defaultSelected }: Props) => {
	const [itemSelected, setItemSelected] = useState<SelectItem>(defaultSelected);

	const [canShow, setCanShow] = useState(false);
	const itemsRefDiv = useRef<HTMLDivElement>(null)
	const selectRef = useRef<HTMLDivElement>(null)


	useEffect(() => {
		document.addEventListener('click', (e) => {
			if (selectRef.current && !selectRef.current.contains(e.target as HTMLElement)) {
				setCanShow(false)
			}
		})
	}, [])

	return (
		<div ref={selectRef} className="w-full relative ">
			<div
				onClick={() => setCanShow(!canShow)}

				className={`flex  ${canShow ? 'border-2 border-b-transparent' : 'border-2'} min-h-9 p-[6px] border-gray-200 bg-white  cursor-pointer items-center  pr-2     hover:bg-slate-50`}>

				<input
					className="flex-grow cursor-pointer text-slate-800  bg-transparent focus:outline-none   "
					readOnly
					value={itemSelected.title}
				/>
				<i className={!canShow ? 'bi bi-caret-down-fill' : 'bi bi-caret-up-fill'}> </i>
			</div>
			<div
				ref={itemsRefDiv}
				style={{
					minHeight: canShow ? itemsRefDiv.current?.scrollHeight : '0px',
					height: canShow ? itemsRefDiv.current?.scrollHeight : '0px',
				}}
				className={`absolute  overflow-hidden transition-all duration-150 ease-in-out top-full w-full bg-white shadow-md z-10  rounded-md`}
			>

				{
					items.map((item) => (
						<div
							key={item.value}
							onClick={() => {
								setItemSelected(item);
								setCanShow(false);
								onChange(item.value);
							}}
							className="flex cursor-pointer items-center p-2 hover:bg-slate-100"
						>
							<div className="flex-grow">{item.title}</div>
						</div>
					))
				}
			</div>
		</div>
	)
}
