import { connect } from "mongoose";

export async function dbConnect() {
    await connect(process.env.MONGO_URI || '').catch((err) => { console.error('[INFO] Database connection error!'); console.error(err); });
};