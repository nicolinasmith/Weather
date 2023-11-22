const baseUrl = 'http://api.weatherapi.com/v1';
const apiKey = '38682be1c057499f9b5180152232211';

async function getWeather(city) {
  const cityUrl = `${baseUrl}/current.json?key=${apiKey}&q=${city}`;
  try {
    const response = await fetch(cityUrl);

    if (!response.ok) {
      throw new Error(`Something went wrong. Error status: ${response.status}`);
    }
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
}

export default getWeather;