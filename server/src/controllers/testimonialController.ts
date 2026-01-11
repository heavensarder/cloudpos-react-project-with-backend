import { Request, Response } from 'express';
import { Testimonial } from '../models/Testimonial';

// Initial testimonials to seed
const initialTestimonials = [
  {
    text: "CloudPOS is one of the best software I have ever used in my life. Their vendors are so helpful. Whenever I need help, they just help me within 5 minutes. I'm so happy using their software.",
    author: "Sancred Welfare Foundation",
    designation: "Enterprise Client",
    logoUrl: "https://i.postimg.cc/jSSLFpVS/Sancred_Welfare_Foundation.png"
  },
  {
    text: "Always dedicated to customer.Whenever issues arises right away they reply and respond and solve the issues with dedication. Customer service is the first priority.",
    author: "Bright Point",
    designation: "Mobile Shop Client",
    logoUrl: "https://i.postimg.cc/85pp7W1t/bright_point.png"
  },
  {
    text: "Mediasoft  is a much better software system rather than others it’s my experience",
    author: "Inglot Baily Road",
    designation: "Cosmetics Shop Client",
    logoUrl: "https://i.postimg.cc/R0GGB5qF/inglot_bailyroad.png"
  },
  {
    text: "Last 5 years We use these system And we are Satisfy their Service. Please Keep going.",
    author: "Little Angels",
    designation: "Retail Client",
    logoUrl: "https://i.postimg.cc/N0yVpjpP/little_angel.png"
  }
];

export const seedTestimonials = async () => {
  try {
    const count = await Testimonial.count();
    if (count === 0) {
      console.log('Seeding testimonials...');
      await Testimonial.bulkCreate(initialTestimonials);
      console.log('Testimonials seeded successfully.');
    }
  } catch (error) {
    console.error('Error seeding testimonials:', error);
  }
};

export const getTestimonials = async (req: Request, res: Response): Promise<void> => {
  try {
    const testimonials = await Testimonial.findAll({
      order: [['createdAt', 'DESC']]
    });
    res.status(200).json(testimonials);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching testimonials', error });
  }
};

export const addTestimonial = async (req: Request, res: Response): Promise<void> => {
  try {
    const { text, author, designation, logoUrl } = req.body;
    
    if (!text || !author || !logoUrl) {
      res.status(400).json({ message: 'Text, Author, and Logo URL are required' });
      return;
    }

    const newTestimonial = await Testimonial.create({
      text,
      author,
      designation: designation || 'Client',
      logoUrl
    });

    res.status(201).json(newTestimonial);
  } catch (error) {
    res.status(500).json({ message: 'Error adding testimonial', error });
  }
};

export const updateTestimonial = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { text, author, designation, logoUrl } = req.body;
    
    const testimonial = await Testimonial.findByPk(id);

    if (!testimonial) {
      res.status(404).json({ message: 'Testimonial not found' });
      return;
    }

    testimonial.text = text || testimonial.text;
    testimonial.author = author || testimonial.author;
    testimonial.designation = designation || testimonial.designation;
    testimonial.logoUrl = logoUrl || testimonial.logoUrl;

    await testimonial.save();
    res.status(200).json(testimonial);
  } catch (error) {
    res.status(500).json({ message: 'Error updating testimonial', error });
  }
};

export const deleteTestimonial = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const testimonial = await Testimonial.findByPk(id);

    if (!testimonial) {
      res.status(404).json({ message: 'Testimonial not found' });
      return;
    }

    await testimonial.destroy();
    res.status(200).json({ message: 'Testimonial deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting testimonial', error });
  }
};
