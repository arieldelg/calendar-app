import { EventNote } from "../../Types";

interface ComponentEvent {
  continuesAfter: boolean;
  continuesPrior: boolean;
  event: EventNote;
  isAllDay: boolean | undefined;
  slotEnd: object;
  slotStart: object;
  title: string;
}

const CalendarEvent = ({ event }: ComponentEvent) => {
  return (
    <section>
      <p>
        {event.title} - {event.name}
      </p>
    </section>
  );
};

export default CalendarEvent;
