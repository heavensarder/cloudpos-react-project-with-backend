import express from 'express';
import { 
  getCategories, createCategory, updateCategory, deleteCategory,
  getPosts, getAllPostsAdmin, getPostBySlug, getPostById,
  createPost, updatePost, deletePost 
} from '../controllers/blogController';
import { protect } from '../middleware/authMiddleware';

const router = express.Router();

// Public
router.get('/categories', getCategories);
router.get('/posts', getPosts);
router.get('/posts/:slug', getPostBySlug);

// Admin
router.post('/categories', protect, createCategory);
router.put('/categories/:id', protect, updateCategory);
router.delete('/categories/:id', protect, deleteCategory);

router.get('/admin/posts', protect, getAllPostsAdmin);
router.get('/admin/posts/:id', protect, getPostById); // For editing
router.post('/posts', protect, createPost);
router.put('/posts/:id', protect, updatePost);
router.delete('/posts/:id', protect, deletePost);

export default router;
