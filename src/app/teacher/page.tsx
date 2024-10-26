"use client";

import { createLessonAction } from "@/app/teacher/actions";
import moment from "moment";
import { type FormEvent, useState } from "react";
import {
	Calendar,
	type Event,
	type SlotInfo,
	momentLocalizer,
} from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";

moment.locale("ja");
const localizer = momentLocalizer(moment);

export default function TeacherDashboard() {
	const [events, setEvents] = useState<Event[]>([]);
	const [selectedSlot, setSelectedSlot] = useState<SlotInfo | null>(null);
	const [startTime, setStartTime] = useState("07:00");

	const handleSelectSlot = (slotInfo: SlotInfo) => {
		setSelectedSlot(slotInfo);
		setStartTime("07:00");
	};

	const handleCreateLesson = async (e: React.FormEvent<HTMLFormElement>) => {
		if (!selectedSlot) return;
		e.preventDefault();
		const formData = new FormData(e.currentTarget);
		await createLessonAction(formData);
		const title = formData.get("title");
		const start = moment(selectedSlot.start)
			.set({
				hour: Number.parseInt(startTime.split(":")[0]),
				minute: Number.parseInt(startTime.split(":")[1]),
			})
			.toDate();
		const end = moment(start).add(1, "hour").toDate();
		const newEvent = {
			title: title?.toString() ?? "",
			start,
			end,
		};
		setEvents([...events, newEvent]);
		setSelectedSlot(null);
	};

	const generateTimeOptions = () => {
		const options = [];
		for (let hour = 7; hour < 21; hour++) {
			for (let minute = 0; minute < 60; minute += 15) {
				const time = `${hour.toString().padStart(2, "0")}:${minute.toString().padStart(2, "0")}`;
				options.push(
					<SelectItem key={time} value={time}>
						{time}
					</SelectItem>,
				);
			}
		}
		// Add 21:00 as the last option
		options.push(
			<SelectItem key="21:00" value="21:00">
				21:00
			</SelectItem>,
		);
		return options;
	};

	return (
		<div className="container mx-auto p-4">
			<h1 className="text-2xl font-bold mb-4">講師ダッシュボード</h1>
			<Calendar
				localizer={localizer}
				events={events}
				startAccessor="start"
				endAccessor="end"
				style={{ height: 500 }}
				selectable
				onSelectSlot={handleSelectSlot}
				views={["month", "week", "day"]}
			/>
			<Dialog open={!!selectedSlot} onOpenChange={() => setSelectedSlot(null)}>
				<DialogContent>
					<DialogHeader>
						<DialogTitle>レッスン候補を作成</DialogTitle>
					</DialogHeader>
					<form onSubmit={handleCreateLesson} className="space-y-4">
						<div>
							<Label htmlFor="title">レッスン名</Label>
							<Input id="title" name="title" required />
						</div>
						<div>
							<Label htmlFor="date">日付</Label>
							<Input
								id="date"
								value={
									selectedSlot
										? moment(selectedSlot.start).format("YYYY-MM-DD")
										: ""
								}
								disabled
							/>
						</div>
						<div>
							<Label htmlFor="startTime">開始時刻</Label>
							<Select value={startTime} onValueChange={setStartTime}>
								<SelectTrigger>
									<SelectValue placeholder="開始時刻を選択" />
								</SelectTrigger>
								<SelectContent>{generateTimeOptions()}</SelectContent>
							</Select>
						</div>
						<div>
							<Label htmlFor="endTime">終了時刻</Label>
							<Input
								id="endTime"
								value={
									startTime
										? moment(startTime, "HH:mm").add(1, "hour").format("HH:mm")
										: ""
								}
								disabled
							/>
						</div>
						<Button type="submit">作成</Button>
					</form>
				</DialogContent>
			</Dialog>
			<div className="mt-8">
				<h2 className="text-xl font-bold mb-4">レッスン候補一覧</h2>
				<ul className="space-y-2">
					{events.map((event, index) => (
						<li
							key={event.title?.toString()}
							className="bg-gray-100 p-2 rounded"
						>
							{event.title} -{" "}
							{moment(event.start).format("YYYY年MM月DD日 HH:mm")}
						</li>
					))}
				</ul>
			</div>
		</div>
	);
}
