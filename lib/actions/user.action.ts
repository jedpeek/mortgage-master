"use server";

import User from "../models/user.model";
import { connect } from "@/lib/db";

export async function createUser(user: any) {
  try {
    await connect();
    const newUser = await User.create(user);
    return JSON.parse(JSON.stringify(newUser));
  } catch (error) {
    console.log(error);
  }
}

export async function updateUser(userId: any, score: any) {
  const filter = { clerkId: userId };
  const update = { quiz_scores: score };
  try {
    await connect();
    const doc = await User.findOne(filter);
    doc.quiz_scores.push(score);
    await doc.save();

    return JSON.parse(JSON.stringify(doc));
  } catch (error) {
    console.log(error);
  }
}
