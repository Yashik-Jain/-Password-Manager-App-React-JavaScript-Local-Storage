// Simple counter-based ID generator
let counter = 0;
export const generateCounterId = () => {
    return ++counter;
};

// Timestamp-based ID generator
export const generateTimestampId = () => {
    return parseInt(Date.now().toString().slice(-8));
};

// Timestamp with random number for more uniqueness
export const generateUniqueId = () => {
    const timestamp = Date.now().toString().slice(-6);
    const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
    return parseInt(timestamp + random);
};
