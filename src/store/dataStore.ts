import { defineStore } from 'pinia';
import { v4 as uuidv4 } from 'uuid';

export interface Class {
  lessonKey: number;
  lessonTitle: number;
  lessonProcess1: number;
  lessonProcess2: number;
}

export interface Seat {
  id: string;
  studentId?: string;
}

export interface Student {
  id: string;
  name: string;
  class?: {
    curr: Class & {
      behaviorContent: string
    },
    previous: Class,
  }
}

export interface RearrangeSeatPayload {
  currSeadId?: string;
  studentId?: string;
  targetSeatId: string;
}

export interface DragInfo {
  seatId: string;
  studentId: string;
}

export const useDataStore = defineStore({
  id: 'data',
  state: () => ({
    classroom: {
      row: 5,
      column: 5,
    } as {
      row: number;
      column: number;
    },
    students: [
      {
        id: '1',
        name: 'Jacky',
      },
      {
        id: '2',
        name: 'Mike',
      },
      {
        id: '3',
        name: 'Kerry',
      },
    ] as Student[],
    seats: [] as Seat[],
    dragInfo: {
      seatId: '',
      studentId: '',
    } as DragInfo,
  }),
  getters: {
    getSeats(): Seat[] {
      return this.seats;
    },
    getStudents(): Student[] {
      return this.students;
    },
    getStudentListNotInSeat(): Student[] {
      return this.students.filter(
        (student) => !this.seats.find((seat) => seat.studentId === student.id),
      );
    },
    getDragInfo(): DragInfo {
      return this.dragInfo;
    },
  },
  actions: {
    /**
     * Finds a student by their ID.
     *
     * @param id the ID of the student to find
     * @returns the student with the given ID, or undefined if no such student exists
     */
    getStudent(id: string): Student | undefined {
      return this.students.find((student) => student.id === id);
    },
    removeStudent(id: string) {
      this.students = this.students.filter((student) => student.id !== id);
    },
    /**
     * Finds a seat by its ID.
     *
     * @param id the ID of the seat to find
     * @returns the seat with the given ID, or undefined if no such seat exists
     */
    getSeat(id: string): Seat | undefined {
      return this.seats.find((seat) => seat.id === id);
    },
    /**
     * Adds a new student to the list of students.
     *
     * @param name the name of the new student
     */
    addStudent(name: string) {
      this.students.push({
        id: uuidv4(),
        name,
      });
    },
    rearrangeSeat(payload: RearrangeSeatPayload) {
      const targetSeat = this.getSeat(payload.targetSeatId);

      if (payload.currSeadId && targetSeat) {
        const currSeat = this.getSeat(payload.currSeadId);
        const tmp = targetSeat.studentId;

        targetSeat.studentId = currSeat?.studentId;

        currSeat!.studentId = tmp;

        return;
      }

      if (payload.studentId && targetSeat) {
        if (targetSeat?.studentId) {
          // 座位已經有人
          return;
        }

        targetSeat.studentId = payload.studentId;
      }
    },
    /**
     * Resets the seats to the given number of rows and columns.
     *
     * The student list will also be cleared of any seat IDs.
     *
     * @param row the number of rows to generate
     * @param colunm the number of columns to generate
     */
    initSeats() {
      this.seats = [];

      if (this.students.length !== 0) {
        this.students = this.students.map((student) => ({
          ...student,
          seatId: undefined,
        }));
      }

      const totalSeats = this.classroom.row * this.classroom.column;

      for (let i = 0; i < totalSeats; i += 1) {
        this.seats.push({
          id: uuidv4(),
        });
      }
    },
    resetDragInfo() {
      this.dragInfo.seatId = '';
      this.dragInfo.studentId = '';
    },
    classLayoutChange(payload: {
      row: number;
      col: number;
    }) {
      this.classroom.column = payload.col;
      this.classroom.row = payload.row;

      this.initSeats();
    },
    setDragInfo(payload: { seatId?: string; studentId?: string }) {
      const { seatId, studentId } = payload;

      if (seatId) {
        this.dragInfo.seatId = seatId;
      }

      if (studentId) {
        this.dragInfo.studentId = studentId;
      }
    },
  },
});
