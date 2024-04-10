"use server";

import User from "../models/user.model";
import { connect } from "@/lib/db";
import { auth } from "@clerk/nextjs";
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

export async function addOrderToUser(order: any) {
  const { userId } = auth();
  const filter = { clerkId: userId };
  try {
    await connect();
    const doc = await User.findOne(filter);
    doc.orders.push(order);
    doc.active = true;
    await doc.save();

    return JSON.parse(JSON.stringify(doc));
  } catch (error) {
    console.log(error);
  }
}
