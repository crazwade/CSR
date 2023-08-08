import { defineStore } from 'pinia';

export const useStudentStore = defineStore({
  id: 'student',
  state: () => ({
    students: [] as StudentInfo[],
  }),
  actions: {
    addStudent(name: string) {
      this.students.push({
        name,
        classRoom: undefined,
        lessonKey: undefined,
        lessonProcess: undefined,
        lessonTitle: undefined,
        lessonContent: undefined,
      });
    },
    getAll() {
      return this.students;
    },
    edit(data: {
      classRoom?: string;
      lessonKey?: string;
      lessonProcess?: string;
      lessonTitle?: string;
      lessonContent?: string;
    }, name: string) {
      const getStudent = this.students.find((item) => item.name === name);
      if (!getStudent) return -1;

      Object.assign(getStudent, data);
    },
    init() {
      this.students = [];
    },
  },
});

export interface StudentInfo {
  name: string;
  classRoom: string | undefined;
  lessonKey: string | undefined;
  lessonProcess: string | undefined;
  lessonTitle: string | undefined;
  lessonContent: string | undefined;
}
