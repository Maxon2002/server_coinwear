let fs = require('fs')
let path = require('path')

let https = require('https')

let PORT = process.env.PORT || 433

let objectProduct = {
    'Binance All Time High': {firstPrice: '36.99$', discount: '13$'},
    'Bitcoin HODL': {firstPrice: '38.99$', discount: '15$'},
    'Bitcoin My Retirement Plan': {firstPrice: '34.99$', discount: '11$'},
    'Bitcoin On The Moon': {firstPrice: '36.99$', discount: '13$'},
    'Bitcoin Original': {firstPrice: '36.99$', discount: '13$'},
    'Bitcoin Periodic Table': {firstPrice: '35.99$', discount: '12$'},
    'Bitcoin Rainbow': {firstPrice: '39.99$', discount: '16$'},
    'Buy The Dip': {firstPrice: '33.99$', discount: '10$'},
    'Cardano Classic': {firstPrice: '35.99$', discount: '12$'},
    'Cardano Mountains': {firstPrice: '39.99$', discount: '16$'},
    'Dogecoin Astronaut': {firstPrice: '37.99$', discount: '14$'},
    'Dogecoin Proud Owner': {firstPrice: '36.99$', discount: '13$'},
    'Dogecoin To The Moon': {firstPrice: '37.99$', discount: '14$'},
    'Ethereum Base': {firstPrice: '36.99$', discount: '13$'},
    'Ethereum Flying': {firstPrice: '34.99$', discount: '11$'},
    'Ethereum HODL': {firstPrice: '38.99$', discount: '15$'},
    'Ethereum Revolution': {firstPrice: '37.99$', discount: '14$'},
    'Polkadot Heartbeat': {firstPrice: '33.99$', discount: '10$'},
    'Ripple Vintage': {firstPrice: '34.99$', discount: '11$'},
    'Shiba Army': {firstPrice: '35.99$', discount: '12$'},
}

setTimeout(()=> console.log('yes2'), 10000)

let options = {
  key: fs.readFileSync('key.pem', 'utf8'),
  cert: fs.readFileSync('cert.pem', 'utf8'),
    ca: fs.readFileSync('ca.pem', 'utf8')
};

let server = https.createServer(options, (req, res) => {
    console.log('req')
    if (req.method == 'POST') {
        let body = ''
        req.on('data', (chunk) => {
            body += chunk
        })
        req.on('end', () => {
            // console.log(req.headers)
            if (req.headers.origin == 'https://coinwear.net') {
                res.writeHead(200, {
                    'Access-Control-Allow-Origin': 'https://coinwear.net',
                    'Access-Control-Allow-Credentials': 'true',
                })


                fs.readdir(path.resolve(__dirname, 'images', body), (err, files) => {
                    let objRes = {
                        prices: objectProduct[body],
                        colors: files
                    }
                    res.end(JSON.stringify(objRes))
                })
            }
        })


    } else {


        req.on('end', () => {
            console.log('yep')
            console.log(req.headers)
            if (req.headers.origin == 'https://coinwear') {
                res.writeHead(200, {
                    'Access-Control-Allow-Origin': 'https://coinwear',
                    'Access-Control-Allow-Credentials': 'true',
                })
                if (body) res.end('Ваше имя')
                else res.end('гет запрос')
            }
        })
    }




})
server.listen(PORT, () => {
    setTimeout(()=> console.log(PORT), 10000)
})
// console.log(process.env.PORT)

