import _ from 'lodash';

import findChromecasts from '../../services/find_chromecasts';
import launchChromecast from '../../services/launch_chromecast';

const resultError = (res, error) => {
  res.status(500).send({ error });
};

export default class CastList {
  get(req, res) {
    const name = req.query.cast;
    if (!name) {
      resultError(res, 'No cast specified');
      return;
    }

    findChromecasts(2000).then((casts) => {
      const cast = _.find(casts, c => c.name === name);
      if (!cast) {
        resultError(res, `Unable to find cast named '${name}'`);
        return;
      }

      launchChromecast('http://chromecast.truefitqa.com:4200', cast).then(() => {
        res.json({ msg: 'Complete' });
      }).catch((err) => {
        resultError(res, err.message);
      });
    });
  }
}
