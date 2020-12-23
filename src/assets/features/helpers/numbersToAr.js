export const ARABICNUMBERS = ["۰", "١", "٢", "٣", "٤", "٥", "٦", "٧", "٨", "٩"];

export const convertToArabic = (number) => {
  return String(number)
    .split("")
    .map((char) => ARABICNUMBERS[Number(char)] || char)
    .join("");
};
