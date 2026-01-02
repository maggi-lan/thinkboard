
import express from "express";
import { getAllNotes, createNote, updateNote, deleteNote, getNoteById } from "../controller/notesController.js";

// Create a router instance to define and group related routes
const router = express.Router();

// CRUD routes
router.get("/", getAllNotes);
router.post("/", createNote);
router.put("/:id", updateNote);
router.delete("/:id", deleteNote);
router.get("/:id", getNoteById);

// Export the Router object
export default router;
