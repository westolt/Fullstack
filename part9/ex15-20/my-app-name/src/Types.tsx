export interface CoursePartBase {
    name: string;
    exerciseCount: number;
  }

export interface CoursePartBaseProMax extends CoursePartBase {
description: string;
}

export interface CoursePartBasic extends CoursePartBaseProMax {
kind: "basic"
}

export interface CoursePartGroup extends CoursePartBase {
groupProjectCount: number;
kind: "group"
}

export interface CoursePartBackground extends CoursePartBaseProMax {
backgroundMaterial: string;
kind: "background"
}

export interface CoursePartSpecial extends CoursePartBaseProMax {
  requirements: string[];
  kind: "special"
}

export type CoursePart = CoursePartBasic | CoursePartGroup | CoursePartBackground | CoursePartSpecial;