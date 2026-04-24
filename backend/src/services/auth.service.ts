import { prisma } from "../lib/prisma.js";
import { authTokens } from "../utils/authTokens.js";
import { tokenUtility } from "../utils/tokenUtility.js";
import { passwordUtility } from "../utils/passwordUtility.js";
import { DEFAULT_RT_EXP } from "../types/tokens.types.js";

const tokenUtil = new tokenUtility();
const authUtil = new authTokens();
const passUtil = new passwordUtility();

interface signUpCreds {
  email: string;
  password: string;
  name?: string;
}

export async function signUp(params: signUpCreds) {
  // 1. Hash the password (MISSING IN YOUR ORIGINAL CODE)
  const hashedPassword = await passUtil.hashPassword(params.password);

  // 2. Create user in DB
  const user = await prisma.user.create({
    data: {
      ...params,
      password: hashedPassword,
    },
    select: { id: true, email: true, name: true }, // Better than omit
  });

  // 3. Generate Tokens
  const accessToken = authUtil.getAccessToken(user.id, user.email);
  const refreshToken = tokenUtil.generateToken(); 
  const hashedRefreshToken = tokenUtil.hashToken(refreshToken); 

  // 4. Store Session in DB
  await prisma.session.create({
    data: {
      userId: user.id,
      hashedToken: hashedRefreshToken,
      expiresAt: new Date(DEFAULT_RT_EXP), // 7 days
    },
  });

  return {
    user,
    accessToken,
    refreshToken
  };
}

export async function login(params: signUpCreds) {
  try {
    const { email, password } = params;

    const user = await prisma.user.findUnique({
      where: { email },
    });

 
    if (!user) throw new Error("Invalid email or password");


    const isMatch = await passUtil.verifyPassword(password, user.password);
    if (!isMatch) throw new Error("Invalid email or password");

    const accessToken = authUtil.getAccessToken(user.id, user.email);
    const refreshToken = tokenUtil.generateToken();
    const hashedRefreshToken = tokenUtil.hashToken(refreshToken);
 
    await prisma.session.create({
      data: {
        userId: user.id,
        hashedToken: hashedRefreshToken,
        expiresAt: new Date(DEFAULT_RT_EXP), 
      },
    });

    const { password: _, ...userWithoutPassword } = user;

    return {
      user: userWithoutPassword,
      accessToken,
      refreshToken,
    };
  } catch (error) {
    // Re-throw so the Controller can catch it and send a 401
    throw error; 
  }
}

/**
 * Logout: Deletes the specific session the user is currently using.
 */
export async function logout(refreshToken: string) {
  const hashedToken = tokenUtil.hashToken(refreshToken);
  
  await prisma.session.deleteMany({
    where: {
      hashedToken: hashedToken,
    },
  });
}

/**
 * LogoutAll: Deletes ALL sessions for a specific user (Security Nuclear Option).
 */
export async function logoutAll(userId: string) {
  await prisma.session.deleteMany({
    where: {
      userId: userId,
    },
  });
}

export async function refreshSession(refreshToken: string) {
  const hashedToken = tokenUtil.hashToken(refreshToken);


  const session = await prisma.session.findUnique({
    where: { hashedToken },
    include: { user: true },
  });


  if (!session || session.expiresAt < new Date()) {
    if (session) await prisma.session.delete({ where: { id: session.id } });
    throw new Error("Session expired or invalid");
  }

  const newAccessToken = authUtil.getAccessToken(session.user.id, session.user.email);
  const newRefreshToken = tokenUtil.generateToken();
  const newHashedToken = tokenUtil.hashToken(newRefreshToken);


  await prisma.session.update({
    where: { id: session.id },
    data: {
      hashedToken: newHashedToken,
      expiresAt: new Date(DEFAULT_RT_EXP), // Reset 7-day clock
    },
  });
const { user , ...sessionWithoutUser  } = session; 
const {password, ...userWithoutPassword} = user;
  return {
    accessToken: newAccessToken,
    refreshToken: newRefreshToken,
    user: userWithoutPassword
  };
}