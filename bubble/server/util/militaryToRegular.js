exports.militaryToRegular = (time) => {
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