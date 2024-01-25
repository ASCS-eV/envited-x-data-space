import { isNil } from "ramda"
import { getServerSession } from "../auth"
import { badRequestError, internalServerErrorError, unauthorizedError } from "../utils"
import { Database } from "../database/types"
import { isOwnUser, userIsIssuedByLoggedInUser } from "../../app/api/utils"
import { db } from "../database/queries"
import { User } from "../types"

export const _getUserById = (db: Database) => async (id: string): Promise<User> => {
  try {
    const session = await getServerSession()

    if (isNil(session)) {
      throw unauthorizedError()
    }

    const connection = await db()
    const [user] = await connection.getUserById(id)

    if (!userIsIssuedByLoggedInUser(user)(session) && !isOwnUser(user)(session)) {
      throw badRequestError()
    }

    return user
  } catch (error) {
    console.log('error', error)
    throw internalServerErrorError()
  }
}

export const getUserById = _getUserById(db)
