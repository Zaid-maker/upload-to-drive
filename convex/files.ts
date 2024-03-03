import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { fileTypes } from "./schema";

export const createFile = mutation({
    args: {
        name: v.string(),
        fileId: v.id("_storage"),
        orgId: v.string(),
        type: fileTypes,
    },
    async handler(ctx, args) {
        await ctx.db.insert("files", {
            name: args.name,
            fileId: args.fileId,
            orgId: args.orgId,
            type: args.type,
        })
    },
});

export const getFile = query({
    args: {

    },
    handler: async (ctx) => {
        return await ctx.db.query("files").collect()
    },
});