export const isReminderPresent = (reminders, dayNumber, monthNumber, calendarYear) => {
    return reminders.map((reminder) => {
        if (reminder.reminderTime.date() === dayNumber) {
            if (reminder.reminderTime.month() + 1 === monthNumber) {
                if (reminder.reminderTime.year().toString() === calendarYear) {
                    return reminder
                }
            }
        }
        return null
    })
}

export const sortRemindersByTime = (first, second) => {
    return first < second ? -1 : first > second ? 1 : 0
}