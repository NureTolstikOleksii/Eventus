import searchService from './search.service';

export async function searchServicesController(req, res) {
  try {
    const { keyword } = req.query; // отримуємо ключове слово з запиту
    if (!keyword) {
      return res.status(400).json({ message: 'Please provide a keyword for search' });
    }
    const services = await searchService.searchServices(req.db, keyword);
    res.status(200).json(services);
  } catch (error) {
    res.status(500).json({ message: 'Error searching services' });
  }
}