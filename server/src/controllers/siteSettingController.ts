import { Request, Response } from 'express';
import SiteSetting from '../models/SiteSetting';

const DEFAULT_SETTINGS = {
  navbarLogoLight: "https://i.postimg.cc/x1qQLtQr/mediasoft-logo-v4.png",
  navbarLogoDark: "https://i.postimg.cc/QdSBd6bG/mediasoft_logo_v1.png",
  footerLogo: "https://i.postimg.cc/x1qQLtQr/mediasoft-logo-v4.png", // Assuming same as light for now
  favicon: "/favicon.svg" // Serving from public folder initially
};

export const getSettings = async (req: Request, res: Response): Promise<void> => {
  try {
    let settings = await SiteSetting.findOne();
    if (!settings) {
      settings = await SiteSetting.create(DEFAULT_SETTINGS);
    }
    res.json(settings);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching site settings', error });
  }
};

export const updateSettings = async (req: Request, res: Response): Promise<void> => {
  try {
    const { navbarLogoLight, navbarLogoDark, footerLogo, favicon } = req.body;
    
    let settings = await SiteSetting.findOne();
    if (!settings) {
      settings = await SiteSetting.create(DEFAULT_SETTINGS);
    }

    settings.navbarLogoLight = navbarLogoLight || settings.navbarLogoLight;
    settings.navbarLogoDark = navbarLogoDark || settings.navbarLogoDark;
    settings.footerLogo = footerLogo || settings.footerLogo;
    settings.favicon = favicon || settings.favicon;

    await settings.save();
    res.json(settings);
  } catch (error) {
    res.status(500).json({ message: 'Error updating site settings', error });
  }
};

export const seedSettings = async () => {
    try {
        const count = await SiteSetting.count();
        if (count === 0) {
            await SiteSetting.create(DEFAULT_SETTINGS);
            console.log('Site Settings seeded successfully');
        }
    } catch (error) {
        console.error('Error seeding site settings:', error);
    }
};
