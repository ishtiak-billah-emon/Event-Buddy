// Function to get events from localStorage
export const getEventsFromStorage = () => {
  if (typeof window !== 'undefined') {
    const events = localStorage.getItem('events');
    return events ? JSON.parse(events) : [];
  }
  return [];
};

// Function to save events to localStorage
export const saveEventsToStorage = (events) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('events', JSON.stringify(events));
  }
};

// Function to add new event
export const addEvent = (event) => {
  const events = getEventsFromStorage();
  const newEvent = {
    ...event,
    id: Date.now().toString(),
    remainingSeats: parseInt(event.capacity), // Ensure remainingSeats is initialized
  };
  events.push(newEvent);
  saveEventsToStorage(events);
  return newEvent;
};

// Function to update event
export const updateEvent = (eventId, updatedEvent) => {
  const events = getEventsFromStorage();
  const index = events.findIndex(event => event.id === eventId);
  if (index !== -1) {
    events[index] = { ...updatedEvent, id: eventId };
    saveEventsToStorage(events);
    return true;
  }
  return false;
};

// Function to delete event
export const deleteEvent = (eventId) => {
  const events = getEventsFromStorage();
  const filteredEvents = events.filter(event => event.id !== eventId);
  saveEventsToStorage(filteredEvents);
};

// Function to book seats for an event
export const bookEventSeats = (eventId, numberOfSeats) => {
  const events = getEventsFromStorage();
  const eventIndex = events.findIndex(event => event.id === eventId);
  
  if (eventIndex === -1) {
    throw new Error('Event not found');
  }

  const event = events[eventIndex];
  
  // Check if enough seats are available
  if (event.remainingSeats < numberOfSeats) {
    throw new Error('Not enough seats available');
  }

  // Update remaining seats
  event.remainingSeats -= numberOfSeats; 
  
  // Save updated events
  saveEventsToStorage(events);
  
  return event.remainingSeats;
};

// Function to get remaining seats for an event
export const getRemainingSeats = (eventId) => {
  const events = getEventsFromStorage();
  const event = events.find(event => event.id === eventId);
  
  if (!event) {
    throw new Error('Event not found');
  }

  return event.remainingSeats;
}; 