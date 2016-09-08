import findChromecasts from '../../services/find_chromecasts';

export default class CastList {
  get(req, res) {
    findChromecasts(2000).then((casts) => {
      res.json(casts);
    });
  }
}
