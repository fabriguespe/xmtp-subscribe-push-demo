const themes = ["default", "dark", "light"];
const sizes = ["small", "medium", "large"];

export const getRandomBoolean = () => {
  return Math.random() < 0.5;
};
export const checkSubscriptionStatus = (address) => {
  // Get the current list of subscribers
  let subscribers = JSON.parse(localStorage.getItem("subscribers")) || [];

  // Check if the address is in the list
  return subscribers.includes(address);
};

export const getRandomThemes = (max = 2) => {
  const randomThemes = [];
  const ii = Math.floor(Math.random() * max) + 1;
  for (let i = 0; i < ii; i++) {
    randomThemes.push(themes[Math.floor(Math.random() * themes.length)]);
  }
  return randomThemes;
};

export const getRandomSizes = (max = 2) => {
  const randomSizes = [];
  const ii = Math.floor(Math.random() * max) + 1;
  for (let i = 0; i < ii; i++) {
    randomSizes.push(sizes[Math.floor(Math.random() * sizes.length)]);
  }
  return randomSizes;
};
export const addSubscriber = (address) => {
  if (!address) return null;
  // Get the current list of subscribers
  let subscribers = JSON.parse(localStorage.getItem("subscribers")) || [];

  // Add the   new subscriber
  subscribers.push(address);

  // Convert the array to a Set to remove duplicates, then convert it back to an array
  subscribers = [...new Set(subscribers)];
  // Save the updated list back to localStorage
  localStorage.setItem("subscribers", JSON.stringify(subscribers));
  // Return the updated subscriber count
  return subscribers.length;
};

// Function to remove a subscriber
export const removeSubscriber = (address) => {
  // Get the current list of subscribers
  let subscribers = JSON.parse(localStorage.getItem("subscribers")) || [];

  // Remove the subscriber
  subscribers = subscribers.filter((subscriber) => subscriber !== address);

  // Save the updated list back to localStorage
  localStorage.setItem("subscribers", JSON.stringify(subscribers));
  // Return the updated subscriber count
  return subscribers.length;
};
