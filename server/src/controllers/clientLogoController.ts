import { Request, Response } from 'express';
import { ClientLogo } from '../models/ClientLogo';

// Initial logos to seed
const initialLogos = [
  "https://i.postimg.cc/QtZ377hm/adlib_logo.png",
  "https://i.postimg.cc/C1pg88SH/big_bazar.png",
  "https://i.postimg.cc/V6P8ttmD/kids_paradise.png",
  "https://i.postimg.cc/NMvcXXBN/krishibid_bazar.png",
  "https://i.postimg.cc/PxnjDDTF/kulshi_mart.png",
  "https://i.postimg.cc/63xXZZtS/lend.png",
  "https://i.postimg.cc/XJ6b554m/longla.png",
  "https://i.postimg.cc/QtZ377j3/m_bazar.png",
  "https://i.postimg.cc/C1pg88wp/marie_stops_logo.png",
  "https://i.postimg.cc/Kz7yDY8s/paysa_bazar.png",
  "https://i.postimg.cc/3RjHFwxc/purple.png",
  "https://i.postimg.cc/63VNfQpS/richman.png",
  "https://i.postimg.cc/B65GBvnk/sator_logoi.png",
  "https://i.postimg.cc/k4Ndv55r/step_logo.png",
  "https://i.postimg.cc/mD3GyrrG/the_basket.png"
];

export const seedClientLogos = async () => {
  try {
    const count = await ClientLogo.count();
    if (count === 0) {
      console.log('Seeding client logos...');
      const logos = initialLogos.map(url => ({
        name: 'Client Logo',
        imageUrl: url
      }));
      await ClientLogo.bulkCreate(logos);
      console.log('Client logos seeded successfully.');
    }
  } catch (error) {
    console.error('Error seeding client logos:', error);
  }
};

export const getLogos = async (req: Request, res: Response): Promise<void> => {
  try {
    const logos = await ClientLogo.findAll({
      order: [['createdAt', 'DESC']]
    });
    res.status(200).json(logos);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching client logos', error });
  }
};

export const addLogo = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, imageUrl } = req.body;
    
    if (!imageUrl) {
      res.status(400).json({ message: 'Image URL is required' });
      return;
    }

    const newLogo = await ClientLogo.create({
      name: name || 'Client Logo',
      imageUrl
    });

    res.status(201).json(newLogo);
  } catch (error) {
    res.status(500).json({ message: 'Error adding client logo', error });
  }
};

export const deleteLogo = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const logo = await ClientLogo.findByPk(id);

    if (!logo) {
      res.status(404).json({ message: 'Logo not found' });
      return;
    }

    await logo.destroy();
    res.status(200).json({ message: 'Logo deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting client logo', error });
  }
};
