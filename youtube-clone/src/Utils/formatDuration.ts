
const LEADING_ZERO_FORMATTER = new Intl.NumberFormat(undefined, {
  minimumIntegerDigits: 2,
});

export function formatDuration(duration: number | string) {

  if(typeof duration === "string"){
    const match = duration.match(/PT(\d+M)?(\d+S)?/);
    if (match) {
      const minutes = parseInt(match[1]) || 0;
      const seconds = parseInt(match[2]) || 0;

      // Calculate the total duration in seconds
      const totalSeconds = minutes * 60 + seconds;
      duration =  totalSeconds;
    } else {
      return `00:00`;
    } 
  }

  const hours = Math.floor(duration / 3600);
  const minutes = Math.floor((duration - hours * 3600) / 60);
  const seconds = duration % 60;

  if (hours > 0) {
    return `${hours}:${LEADING_ZERO_FORMATTER.format(
      minutes
    )}:${LEADING_ZERO_FORMATTER.format(seconds)}`;
  }

  return `${minutes}:${LEADING_ZERO_FORMATTER.format(seconds)}`;
}