import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export const fileTypes = v.union(
    v.literal("image"),
    v.literal("csv"),
    v.literal("pdf")
);

export const roles = v.union(v.literal('admin'), v.literal("member"))

export default defineSchema({
    files: defineTable({
        name: v.string(),
        type: fileTypes,
        orgId: v.string(),
        fileId: v.id("_storage"),
        // userId: v.id("users"),
        shouldDelete: v.optional(v.boolean())
    })
        .index("by_orgId", ["orgId"])
        .index("by_shouldDelete", ["shouldDelete"]),
    users: defineTable({
        tokenIdentifier: v.string(),
        name: v.optional(v.string()),
        image: v.optional(v.string()),
        orgIds: v.array(
            v.object({
                orgId: v.string(),
                role: roles,
            })
        ),
    }).index("by_tokenIdentifier", ["tokenIdentifier"]),
})