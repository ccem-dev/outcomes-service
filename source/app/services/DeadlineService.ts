export default class DeadlineService {

  static getDeadline = function (startDate: Date, time: number, windowBetween: number) {
    let finalDate = new Date(startDate);
    finalDate.setDate(finalDate.getDate() + time - windowBetween);
    let Milliseconds = (finalDate.getTime() - Date.now());
    let remainingDays: number = Milliseconds / 1000 / 60 / 60/ 24;
    return {
      startDate: startDate,
      finalDate: finalDate,
      remainingDays: Math.trunc(remainingDays)
    };
  }

};
