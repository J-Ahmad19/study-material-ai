import { pgTable, serial, boolean, integer, varchar,json, text } from "drizzle-orm/pg-core";

export const USER_TABLE = pgTable("users", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  age: integer("age"),
  email: varchar("email", { length: 255 }).notNull(),
  isMember: boolean("is_member").default(false),
  customerId:varchar()
});



// export const STUDY_MATERIAL_TABLE= pgTable('studyMaterial',{
// id:serial().primaryKey(),
// courseId:varchar().notNull(),
// courseType:varchar().notNull(),
// topic:varchar().notNull(),
// difficultyLevel: varchar().default('Easy'),
// courseLayout:json(),
// createdBy:varchar().notNull(),
// status: varchar().default('Generating')

// })


export const STUDY_MATERIAL= pgTable("studyMaterial", {
  id: serial("id").primaryKey(),
  courseId: varchar("courseId").notNull(),
  courseType: varchar("courseType").notNull(),
  topic: varchar("topic").notNull(),
  difficultyLevel: varchar("difficultyLevel").notNull(),
  courseLayout: json("courseLayout").notNull(),
  createdBy: varchar("createdBy").notNull(),
  status: varchar().default('Generating')
}); 


export const  CHAPTER_NOTES_TABLE= pgTable('chapterNotes',{

  id:serial().primaryKey(),
  courseId:varchar().notNull(),
  chapterId:integer().notNull(),
  notes:text()
})

export const STUDY_TYPE_CONTENT= pgTable('studyTypeContent',{

  id:serial().primaryKey(),
  courseId:varchar().notNull(),
  content:json(),
 type:varchar().notNull()
})

export const PAYMENT_RECORD= pgTable('paymentRecord',{

  id:serial().primaryKey(),
  customerId:varchar(),
 sessionId: varchar()
})