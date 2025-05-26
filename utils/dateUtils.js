
export const isUpcomingOrToday = (dateString) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0); 

  const eventDate = new Date(dateString);
  eventDate.setHours(0, 0, 0, 0); 

  return eventDate >= today;
};


export const formatEventDate = (dateString) => {
  const date = new Date(dateString);
  return {
    month: date.toLocaleString('default', { month: 'short' }).toUpperCase(),
    day: date.getDate(),
    weekday: date.toLocaleString('default', { weekday: 'long' })
  };
}; 