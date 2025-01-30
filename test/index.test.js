import { describe, it } from "node:test";
import { strict as assert } from 'node:assert';
import axios from "axios";

const BACKEND_URL = "http://localhost:3000/api/v1"; // Add http:// to make it a valid URL
const PAGE_ID = "1802a4380ff8802a8e39e0f125b7a152";

describe("HTTP ENDPOINTS", () => {
    it("should get the blogs", async () => {
        try {
            const response = await axios.get(`${BACKEND_URL}/blogs`);
            assert.strictEqual(response.status, 200);
        } catch (error) {
            assert.fail(`Request failed with error: ${error.message}`);
        }
    });

    it("should get a specific blog page", async () => {
        try {
            const response = await axios.get(`${BACKEND_URL}/blogs/${PAGE_ID}`);
            assert.strictEqual(response.status, 200);
        } catch (error) {
            assert.fail(`Request failed with error: ${error.message}`);
        }
    });
});
