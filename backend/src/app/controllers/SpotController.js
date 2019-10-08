import Spot from '../models/Spot';
import User from '../models/User';

class SpotController {
  async index(req, res) {
    const { tech } = req.query;

    const spots = await Spot.find({ techs: tech });

    if (!spots) {
      return res.status(400).json({ error: 'There is no spot for this techs' });
    }

    return res.json(spots);
  }

  async store(req, res) {
    const { filename } = req.file;
    const { company, price, techs } = req.body;
    const { user_id } = req.headers;

    const user = await User.findById(user_id);

    if (!user) {
      return res.status(400).json({ error: 'user does not exists' });
    }

    const spot = await Spot.create({
      thumbnail: filename,
      company,
      price,
      techs: techs.split(',').map(tech => tech.trim()),
      user: user_id,
    });

    return res.json(spot);
  }
}

export default new SpotController();
