"use client";
import { useState, useEffect } from "react";

type DayEntry = {
  date: string;
  startTime: string;
  endTime: string;
  jobSite: string;
  description: string;
  totalHours: number;
  isLocked: boolean;
};

type DayData = {
  entries: DayEntry[];
  lunchStart: string;
  lunchEnd: string;
};

const defaultStartTime = "07:30";
const defaultEndTime = "16:30";
const defaultLunchStart = "12:00";
const defaultLunchEnd = "12:30";
const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
const defaultJobSites = ["Job A", "Job B", "Job C"];

function formatDate(date: Date): string {
  return date.toLocaleDateString("en-GB");
}

function calculateHours(start: string, end: string, lunchStart: string, lunchEnd: string): number {
  const startTime = new Date(`1970-01-01T${start}:00`).getTime();
  const endTime = new Date(`1970-01-01T${end}:00`).getTime();
  const lunchStartTime = new Date(`1970-01-01T${lunchStart}:00`).getTime();
  const lunchEndTime = new Date(`1970-01-01T${lunchEnd}:00`).getTime();
  const totalTime = (endTime - startTime - (lunchEndTime - lunchStartTime)) / (1000 * 60 * 60);
  return Math.max(totalTime, 0);
}

function getWeekStart(date: Date): Date {
  const d = new Date(date);
  const day = d.getDay();
  const diff = d.getDate() - day + (day === 0 ? -6 : 1);
  return new Date(d.setDate(diff));
}

export default function Timesheet() {
  const [week, setWeek] = useState<string>(formatDate(getWeekStart(new Date())));
  const [jobSites, setJobSites] = useState<string[]>(defaultJobSites);
  const [timesheet, setTimesheet] = useState<DayData[]>(Array(7).fill({ entries: [], lunchStart: defaultLunchStart, lunchEnd: defaultLunchEnd }));
  const [weekLocked, setWeekLocked] = useState(false);
  const [newJobSite, setNewJobSite] = useState("");

  useEffect(() => {
    const weekStart = getWeekStart(new Date(week.split("/").reverse().join("-")));
    const currentDate = new Date();
    const newTimesheet = daysOfWeek.map((day, i) => {
      const entryDate = new Date(weekStart);
      entryDate.setDate(weekStart.getDate() + i);
      const isFuture = entryDate > currentDate;
      return {
        entries: isFuture ? [] : [{
          date: formatDate(entryDate),
          startTime: defaultStartTime,
          endTime: defaultEndTime,
          jobSite: "",
          description: "",
          totalHours: 0,
          isLocked: false
        }],
        lunchStart: defaultLunchStart,
        lunchEnd: defaultLunchEnd
      };
    });
    setTimesheet(newTimesheet);
  }, [week]);

  const addJobSite = (newSite: string) => {
    if (newSite.trim() && !weekLocked) {
      setJobSites((prev) => [...prev, newSite]);
      setNewJobSite("");
    }
  };

  const addEntry = (dayIndex: number) => {
    if (weekLocked || timesheet[dayIndex].entries[0]?.isLocked) return;
    const lastEntry = timesheet[dayIndex].entries[timesheet[dayIndex].entries.length - 1];
    const newEntry: DayEntry = {
      date: daysOfWeek[dayIndex],
      startTime: lastEntry ? lastEntry.endTime : defaultStartTime,
      endTime: defaultEndTime,
      jobSite: "",
      description: "",
      totalHours: 0,
      isLocked: false
    };
    setTimesheet((prev) => {
      const updated = [...prev];
      updated[dayIndex].entries = [...updated[dayIndex].entries, newEntry];
      return updated;
    });
  };

  const removeEntry = (dayIndex: number, entryIndex: number) => {
    if (weekLocked || timesheet[dayIndex].entries[entryIndex].isLocked) return;
    setTimesheet((prev) => {
      const updated = [...prev];
      updated[dayIndex].entries = updated[dayIndex].entries.filter((_, i) => i !== entryIndex);
      return updated;
    });
  };

  const updateEntry = (dayIndex: number, entryIndex: number, field: keyof DayEntry, value: string) => {
    if (weekLocked || timesheet[dayIndex].entries[entryIndex].isLocked) return;
    setTimesheet((prev) => {
      const updated = [...prev];
      updated[dayIndex].entries[entryIndex] = { ...updated[dayIndex].entries[entryIndex], [field]: value };
      return updated;
    });
  };

  const updateLunch = (dayIndex: number, field: "lunchStart" | "lunchEnd", value: string) => {
    if (weekLocked || timesheet[dayIndex].entries.some(entry => entry.isLocked)) return;
    setTimesheet((prev) => {
      const updated = [...prev];
      updated[dayIndex][field] = value;
      return updated;
    });
  };

  const saveDay = (dayIndex: number) => {
    if (weekLocked) return;
    setTimesheet((prev) => {
      const updated = [...prev];
      updated[dayIndex].entries = updated[dayIndex].entries.map(entry => ({
        ...entry,
        totalHours: entry.jobSite ? calculateHours(entry.startTime, entry.endTime, updated[dayIndex].lunchStart, updated[dayIndex].lunchEnd) : 0,
        isLocked: true
      }));
      return updated;
    });
  };

  const editDay = (dayIndex: number) => {
    if (weekLocked) return;
    setTimesheet((prev) => {
      const updated = [...prev];
      updated[dayIndex].entries = updated[dayIndex].entries.map(entry => ({ ...entry, isLocked: false }));
      return updated;
    });
  };

  const totalWeekHours = timesheet.flatMap(day => day.entries).reduce((sum, entry) => sum + (entry.isLocked && entry.jobSite ? entry.totalHours : 0), 0);

  return (
    <main style={{ padding: "2rem" }}>
      <h1>Workers Timesheet</h1>

      <div style={{ margin: "1rem 0" }}>
        <input
          type="text"
          value={newJobSite}
          onChange={(e) => setNewJobSite(e.target.value)}
          placeholder="New Job Site"
          disabled={weekLocked}
        />
        <button onClick={() => addJobSite(newJobSite)} disabled={weekLocked}>
          Add Job Site
        </button>
      </div>

      <div style={{ marginBottom: "1rem" }}>
        <label>Select Week: </label>
        <input
          type="date"
          value={week.split("/").reverse().join("-")}
          onChange={(e) => setWeek(formatDate(getWeekStart(new Date(e.target.value))))}
          style={{ margin: "0 1rem" }}
          disabled={weekLocked}
        />
        <button onClick={() => setWeek(formatDate(getWeekStart(new Date(Date.now() - 7 * 24 * 60 * 60 * 1000))))}>
          Fill Last Week
        </button>
      </div>

      {daysOfWeek.map((day, dayIndex) => {
        const entryDate = new Date(week.split("/").reverse().join("-"));
        entryDate.setDate(getWeekStart(new Date(week.split("/").reverse().join("-"))).getDate() + dayIndex);
        const isFuture = entryDate > new Date();

        return (
          <div key={day} style={{ marginBottom: "2rem" }}>
            <h3>{day} - {formatDate(entryDate)}</h3>
            {isFuture ? (
              <p>Future dates cannot be edited</p>
            ) : (
              <>
                <table className="excel-table">
                  <thead>
                    <tr>
                      <th>Job Site</th>
                      <th>Start</th>
                      <th>End</th>
                      <th>Description</th>
                      <th>Total Hours</th>
                      <th>Remove</th>
                    </tr>
                  </thead>
                  <tbody>
                    {timesheet[dayIndex].entries.map((entry, entryIndex) => (
                      <tr key={entryIndex}>
                        <td>
                          <select
                            value={entry.jobSite}
                            onChange={(e) => updateEntry(dayIndex, entryIndex, "jobSite", e.target.value)}
                            disabled={entry.isLocked || weekLocked}
                          >
                            <option value="">Select Job Site</option>
                            {jobSites.map((site, i) => (
                              <option key={i} value={site}>{site}</option>
                            ))}
                          </select>
                        </td>
                        <td>
                          <input
                            type="time"
                            value={entry.startTime}
                            onChange={(e) => updateEntry(dayIndex, entryIndex, "startTime", e.target.value)}
                            disabled={entry.isLocked || weekLocked}
                          />
                        </td>
                        <td>
                          <input
                            type="time"
                            value={entry.endTime}
                            onChange={(e) => updateEntry(dayIndex, entryIndex, "endTime", e.target.value)}
                            disabled={entry.isLocked || weekLocked}
                          />
                        </td>
                        <td>
                          <input
                            type="text"
                            value={entry.description}
                            placeholder="Description"
                            onChange={(e) => updateEntry(dayIndex, entryIndex, "description", e.target.value)}
                            disabled={entry.isLocked || weekLocked}
                          />
                        </td>
                        <td>{entry.isLocked && entry.jobSite ? entry.totalHours.toFixed(2) : "0.00"}</td>
                        <td>
                          {entryIndex > 0 && (
                            <button
                              onClick={() => removeEntry(dayIndex, entryIndex)}
                              disabled={entry.isLocked || weekLocked}
                            >
                              Remove
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                <div style={{ marginTop: "1rem" }}>
                  <label>Lunch:</label>{" "}
                  <input
                    type="time"
                    value={timesheet[dayIndex].lunchStart}
                    onChange={(e) => updateLunch(dayIndex, "lunchStart", e.target.value)}
                    disabled={weekLocked || timesheet[dayIndex].entries.some(entry => entry.isLocked)}
                  />
                  {" "}
                  <input
                    type="time"
                    value={timesheet[dayIndex].lunchEnd}
                    onChange={(e) => updateLunch(dayIndex, "lunchEnd", e.target.value)}
                    disabled={weekLocked || timesheet[dayIndex].entries.some(entry => entry.isLocked)}
                  />
                </div>

                <div style={{ marginTop: "0.5rem" }}>
                  <button onClick={() => addEntry(dayIndex)} disabled={weekLocked || timesheet[dayIndex].entries[0]?.isLocked}>
                    Add Entry
                  </button>
                  {" "}
                  {timesheet[dayIndex].entries.length > 0 && (
                    timesheet[dayIndex].entries[0].isLocked ? (
                      <button onClick={() => editDay(dayIndex)} disabled={weekLocked}>Edit Day</button>
                    ) : (
                      <button onClick={() => saveDay(dayIndex)} disabled={weekLocked}>Save Day</button>
                    )
                  )}
                </div>
              </>
            )}
          </div>
        );
      })}

      <h3>Total Week Hours: {totalWeekHours.toFixed(2)}</h3>
      {!weekLocked ? (
        <button onClick={() => setWeekLocked(true)}>Submit Weekly Timesheet</button>
      ) : (
        <button onClick={() => setWeekLocked(false)}>Edit Week</button>
      )}
    </main>
  );
}
