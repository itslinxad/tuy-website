import { useState, useEffect, useMemo } from "react";
import { useScrollAnimation } from "../hooks/useScrollAnimation";
import { apiGetEvents, type CalendarEvent } from "../services/api";

const monthNames = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

const getDaysInMonth = (month: number, year: number) => new Date(year, month + 1, 0).getDate();
const getFirstDayOfMonth = (month: number, year: number) => new Date(year, month, 1).getDay();

function CalendarOfEvents() {
  const calendarRef = useScrollAnimation();
  const today = new Date();
  const [calendarMonth, setCalendarMonth] = useState(today.getMonth());
  const [calendarYear, setCalendarYear] = useState(today.getFullYear());
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    apiGetEvents()
      .then((res) => {
        setEvents(res.data ?? []);
      })
      .catch((err) => {
        console.error("Failed to fetch calendar events:", err);
      })
      .finally(() => setLoading(false));
  }, []);

  // Transform flat event array into Record<"MM-DD", {title, icon, color}[]>
  const municipalEvents = useMemo(() => {
    const map: Record<string, { title: string; icon: string; color: string }[]> = {};
    for (const ev of events) {
      if (!map[ev.event_date]) {
        map[ev.event_date] = [];
      }
      map[ev.event_date].push({
        title: ev.title,
        icon: ev.icon,
        color: ev.color,
      });
    }
    return map;
  }, [events]);

  const prevMonth = () => {
    if (calendarMonth === 0) {
      setCalendarMonth(11);
      setCalendarYear(calendarYear - 1);
    } else {
      setCalendarMonth(calendarMonth - 1);
    }
    setSelectedDate(null);
  };

  const nextMonth = () => {
    if (calendarMonth === 11) {
      setCalendarMonth(0);
      setCalendarYear(calendarYear + 1);
    } else {
      setCalendarMonth(calendarMonth + 1);
    }
    setSelectedDate(null);
  };

  const goToToday = () => {
    setCalendarMonth(today.getMonth());
    setCalendarYear(today.getFullYear());
    setSelectedDate(null);
  };

  const getEventKey = (day: number) => {
    const mm = String(calendarMonth + 1).padStart(2, "0");
    const dd = String(day).padStart(2, "0");
    return `${mm}-${dd}`;
  };

  const getEventsForDay = (day: number) => municipalEvents[getEventKey(day)] ?? [];

  // Collect all events visible in the current month for the sidebar
  const currentMonthEvents: { day: number; title: string; icon: string; color: string }[] = [];
  for (let d = 1; d <= getDaysInMonth(calendarMonth, calendarYear); d++) {
    for (const ev of getEventsForDay(d)) {
      currentMonthEvents.push({ day: d, ...ev });
    }
  }

  return (
    <section
      ref={calendarRef.elementRef as React.RefObject<HTMLElement>}
      className="py-12 md:py-16 bg-gray-50"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        <div
          className={`flex items-center mb-8 md:mb-12 scroll-animate ${calendarRef.isVisible ? "visible" : ""}`}
        >
          <div className="w-1.5 sm:w-2 h-12 sm:h-16 md:h-20 bg-primary mr-2 sm:mr-3 md:mr-4"></div>
          <div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-primary">
              Calendar of Events
            </h2>
            <p className="text-sm sm:text-base text-gray-600 mt-1 sm:mt-2">
              Municipal holidays, fiestas, and community events
            </p>
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex items-center justify-center py-16">
            <div className="text-center">
              <i className="fas fa-spinner fa-spin text-4xl text-primary mb-4"></i>
              <p className="text-gray-500">Loading calendar events...</p>
            </div>
          </div>
        )}

        {!loading && (
          <div
            className={`grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8 scroll-animate ${calendarRef.isVisible ? "visible" : ""}`}
          >
            {/* Calendar Grid */}
            <div className="lg:col-span-2 bg-white border-2 border-gray-200 rounded-lg shadow-lg overflow-hidden">
              {/* Month Header */}
              <div className="bg-primary px-4 sm:px-6 py-4 flex items-center justify-between">
                <button
                  onClick={prevMonth}
                  className="text-white hover:bg-white/20 rounded-full w-9 h-9 flex items-center justify-center transition-colors cursor-pointer"
                  aria-label="Previous month"
                >
                  <i className="fas fa-chevron-left"></i>
                </button>
                <div className="text-center">
                  <h3 className="text-xl sm:text-2xl font-bold text-white">
                    {monthNames[calendarMonth]} {calendarYear}
                  </h3>
                </div>
                <button
                  onClick={nextMonth}
                  className="text-white hover:bg-white/20 rounded-full w-9 h-9 flex items-center justify-center transition-colors cursor-pointer"
                  aria-label="Next month"
                >
                  <i className="fas fa-chevron-right"></i>
                </button>
              </div>

              {/* Today Button */}
              {(calendarMonth !== today.getMonth() || calendarYear !== today.getFullYear()) && (
                <div className="px-4 sm:px-6 pt-3 flex justify-end">
                  <button
                    onClick={goToToday}
                    className="text-xs text-primary hover:text-primary-hover font-medium px-3 py-1 rounded-full border border-primary/30 hover:bg-primary/5 transition-colors cursor-pointer"
                  >
                    <i className="fas fa-calendar-day mr-1"></i>Today
                  </button>
                </div>
              )}

              {/* Day Labels */}
              <div className="grid grid-cols-7 px-2 sm:px-4 pt-4 pb-2">
                {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                  <div key={day} className="text-center text-xs sm:text-sm font-semibold text-gray-500 py-2">
                    {day}
                  </div>
                ))}
              </div>

              {/* Date Grid */}
              <div className="grid grid-cols-7 px-2 sm:px-4 pb-4 gap-y-1">
                {/* Empty cells for days before the 1st */}
                {Array.from({ length: getFirstDayOfMonth(calendarMonth, calendarYear) }).map((_, i) => (
                  <div key={`empty-${i}`} className="aspect-square" />
                ))}

                {/* Day cells */}
                {Array.from({ length: getDaysInMonth(calendarMonth, calendarYear) }).map((_, i) => {
                  const day = i + 1;
                  const dayEvents = getEventsForDay(day);
                  const hasEvents = dayEvents.length > 0;
                  const isToday =
                    day === today.getDate() &&
                    calendarMonth === today.getMonth() &&
                    calendarYear === today.getFullYear();
                  const isSelected = selectedDate === getEventKey(day);

                  return (
                    <button
                      key={day}
                      onClick={() => setSelectedDate(isSelected ? null : getEventKey(day))}
                      className={`aspect-square rounded-lg flex flex-col items-center justify-center relative transition-all text-sm sm:text-base cursor-pointer
                        ${isToday ? "bg-primary text-white font-bold shadow-md" : ""}
                        ${isSelected && !isToday ? "bg-primary/10 ring-2 ring-primary font-semibold" : ""}
                        ${!isToday && !isSelected ? "hover:bg-gray-100" : ""}
                      `}
                      aria-label={`${monthNames[calendarMonth]} ${day}${hasEvents ? `, ${dayEvents.length} event(s)` : ""}`}
                    >
                      {day}
                      {hasEvents && (
                        <div className="flex gap-0.5 mt-0.5">
                          {dayEvents.map((_ev, idx) => (
                            <span
                              key={idx}
                              className={`w-1.5 h-1.5 rounded-full ${isToday ? "bg-yellow-300" : "bg-primary"}`}
                            />
                          ))}
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Selected Date Detail */}
              {selectedDate && municipalEvents[selectedDate] && (
                <div className="border-t border-gray-200 px-4 sm:px-6 py-4 bg-primary/5">
                  <h4 className="text-sm font-semibold text-primary mb-2">
                    <i className="fas fa-calendar-check mr-1.5"></i>
                    {monthNames[calendarMonth]} {parseInt(selectedDate.split("-")[1])}, {calendarYear}
                  </h4>
                  {municipalEvents[selectedDate].map((ev, idx) => (
                    <div key={idx} className="flex items-center gap-2 py-1">
                      <i className={`fas ${ev.icon} ${ev.color}`}></i>
                      <span className="text-gray-800 text-sm sm:text-base">{ev.title}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Upcoming Events Sidebar */}
            <div className="bg-white border-2 border-gray-200 rounded-lg shadow-lg p-5 md:p-6 flex flex-col">
              <h3 className="text-lg md:text-xl font-bold text-gray-800 mb-4 flex items-center">
                <i className="fas fa-calendar-alt text-primary mr-2"></i>
                Events in {monthNames[calendarMonth]}
              </h3>

              {currentMonthEvents.length === 0 ? (
                <div className="flex-grow flex flex-col items-center justify-center text-center py-8">
                  <i className="fas fa-calendar-xmark text-4xl text-gray-300 mb-3"></i>
                  <p className="text-gray-500 text-sm">
                    No events scheduled this month
                  </p>
                </div>
              ) : (
                <ul className="space-y-3 flex-grow overflow-y-auto max-h-[400px]">
                  {currentMonthEvents.map((ev, idx) => (
                    <li
                      key={idx}
                      className="group flex items-start gap-3 p-3 rounded-lg hover:bg-primary/5 transition-colors cursor-pointer"
                      onClick={() => setSelectedDate(getEventKey(ev.day))}
                    >
                      <div className="w-10 h-10 sm:w-12 sm:h-12 bg-primary/10 rounded-lg flex flex-col items-center justify-center shrink-0">
                        <span className="text-[10px] sm:text-xs text-primary font-medium leading-none">
                          {monthNames[calendarMonth].slice(0, 3).toUpperCase()}
                        </span>
                        <span className="text-base sm:text-lg font-bold text-primary leading-none">
                          {ev.day}
                        </span>
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm sm:text-base font-semibold text-gray-800 group-hover:text-primary transition-colors truncate">
                          {ev.title}
                        </p>
                        <p className="text-xs text-gray-500">
                          {monthNames[calendarMonth]} {ev.day}, {calendarYear}
                        </p>
                      </div>
                      <i className={`fas ${ev.icon} ${ev.color} ml-auto mt-1 text-lg shrink-0`}></i>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

export default CalendarOfEvents;
