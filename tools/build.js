require('shelljs/global');

// clean
rm('-rf', 'lib/');

// move over the server
exec('babel -d lib/ src/index.js');
mv('lib/src/index.js', 'lib/index.js');
rm('-rf', 'lib/src/');

exec('babel -d lib/routes src/routes');

// copy package.json
cp('package.json', 'lib/package.json');

// move over the player
cd('./src/client');
exec('npm run build');

// done
echo('build complete');
