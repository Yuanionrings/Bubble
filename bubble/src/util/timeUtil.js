export function regularToMilitary (timeString) {
    let [ time, m ] = timeString.split(' ');
    let [ hour, minute ] = time.split(':');
    [hour, minute] = [Number(hour), Number(minute)];
    m === 'PM' && hour < 12 && (hour += 12);
    m === 'AM' && hour === 12 && (hour = 0);
    return [hour, minute]
}

export function militaryToRegular (time) {
    let [hour, minute] = time.split(":");
    [hour, minute] = [Number(hour), Number(minute)];
    let suffix = hour >= 12 ? "PM" : "AM"; 

    hour === 0 && (hour = 12);
    hour > 12 && (hour -= 12);

    [hour, minute] = [String(hour), String(minute)];
    hour < 10 && (hour = "0" + hour);
    minute < 10 && (minute = "0" + minute)
    return `${hour}:${minute} ${suffix}`
}

export function getDayIndex (dayString) {
    switch (dayString) {
        case 'Mon':
            return ;
    }
}