import Spot from '../models/Spot';

class DashboardController {
  async show(req, res) {
    const { user_id } = req.headers;

    const spot = await Spot.find({ user: user_id });

    return res.json(spot);
  }
}

export default new DashboardController();
