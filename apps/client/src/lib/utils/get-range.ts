export const getScoreRange = (score: number, total: number) => {
  const percentage = (score / total) * 100;

  if (percentage >= 75) {
    return "75% - 100%";
  } else if (percentage >= 50) {
    return "50% - 75%";
  } else if (percentage >= 25) {
    return "25% - 50%";
  } else {
    return "0% - 25%";
  }
};
