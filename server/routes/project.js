import express from "express";
import {
  createProject,
  deleteUserProject,
  getUserProjects,
} from "../controllers/projectController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/create").post(protect, createProject); // Yeni proje oluştur
router.route("/all").get(protect, getUserProjects); // Kullanıcının tüm projelerini getir
router.route("/delete/:projectId").delete(protect, deleteUserProject); // Kullanıcının projesini sil

export default router;
