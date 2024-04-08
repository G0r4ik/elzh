import { DataTypes, Sequelize } from 'sequelize'

export const password = 'sdfsdfsfsw45w45w2345we'
export const sequelize = new Sequelize(
  `postgres://postgres.rmmumdueplgzxsrhmddi:${password}@aws-0-eu-central-1.pooler.supabase.com:5432/postgres`,
  { logging: false }
)

const Course = sequelize.define(
  'Course',
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    name: { type: DataTypes.STRING },
    description: { type: DataTypes.TEXT },
  },
  { timestamps: false }
)

const User = sequelize.define(
  'User',
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    firstName: { type: DataTypes.TEXT },
    lastName: { type: DataTypes.TEXT },
    patronymic: { type: DataTypes.TEXT },
    passport: { type: DataTypes.TEXT },
    studentTicket: { type: DataTypes.TEXT },
    phone: { type: DataTypes.TEXT },
    dob: { type: DataTypes.DATE },
    email: { type: DataTypes.TEXT, unique: true },
    password: { type: DataTypes.TEXT },
    role: { type: DataTypes.STRING },
    idCourse: {
      type: DataTypes.INTEGER,
      references: { model: Course, key: 'id' },
    },
  },
  { timestamps: false }
)

const Teacher = sequelize.define(
  'Teacher',
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    firstName: { type: DataTypes.TEXT },
    lastName: { type: DataTypes.TEXT },
    patronymic: { type: DataTypes.TEXT },
    passport: { type: DataTypes.TEXT },
    phone: { type: DataTypes.TEXT },
    dob: { type: DataTypes.DATE },
    email: { type: DataTypes.TEXT, unique: true },
    password: { type: DataTypes.TEXT },
    role: { type: DataTypes.STRING },
  },
  { timestamps: false }
)

const Lesson = sequelize.define(
  'Lesson',
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    name: { type: DataTypes.TEXT },
    idTeacher: {
      type: DataTypes.INTEGER,
      references: { model: Teacher, key: 'id' },
    },
  },
  { timestamps: false }
)

const Trimester = sequelize.define(
  'Trimester',
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    dateStart: { type: DataTypes.DATE },
    dateEnd: { type: DataTypes.DATE },
    desc: { type: DataTypes.TEXT },
  },
  { timestamps: false }
)

const Mark = sequelize.define(
  'Mark',
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    idUser: { type: DataTypes.INTEGER, references: { model: User, key: 'id' } },
    idLesson: {
      type: DataTypes.INTEGER,
      references: { model: Lesson, key: 'id' },
    },
    idTrimester: {
      type: DataTypes.INTEGER,
      references: { model: Trimester, key: 'id' },
    },
    mark: { type: DataTypes.TEXT },
    date: { type: DataTypes.TEXT },
  },
  { timestamps: false }
)

const CourseLesson = sequelize.define(
  'CourseLesson',
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    idTrimester: {
      type: DataTypes.INTEGER,
      references: { model: Trimester, key: 'id' },
    },
    idCourse: {
      type: DataTypes.INTEGER,
      references: { model: Course, key: 'id' },
    },
    idLesson: {
      type: DataTypes.INTEGER,
      references: { model: Lesson, key: 'id' },
    },
  },
  { timestamps: false }
)

// Не используется
const Schedule = sequelize.define(
  'Schedule',
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    weekday: { type: DataTypes.STRING },
    idCourse: {
      type: DataTypes.INTEGER,
      references: { model: Course, key: 'id' },
    },
    idTrimester: {
      type: DataTypes.INTEGER,
      references: { model: Trimester, key: 'id' },
    },
    idLesson: {
      type: DataTypes.INTEGER,
      references: { model: Lesson, key: 'id' },
    },
    idTeacher: {
      type: DataTypes.INTEGER,
      references: { model: Teacher, key: 'id' },
    },
    classroom: { type: DataTypes.STRING },
    time: { type: DataTypes.STRING },
  },
  { timestamps: false }
)

CourseLesson.belongsTo(Lesson, { foreignKey: 'id' })
CourseLesson.belongsTo(Course, { foreignKey: 'id' })
CourseLesson.belongsTo(Trimester, { foreignKey: 'id' })

Mark.belongsTo(User, { foreignKey: 'id' })
Mark.belongsTo(Lesson, { foreignKey: 'id' })
Mark.belongsTo(Trimester, { foreignKey: 'id' })
Mark.belongsTo(CourseLesson, { foreignKey: 'id' })

Lesson.belongsTo(User, { foreignKey: 'id' })
Lesson.belongsTo(CourseLesson, { foreignKey: 'id' })
Lesson.belongsTo(Trimester, { foreignKey: 'id' })

export const models = {
  Course,
  User,
  Teacher,
  Lesson,
  Trimester,
  Mark,
  CourseLesson,
  Schedule,
}

// sequelize.sync({ alter: true })
