"use client";

import { type FormEvent, useState } from "react";
import { createLessonAction } from "@/app/teacher/actions";
import {
	Calendar,
	type Event,
	momentLocalizer,
	type SlotInfo,
} from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";

moment.locale("ja");
const localizer = momentLocalizer(moment);

export default function TeacherDashboard() {
	const [events, setEvents] = useState<Event[]>([]);
	const [selectedSlot, setSelectedSlot] = useState<SlotInfo | null>(null);

	const handleSelectSlot = (slotInfo: SlotInfo) => {
		setSelectedSlot(slotInfo);
	};

	const handleCreateLesson = async (e: React.FormEvent<HTMLFormElement>) => {
		if (!selectedSlot) return;
		e.preventDefault();
		const formData = new FormData(e.currentTarget);
		await createLessonAction(formData);
		const title = formData.get("title");
		console.log(title?.toString());
		const newEvent = {
			title: title?.toString() ?? "",
			start: selectedSlot.start,
			end: moment(selectedSlot.start).add(1, "hour").toDate(),
		};
		setEvents([...events, newEvent]);
		setSelectedSlot(null);
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
							<Label>日時</Label>
							<p>
								{selectedSlot &&
									moment(selectedSlot.start).format("YYYY年MM月DD日 HH:mm")}
							</p>
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
