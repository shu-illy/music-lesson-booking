"use client";

import { useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
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
  const [events, setEvents] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState(null);

  const handleSelectSlot = (slotInfo) => {
    setSelectedSlot(slotInfo);
  };

  const handleCreateLesson = (e) => {
    e.preventDefault();
    const title = e.target.title.value;
    const newEvent = {
      title,
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
      />
      <Dialog open={!!selectedSlot} onOpenChange={() => setSelectedSlot(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>レッスン候補を作成</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleCreateLesson} className="space-y-4">
            <div>
              <Label htmlFor="title">レッスンタイトル</Label>
              <Input id="title" required />
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
            <li key={index} className="bg-gray-100 p-2 rounded">
              {event.title} -{" "}
              {moment(event.start).format("YYYY年MM月DD日 HH:mm")}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
