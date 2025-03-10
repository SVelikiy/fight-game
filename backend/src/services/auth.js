import { UsersCollection } from "../db/models/user.js";
import SessionCollection from "../db/models/session.js";
import createHttpError from "http-errors";
import bcrypt from "bcryptjs";
import { randomBytes } from "crypto";
import {
  accessTokenLifeTime,
  refreshTokenLifeTime,
} from "../constants/user.js";

const createSession = () => {
  const accessToken = randomBytes(30).toString("base64");
  const refreshToken = randomBytes(30).toString("base64");
  return {
    accessToken,
    refreshToken,
    accessTokenValidUntil: Date.now() + accessTokenLifeTime,
    refreshTokenValidUntil: Date.now() + refreshTokenLifeTime,
  };
};

export const register = async (payload) => {
  const { email, password } = payload;
  const user = await UsersCollection.findOne({ email });
  if (user) {
    throw createHttpError(409, "Email in use");
  }

  const hashPassword = await bcrypt.hash(password, 10);

  return UsersCollection.create({ ...payload, password: hashPassword });
};

export const login = async ({ email, password }) => {
  const user = await UsersCollection.findOne({ email });
  if (!user) {
    throw createHttpError(401, "Email or password invalid");
  }
  const comparePassword = await bcrypt.compare(password, user.password);

  if (!comparePassword) {
    throw createHttpError(401, "Email or password invalid");
  }
  await SessionCollection.deleteOne({ userId: user._id });

  const newSession = createSession();

  const createdSession = await SessionCollection.create({
    userId: user._id,
    ...newSession,
  });

  return {session : createdSession, user};
};

export const refreshUserSession = async ({ refreshToken }) => {
  const session = await SessionCollection.findOne({ refreshToken });
  if (!session) {
    throw createHttpError(401, "Session not found");
  }
  if (Date.now() > session.refreshTokenValidUntil) {
    throw createHttpError(401, "Session token expired");
  }
  await SessionCollection.deleteOne({ userId: session.userId });

  const newSession = createSession();

  return SessionCollection.create({
    userId: session.userId,
    ...newSession,
  });
};

export const logout = async (sessionId) => {
  await SessionCollection.deleteOne({ _id: sessionId });
};

export const findSession = async (filter) => SessionCollection.findOne(filter);

export const findUser = async (filter) => UsersCollection.findOne(filter);
