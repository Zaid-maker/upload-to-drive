import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export const fileTypes = v.union(
    v.literal("image"),
    v.literal("csv"),
    v.literal("pdf")
);

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
        .index("by_shouldDelete", ["shouldDelete"])
})