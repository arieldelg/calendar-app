import { DataEvent } from "../pages/CalendarApp";

interface ComponentEvent {
  continuesAfter: boolean;
  continuesPrior: boolean;
  event: DataEvent;
  isAllDay: boolean | undefined;
  slotEnd: object;
  slotStart: object;
  title: string;
}

const CalendarEvent = ({ event }: ComponentEvent) => {
  return (
    <section>
      <p>
        {event.title} - {event.user.name}
      </p>
    </section>
  );
};

export default CalendarEvent;
