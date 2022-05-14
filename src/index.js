// @create-index

import glob from 'glob';
import path from 'path';

glob.sync('./routes/**/*.js').forEach(function (file) {
	import file from(path.resolve(file));
});
