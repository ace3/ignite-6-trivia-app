import { GeneralApiProblem } from "./api-problem"

export interface User {
  id: number
  name: string
}

export interface Question {
  id:string,
  category:string,
  type:string,
  difficulty:string,
  question:string,
  correctAnswer:string,
  incorrectAnswers:Array<string>
  guess:string
}

export type GetUsersResult = { kind: "ok"; users: User[] } | GeneralApiProblem
export type GetUserResult = { kind: "ok"; user: User } | GeneralApiProblem
export type GetQuestionsResult = {kind:"ok"; questions:Question[]} | GeneralApiProblem
