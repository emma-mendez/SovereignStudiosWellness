import { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { format, getDay, addDays } from "date-fns";
import { CalendarDays, Clock } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface TimeSlot {
  time: string;
  label: string;
}

interface BookingCalendarProps {
  selectedDate: Date | undefined;
  selectedTime: string | undefined;
  onSelect: (date: Date | undefined, time: string | undefined) => void;
  className?: string;
}

// Availability schedule
// Saturday (6): Closed
// Sunday (0): 9am-10:30am, 3pm-9pm
// Mon-Fri (1-5): 9:30am-1pm
const getAvailabilityForDay = (dayOfWeek: number): TimeSlot[] => {
  if (dayOfWeek === 6) {
    // Saturday - Closed
    return [];
  }
  
  if (dayOfWeek === 0) {
    // Sunday - 9am-10:30am, 3pm-9pm
    return [
      { time: "09:00", label: "9:00 AM" },
      { time: "09:30", label: "9:30 AM" },
      { time: "10:00", label: "10:00 AM" },
      { time: "15:00", label: "3:00 PM" },
      { time: "15:30", label: "3:30 PM" },
      { time: "16:00", label: "4:00 PM" },
      { time: "16:30", label: "4:30 PM" },
      { time: "17:00", label: "5:00 PM" },
      { time: "17:30", label: "5:30 PM" },
      { time: "18:00", label: "6:00 PM" },
      { time: "18:30", label: "6:30 PM" },
      { time: "19:00", label: "7:00 PM" },
      { time: "19:30", label: "7:30 PM" },
      { time: "20:00", label: "8:00 PM" },
      { time: "20:30", label: "8:30 PM" },
    ];
  }
  
  // Monday - Friday: 9:30am-1pm
  return [
    { time: "09:30", label: "9:30 AM" },
    { time: "10:00", label: "10:00 AM" },
    { time: "10:30", label: "10:30 AM" },
    { time: "11:00", label: "11:00 AM" },
    { time: "11:30", label: "11:30 AM" },
    { time: "12:00", label: "12:00 PM" },
    { time: "12:30", label: "12:30 PM" },
  ];
};

const getAvailableDates = (): Date[] => {
  const dates: Date[] = [];
  const today = new Date();
  
  // Generate available dates for the next 60 days
  for (let i = 1; i <= 60; i++) {
    const date = addDays(today, i);
    const dayOfWeek = getDay(date);
    
    // Skip Saturdays (closed)
    if (dayOfWeek !== 6) {
      dates.push(date);
    }
  }
  return dates;
};

export const BookingCalendar = ({
  selectedDate,
  selectedTime,
  onSelect,
  className,
}: BookingCalendarProps) => {
  const availableDates = getAvailableDates();

  const isDateAvailable = (date: Date) => {
    return availableDates.some(
      (availableDate) =>
        availableDate.toDateString() === date.toDateString()
    );
  };

  const isDateDisabled = (date: Date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    // Disable past dates, Saturdays, and unavailable dates
    return date < today || !isDateAvailable(date);
  };

  const handleDateSelect = (date: Date | undefined) => {
    onSelect(date, undefined); // Reset time when date changes
  };

  const handleTimeSelect = (time: string) => {
    onSelect(selectedDate, time);
  };

  const timeSlots = selectedDate 
    ? getAvailabilityForDay(getDay(selectedDate)) 
    : [];

  return (
    <div className={cn("space-y-6", className)}>
      <div className="flex items-center gap-2 text-muted-foreground">
        <CalendarDays className="h-5 w-5" />
        <span className="text-sm">Select an available date</span>
      </div>
      
      <div className="bg-card/50 backdrop-blur-sm border border-border rounded-2xl p-4">
        <Calendar
          mode="single"
          selected={selectedDate}
          onSelect={handleDateSelect}
          disabled={isDateDisabled}
          className="pointer-events-auto"
          modifiers={{
            available: (date) => isDateAvailable(date),
          }}
          modifiersClassNames={{
            available: "bg-primary/10 hover:bg-primary/20 text-primary font-medium",
          }}
        />
        
        {selectedDate && (
          <div className="mt-4 pt-4 border-t border-border">
            <p className="text-sm text-muted-foreground">Selected date:</p>
            <p className="text-foreground font-semibold">
              {format(selectedDate, "EEEE, MMMM d, yyyy")}
            </p>
          </div>
        )}
      </div>

      {/* Time Slots */}
      {selectedDate && timeSlots.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Clock className="h-5 w-5" />
            <span className="text-sm">Select a time slot</span>
          </div>
          
          <div className="bg-card/50 backdrop-blur-sm border border-border rounded-2xl p-4">
            <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
              {timeSlots.map((slot) => (
                <Button
                  key={slot.time}
                  variant={selectedTime === slot.time ? "default" : "outline"}
                  size="sm"
                  onClick={() => handleTimeSelect(slot.time)}
                  className={cn(
                    "transition-all",
                    selectedTime === slot.time && "bg-primary text-primary-foreground"
                  )}
                >
                  {slot.label}
                </Button>
              ))}
            </div>
            
            {selectedTime && (
              <div className="mt-4 pt-4 border-t border-border">
                <p className="text-sm text-muted-foreground">Selected time:</p>
                <p className="text-foreground font-semibold">
                  {timeSlots.find(s => s.time === selectedTime)?.label}
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Availability notice */}
      <div className="p-3 bg-muted/50 rounded-lg">
        <p className="text-xs text-muted-foreground text-center">
          📅 Availability: Sun 9am-10:30am & 3pm-9pm | Mon-Fri 9:30am-1pm | Sat Closed
        </p>
      </div>
    </div>
  );
};
