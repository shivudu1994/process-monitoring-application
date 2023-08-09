

const API_URL = 'http://localhost:5005/api'; 

export async function fetchMeasurements() {
  try {
    const response = await fetch(`${API_URL}/measurements`);
    if (!response.ok) {
      throw new Error('Failed to fetch measurements');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
}


export async function postMeasurement(data) {
  try {
    const response = await fetch(`${API_URL}/measurements`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error('Failed to post measurement');
    }
    const responseData = await response.json();
    return responseData;
  } catch (error) {
    throw error;
  }
}
