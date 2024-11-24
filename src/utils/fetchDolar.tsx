const API_URL = 'https://dolarapi.com/v1/dolares'


const fetchRate = async () => {
    try {
        const response = await fetch(API_URL + '/blue');
        if (!response.ok) {
            throw new Error('Error al obtener la tasa de cambio')
        }
        const data = await response.json();
        return data.venta;
    } catch (err) {
        console.log(err);
    }
}

export default fetchRate;