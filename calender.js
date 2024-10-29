const events = [
    {
        title: "Mom's Birthday",
        date: new Date("2024-09-15"),
        location: "Home",
        attendees: new Set(["Ginny", "Ron"])
    },
    {
        title: "Bills",
        date: new Date("2024-08-30"),
        location: "Hall A",
        attendees: new Set(["Harry"])
    },
    {
        title: "Work Meeting",
        date: new Date("2024-09-29"),
        location: "Rental Building",
        attendees: new Set(["Charlie", "George", "Fred"])
    },
    {
        title: "Camping",
        date: new Date("2025-4-08"),
        location: "Forest",
        attendees: new Set(["Aber", "Idris",])
    }
];
const organizers = new WeakMap();

organizers.set(events[0], "Ron");
organizers.set(events[1], "Bill");
organizers.set(events[2], "Gregorovitch");
organizers.set(events[3], "Olivander");

displayEvents();

function displayEvents() {
    const tableBody = document.querySelector('#tbody');
    tableBody.innerHTML = '';

    events.forEach(event => {
        const row = document.createElement('tr');

        for (const key in event) {
            const cell = document.createElement('td');

            if (key === 'attendees') {
                cell.textContent = Array.from(event[key]).join(', ');
            } else {
                cell.textContent = event[key];
            }

            row.appendChild(cell);
        }

        tableBody.appendChild(row);
    });
}

function displayUpcomingEvents() {
    const today = new Date();
    const nextWeek = new Date();
    nextWeek.setDate(today.getDate() + 7);

    const upcomingEvents = events.filter(event => {
        return event.date >= today && event.date <= nextWeek;
    });

    const tableBody = document.querySelector('#eventTable tbody');
    tableBody.innerHTML = '';

    upcomingEvents.forEach(({ title, date, location, attendees }) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${title}</td>
            <td>${date.toLocaleDateString()}</td>
            <td>${location}</td>
            <td>${Array.from(attendees).join(', ')}</td>
        `;
        tableBody.appendChild(row);
    });
}
function addAttendee(eventTitle, attendeeName) {
    const event = events.find(e => e.title === eventTitle);
    if (event) {
        event.attendees.add(attendeeName);
        alert(`${attendeeName} added to ${eventTitle}`);
        displayUpcomingEvents();
        displayEvents();
    } else {
        alert("event not found");
    }
}


function deleteEvent(eventTitle) {
    if (!eventTitle) {
        alert("Please provide an event title to delete.");
        return;
    }
    const eventIndex = events.findIndex(e => e.title === eventTitle);
    if (eventIndex !== -1) {
        events.splice(eventIndex, 1);
        displayUpcomingEvents();
        displayEvents();
    }
}

function eventToJSON() {
    return JSON.stringify(events.map(event => ({
        ...event,
        formattedDate: event.date.toLocaleDateString()
    })));
}

function showEventSummary() {
    const firstEvent = events[0];
    if (firstEvent) {
        const keys = Object.keys(firstEvent);
        const values = Object.values(firstEvent);
        const entries = Object.entries(firstEvent);
        const summary = { keys, values, entries };
        document.getElementById('eventSummary').textContent = JSON.stringify(summary, null, 2);
    }
}

document.getElementById('addAttendeeButton').addEventListener('click', () => {
    const eventTitle = document.getElementById('eventTitle').value;
    const attendeeName = document.getElementById('attendeeName').value;
    addAttendee(eventTitle, attendeeName);
});

document.getElementById('deleteEventButton').addEventListener('click', () => {
    const eventTitle = document.getElementById('deleteEventTitle').value;
    deleteEvent(eventTitle);
});

displayUpcomingEvents();
showEventSummary();