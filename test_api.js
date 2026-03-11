
const axios = require('axios');

async function testApi() {
    try {
        const res = await axios.get('http://localhost:5000/api/products');
        console.log('Status:', res.status);
        console.log('Count:', res.data.count);
        console.log('Products:', JSON.stringify(res.data.products, null, 2));
    } catch (err) {
        console.error('Error:', err.message);
        if (err.response) {
            console.error('Response Data:', err.response.data);
        }
    }
}

testApi();
