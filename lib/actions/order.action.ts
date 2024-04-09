"use server";

import Order from "../models/order.model";
import { connect } from "@/lib/db";

export async function createOrder(order: any) {
  try {
    await connect();
    const newOrder = await Order.create(order);
    return JSON.parse(JSON.stringify(newOrder));
  } catch (error) {
    console.log(error);
  }
}
