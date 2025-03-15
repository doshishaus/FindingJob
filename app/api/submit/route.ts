import { NextResponse } from "next/server";
import { db } from "..//firebase"; // 修正: firebaseの適切なimport
import { collection, addDoc } from "firebase/firestore";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  try {
    console.log("リクエストボディ:", req.body);
    const data = await req.json();

    // Firestoreにデータ追加
    const docRef = await addDoc(collection(db, "surveys"), data);

    // Nodemailer の設定
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });
    console.log("Email User:", process.env.EMAIL_USER);
    console.log("送信先メールアドレス:", data.contact);

    // メール送信
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_TO,
      subject: "アンケート送信完了",
      text: `以下の内容が送信されました。\n\n${JSON.stringify(data, null, 2)}`,
    });

    return NextResponse.json(
      { message: "送信成功", id: docRef.id },
      { status: 200 }
    );
  } catch (error) {
    console.error("エラー:", error);
    return NextResponse.json(
      { message: "エラー", error: (error as Error).message },
      { status: 500 }
    );
  }
}
