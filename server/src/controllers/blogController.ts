import { Request, Response } from 'express';
import BlogPost from '../models/BlogPost';
import BlogCategory from '../models/BlogCategory';
import User from '../models/User';

// --- Categories ---
export const getCategories = async (req: Request, res: Response): Promise<void> => {
  try {
    const categories = await BlogCategory.findAll();
    res.json(categories);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching categories' });
  }
};

export const createCategory = async (req: Request, res: Response): Promise<void> => {
  try {
    const category = await BlogCategory.create(req.body);
    res.status(201).json(category);
  } catch (error) {
    res.status(400).json({ message: 'Error creating category' });
  }
};

export const updateCategory = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    await BlogCategory.update(req.body, { where: { id } });
    const category = await BlogCategory.findByPk(id);
    res.json(category);
  } catch (error) {
    res.status(400).json({ message: 'Error updating category' });
  }
};

export const deleteCategory = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    await BlogCategory.destroy({ where: { id } });
    res.json({ message: 'Category deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting category' });
  }
};

// --- Posts ---
export const getPosts = async (req: Request, res: Response): Promise<void> => {
  try {
    const { category_id } = req.query;
    const where: any = {};
    if (category_id) where.category_id = category_id;
    where.status = 'published';

    const posts = await BlogPost.findAll({
      where,
      include: [
        { model: BlogCategory, as: 'category' },
        { model: User, as: 'author', attributes: ['id', 'email'] }
      ],
      order: [['createdAt', 'DESC']]
    });
    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching posts' });
  }
};

export const getAllPostsAdmin = async (req: Request, res: Response): Promise<void> => {
  try {
    const posts = await BlogPost.findAll({
      include: [
        { model: BlogCategory, as: 'category' },
        { model: User, as: 'author', attributes: ['id', 'email'] }
      ],
      order: [['createdAt', 'DESC']]
    });
    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching admin posts' });
  }
};

export const getPostBySlug = async (req: Request, res: Response): Promise<void> => {
  try {
    const { slug } = req.params;
    const post = await BlogPost.findOne({
      where: { slug },
      include: [
        { model: BlogCategory, as: 'category' },
        { model: User, as: 'author', attributes: ['id', 'email'] }
      ]
    });

    if (!post) {
      res.status(404).json({ message: 'Post not found' });
      return;
    }

    // Increment views
    post.views += 1;
    await post.save();

    res.json(post);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching post' });
  }
};

export const getPostById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const post = await BlogPost.findByPk(id, {
      include: [{ model: BlogCategory, as: 'category' }]
    });
    if (!post) {
      res.status(404).json({ message: 'Post not found' });
      return;
    }
    res.json(post);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching post' });
  }
};

export const createPost = async (req: Request, res: Response): Promise<void> => {
  try {
    const user = (req as any).user; 
    const post = await BlogPost.create({
      ...req.body,
      author_id: user.id
    });
    res.status(201).json(post);
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: 'Error creating post', error });
  }
};

export const updatePost = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    await BlogPost.update(req.body, { where: { id } });
    const post = await BlogPost.findByPk(id);
    res.json(post);
  } catch (error) {
    res.status(400).json({ message: 'Error updating post' });
  }
};

export const deletePost = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    await BlogPost.destroy({ where: { id } });
    res.json({ message: 'Post deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting post' });
  }
};
