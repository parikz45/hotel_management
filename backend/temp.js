const bcrypt = require('bcrypt');

(async () => {
    const hash = await bcrypt.hash("pk@@1045", 10);
    console.log(hash);
})();