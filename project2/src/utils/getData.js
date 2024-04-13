// the 2 different proxies!
// const proxy = 'http://solace.ist.rit.edu/~dsbics/proxy/';
const proxy = 'https://people.rit.edu/~dsbics/proxy/'

const proxyServer = proxy + 'https://ischool.gccis.rit.edu/api/';

const getData = async (endpoint) => {
    const res = await fetch(`${proxyServer}${endpoint}`);

    return await res.json();
};

export default getData;