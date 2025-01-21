import GoogleProvider from "next-auth/providers/google";
import { createHash } from "crypto";

interface RateLimiter {
  timestamps: Date[];
}
const userRateLimits = new Map<string, RateLimiter>();

// Hash user email to avoid storing sensitive data in memory
const hashEmail = (email: string): string => {
  return createHash("sha256").update(email).digest("hex");
};

export const rateLimit = (
  userId: string,
  rateLimitCount: number,
  rateLimitInterval: number
): boolean => {
  const now = new Date();
  const hashedUserId = hashEmail(userId); // Use hashed value as userId

  const userLimiter = userRateLimits.get(hashedUserId) ?? { timestamps: [] };

  userLimiter.timestamps = userLimiter.timestamps.filter(
    (timestamp) => now.getTime() - timestamp.getTime() < rateLimitInterval
  );

  if (userLimiter.timestamps.length >= rateLimitCount) {
    return false; // Rate limit exceeded
  }

  userLimiter.timestamps.push(now);
  userRateLimits.set(hashedUserId, userLimiter);
  return true;
};

export const auth: any = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  pages: {
    signIn: "/auth", // Custom sign-in page
  },
  callbacks: {
    // Sign in callback to enforce rate limiting
    async signIn({ user }: any) {
      const userId = user.email || ""; // Using email as the unique identifier

      const isAllowed = rateLimit(userId, 5, 60 * 1000); // 5 attempts per minute
      if (!isAllowed) {
        console.log(`Rate limit exceeded for user: ${userId}`);
        return false; // Deny login if rate limit exceeded
      }

      return true; // Allow login
    },

    // Session callback to map token to session
    async session({ session, token }: any) {
      session.user = {
        name: token.name || null,
        email: token.email || null,
        image: token.picture || null,
      };
      return session;
    },

    // JWT callback to include user details in the token
    async jwt({ token, account, profile }: any) {
      if (account && profile) {
        token.name = profile.name;
        token.email = profile.email;
        token.picture = profile.picture;
      }
      return token;
    },
  },
  session: {
    strategy: "jwt", // Using JWT strategy for stateless sessions
  },
  secret: process.env.AUTH_SECRET,
};
