export const config = {
  baseUrl: process.env.BASE_URL || "https://www.robjmichaels.com",
  headless: process.env.HEADLESS ? process.env.HEADLESS === "true" : true
};
