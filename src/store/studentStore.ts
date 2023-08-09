import { defineStore } from 'pinia';

export const useStudentStore = defineStore({
  id: 'student',
  state: () => {
    return {
      students: [] as string[],
      seats: [] as classRoomSeat[][],
    };
  },
  actions: {
    createStudent(name: string) {
      this.students.push(name);
    },
    intoSeat(row: number, set: number, name: string) {
      if (this.seats[row][set].name !== '') {
        return false;
      }
      this.seats[row][set].name = name;
      return true;
    },
    moveSeat(
      oldSeat: { row: number, set: number },
      newSeat: { row: number, set: number },
    ) {
      const tmp = this.seats[newSeat.row][newSeat.set];
      this.seats[newSeat.row][newSeat.set] = this.seats[oldSeat.row][oldSeat.set];
      this.seats[oldSeat.row][oldSeat.set] = tmp;
    },
    remove(index: number) {
      this.students.splice(index, 1);
    },
    init() {
      this.students = [];

      const totalRows = 4;
      const seatsPerRow = 10;
      this.seats = Array.from({ length: totalRows }, () =>
        Array.from({ length: seatsPerRow }, () => ({
          name: '',
          classRoom: undefined,
          lessonKey: undefined,
          lessonProcess: undefined,
          lessonTitle: undefined,
          lessonContent: undefined,
        }))
      );
    },
  },
});

interface classRoomSeat {
  name: string;
  classRoom: string | undefined;
  lessonKey: string | undefined;
  lessonProcess: string | undefined;
  lessonTitle: string | undefined;
  lessonContent: string | undefined;
}