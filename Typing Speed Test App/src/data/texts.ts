export const sampleTexts = [
  "The quick brown fox jumps over the lazy dog. This pangram contains every letter of the alphabet at least once, making it perfect for typing practice.",
  
  "In the digital age, the ability to type quickly and accurately has become an essential skill. Whether you're a student, professional, or casual computer user, improving your typing speed can significantly boost your productivity.",
  
  "Programming is not just about writing code; it's about solving problems creatively. Each line of code represents a solution to a specific challenge, and the elegance of the solution often determines the quality of the program.",
  
  "The art of communication has evolved dramatically over the centuries. From handwritten letters to instant messaging, each medium has shaped how we express our thoughts and connect with others.",
  
  "Climate change represents one of the most pressing challenges of our time. Rising temperatures, melting ice caps, and extreme weather events are clear indicators that immediate action is required to protect our planet.",
  
  "Artificial intelligence is transforming industries at an unprecedented pace. Machine learning algorithms can now recognize patterns, make predictions, and automate complex tasks that were once thought to be exclusively human domains.",
  
  "The pursuit of knowledge has always been a fundamental human drive. Libraries, universities, and research institutions serve as beacons of learning, preserving wisdom and fostering innovation for future generations.",
  
  "Space exploration continues to capture our imagination and push the boundaries of human achievement. From the first moon landing to Mars rovers, each mission expands our understanding of the universe.",
  
  "Sustainable living is not just an environmental choice; it's a lifestyle that promotes long-term well-being for both individuals and communities. Small changes in daily habits can lead to significant positive impacts.",
  
  "The power of storytelling transcends cultures and generations. Whether through books, films, or oral traditions, stories help us understand ourselves, connect with others, and make sense of the world around us."
];

export const getRandomText = (): string => {
  return sampleTexts[Math.floor(Math.random() * sampleTexts.length)];
};