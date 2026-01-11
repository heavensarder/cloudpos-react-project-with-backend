import { Request, Response } from 'express';
import SeoSetting from '../models/SeoSetting';

export const getSeoByPage = async (req: Request, res: Response) => {
  const { page } = req.params;
  try {
    const seo = await SeoSetting.findOne({ where: { page } });
    if (seo) {
      res.json(seo);
    } else {
      // Return default or empty if not found, don't 404 to avoid breaking frontend
      res.json({
         title: 'Default Title',
         description: 'Default Description'
      });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const getAllSeo = async (req: Request, res: Response) => {
  try {
    const seos = await SeoSetting.findAll();
    res.json(seos);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const updateSeo = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { title, description, keywords, image } = req.body;

  try {
    const seo = await SeoSetting.findByPk(id);

    if (seo) {
      seo.title = title || seo.title;
      seo.description = description || seo.description;
      seo.keywords = keywords || seo.keywords;
      seo.image = image || seo.image;
      
      await seo.save();
      res.json(seo);
    } else {
      res.status(404).json({ message: 'SEO Setting not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};
