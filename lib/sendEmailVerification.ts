import { auth } from "@/app/firebase";
import {
  sendEmailVerification as firebaseSendEmailVerification,
  User,
} from "firebase/auth";

/**
 * Sends a verification email to the currently logged-in user.
 * @param user Optional: pass the Firebase user object
 */
export const sendEmailVerification = async (user?: User) => {
  try {
    const currentUser = user || auth.currentUser;
    if (!currentUser) throw new Error("No authenticated user found");

    await firebaseSendEmailVerification(currentUser);
    return { success: true, message: "Verification email sent!" };
  } catch (error: any) {
    return { success: false, message: error.message };
  }
};

