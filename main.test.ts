import { describe, expect, it } from "vitest"
import request from "supertest"
import express from "express"
import path from "path"
import { app } from "./main"

describe("POST /upload", () => {
  it("should give me the filename", async () => {
    const response = await request(app) // Use the app instance, not a URL
      .post("/upload")
      .attach("file", path.join(__dirname, "test-files", "me.png"))
      .expect(200)

    expect(response.body.filename).toBe("me.png")
  })
})

describe("GET /files", () => {
  it("should give me the list of files", async () => {
    const response = await request(app) // Use the app instance, not a URL
      .get("/files")
      .expect(200)
  })
})
