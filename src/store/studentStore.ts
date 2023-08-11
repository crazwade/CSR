import { defineStore } from 'pinia';
import type { ClassRoomSeat } from '../App.vue';

export const useStudentStore = defineStore({
  id: 'student',
  state: () => {
    return {
      students: [] as string[],
      seats: [] as ClassRoomSeat[][],
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
    saveSeatInfo (row: number, set: number, data: ClassRoomSeat) {
      this.seats[row][set] = {...data};
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
          lastLessonKey: null,
          lastLessonProcess1: null,
          lastLessonProcess2: null,
          lastLessonTitle: null,
          lessonKey: null,
          lessonProcess1: null,
          lessonProcess2: null,
          lessonTitle: null,
          lessonContent: null,
          behavior: null,
          behaviorContent: null,
        }))
      );
    },
  },
});
