import { users } from "../drizzle/schema";
import { Database } from "../common";
import { InferInsertModel, InferSelectModel, eq } from "drizzle-orm";

export class UsersService {
  constructor(private readonly db: Database) {}

  async getAllUsers() {
    return this.db.select().from(users);
  }

  async getUserById(id: string) {
    const [movie] = await this.db.select().from(users).where(eq(users.id, id));

    if (!movie) {
      return null;
    }

    return movie;
  }

  async deleteUserById(id: string) {
    return this.db.delete(users).where(eq(users.id, id));
  }

  async createUser(
    user: InferInsertModel<typeof users>
  ): Promise<InferSelectModel<typeof users>> {
    const [newMovie] = await this.db.insert(users).values(user).returning();
    return newMovie;
  }

  async updateUser(
    id: string,
    updateData: {
      email: string;
      firstName: string;
      lastName: string;
    }
  ) {
    const [user] = await this.db
      .update(users)
      .set(updateData)
      .where(eq(users.id, id))
      .returning();

    if (!user) {
      return null;
    }

    return user;
  }
}
