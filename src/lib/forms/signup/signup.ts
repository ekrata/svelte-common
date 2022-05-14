import type { RequestHandler } from '@sveltejs/kit';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';

/** @type {import('./[signup]').RequestHandler} */
export const post: RequestHandler = async ({ request }) => {
  const auth = getAuth();
  const { email, password } = Object.fromEntries([...(await request.formData())]);
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email.toString(),
      password.toString(),
    );
    const user = userCredential.user;
    return {
      status: 200,
      headers: {},
      body: JSON.stringify({
        user,
      }),
    };
  } catch (error) {
    const err = error as { code: number; message: string };
    const errorCode = err?.code;
    const errorMessage = err?.message;
    return {
      status: errorCode ?? 500,
      headers: {},
      body: JSON.stringify({
        error: errorMessage,
      }),
    };
  }
};
