// Function to calculate the age
// (parameter format: "YYYY-MM-DD").
const calculateAge = dateStr => {
  const birthDate = new Date(dateStr);
  const nowDate = Date.now();
  const ageDate = new Date(nowDate - birthDate);
  const age = Math.abs(ageDate.getUTCFullYear() - 1970);
  return age;
};

export default calculateAge;
