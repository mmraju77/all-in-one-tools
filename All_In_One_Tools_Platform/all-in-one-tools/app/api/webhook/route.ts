import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const eventType = body.event_type;

    if (eventType === "transaction.completed" || eventType === "subscription.created") {
      
      const userEmail = body.data?.customer?.email || body.data?.customer_email;

      if (userEmail) {
        const { error } = await supabase
          .from("User")
          .update({ 
            isPro: true,
            updatedAt: new Date().toISOString()
          })
          .eq("email", userEmail);

        if (error) {
          console.error("Supabase Update Error:", error);
        } else {
          console.log("User successfully upgraded to Pro:", userEmail);
        }
      }
    }

    return NextResponse.json({ message: "Webhook Success" }, { status: 200 });

  } catch (error) {
    console.error("Webhook Error:", error);
    return NextResponse.json({ message: "Server Error" }, { status: 500 });
  }
}