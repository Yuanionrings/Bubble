export function regularToMilitary (timeString) {
    let [ time, m ] = timeString.split(' ');
    let [ hour, minute ] = time.split(':');
    [hour, minute] = [Number(hour), Number(minute)];
    m === 'PM' && hour < 12 && (hour += 12);
    m === 'AM' && hour === 12 && (hour = 0);
    return [hour, minute]
}