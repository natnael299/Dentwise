"use server";
import { currentUser } from "@clerk/nextjs/server";
import { prisma } from "../prisma";

export async function syncUser() {
  try {
    const user = await currentUser();
    if (!user) {
      console.log("[syncUser] skipped: no authenticated Clerk user");
      return null;
    }

    const email = user.emailAddresses[0]?.emailAddress;
    if (!email) {
      console.log(`[syncUser] skipped: missing email for clerkId=${user.id}`);
      return null;
    }

    const dbUser = await prisma.user.upsert({
      where: { clerkId: user.id },
      update: {
        email,
        phone: user.phoneNumbers[0]?.phoneNumber ?? null,
      },
      create: {
        clerkId: user.id,
        email,
        phone: user.phoneNumbers[0]?.phoneNumber ?? null,
      },
    });

    console.log(`[syncUser] success: userId=${dbUser.id} clerkId=${dbUser.clerkId}`);
    return dbUser;
  } catch (error) {
    console.error("[syncUser] failed:", error);
    throw error;
  }
}