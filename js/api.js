const baseUrl = 'http://api.weatherapi.com/v1';
const apiKey = '38682be1c057499f9b5180152232211';
const username = 'weatherroar';

async function getWeather(city) {
  const cityUrl = `${baseUrl}/current.json?key=${apiKey}&q=${city}&lang=sv`;
  try {
    const response = await fetch(cityUrl);

    if (!response.ok) {
      throw new Error(`Something went wrong. Error status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
}

async function getCity (searchString) {

  const url = `http://api.geonames.org/searchJSON?name_startsWith=${searchString}&maxRows=5&country=SE&username=${username}`;
  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Something went wrong. Error status: ${response.status}`);
    }
    const data = await response.json();
    const uniqueCities = new Set();
    const cityObjects = data.geonames.map(city => ({
      name: city.name,
      adminName1: city.adminName1
    })).filter(city => {
      if (uniqueCities.has(city.name)) {
        return false;
      }
      if (city.adminName1 === '') {
        return false;
      }
      uniqueCities.add(city.name);
      return true;
    });
    
    return cityObjects;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
}

export { getWeather, getCity }; 