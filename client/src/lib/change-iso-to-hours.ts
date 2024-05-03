export function formatTimeFromISO(isoDateString:string) {
    // Convert ISO 8601 string to a Date object
    const date = new Date(isoDateString);

    // Format the time into a 12-hour format (e.g., "10:31 AM")
    const formattedTime = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    return formattedTime;
}