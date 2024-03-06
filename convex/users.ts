import { ConvexError, v } from "convex/values";
import { QueryCtx, MutationCtx, query, internalMutation } from "./_generated/server";
import { roles } from "./schema";

export async function getUser(
    ctx: QueryCtx | MutationCtx,
    tokenIdentifier: string
) {
    const user = await ctx.db
        .query("users")
        .withIndex("by_tokenIdentifier", (q) =>
            q.eq("tokenIdentifier", tokenIdentifier)
        )
        .first();

    if (!user) {
        throw new ConvexError("Expected user to be Defined")
    }

    return user
}

export const createUser = internalMutation({
    args: {
        tokenIdentifier: v.string(),
        name: v.string(),
        image: v.string()
    },
    async handler(ctx, args) {

    }
})

export const updateUser = internalMutation({
    args: {
        tokenIdentifier: v.string(),
        name: v.string(),
        image: v.string()
    },
    async handler(ctx, args) {

    }
})

export const addOrgIdToUser = internalMutation({
    args: {
        tokenIdentifier: v.string(),
        orgId: v.string(),
        role: roles
    },
    async handler(ctx, args) {

    }
})

export const updateRoleInOrgForUser = internalMutation({
    args: {
        tokenIdentifier: v.string(),
        orgId: v.string(),
        role: roles
    },
    async handler(ctx, args) {

    }
})

export const getUserProfile = query({
    args: { userId: v.id("users") },
    async handler(ctx, args) {
        const user = await ctx.db.get(args.userId);

        return {
            name: user?.name,
            image: user?.image,
        };
    },
});
