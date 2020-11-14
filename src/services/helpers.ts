import { ITodo } from "./../models/ITodo";
export const sortByName = (arr: any): any[] => {
  return arr.sort((a: any, b: any) => {
    if (a.name < b.name) {
      return -1;
    }
    if (a.name > b.name) {
      return 1;
    }
    return 0;
  });
};
export const sortByImportance = (arr: any): any[] => {
  let sArr: any = [[], [], []];
  arr.forEach((e: any) => {
    if (e.importance === "high") {
      sArr[0].push(e);
    } else if (e.importance === "medium") {
      sArr[1].push(e);
    } else {
      sArr[2].push(e);
    }
  });

  return sArr.flat();
};

export const sortByCompleted = (arr: any): any[] => {
  let sArr: any = [[], []];
  arr.forEach((e: any) => (e.completed ? sArr[1].push(e) : sArr[0].push(e)));
  return sArr.flat();
};

export const sortByDate = (arr: any, dateType: string): any[] => {
  return arr.sort((a: any, b: any) => {
    console.log(a[dateType]);
    if (new Date(a[dateType]) < new Date(b[dateType])) {
      return -1;
    }
    if (new Date(a[dateType]) > new Date(b[dateType])) {
      return 1;
    }
    return 0;
  });
};
