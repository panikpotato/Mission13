import { Entertainer } from '../types/Entertainer';

const API_Url = 'https://the-final-backend-a3cfhaenbdb8a0h2.eastus-01.azurewebsites.net/api/Entertainer';


// 1. Fetch all entertainers (no paging for now)
export const fetchEntertainers = async (): Promise<Entertainer[]> => {
  try {
    const response = await fetch(API_Url);

    if (!response.ok) {
      throw new Error('An error occurred while fetching entertainers');
    }

    return await response.json();
  } catch (error) {
    console.error('An error occurred while fetching entertainers:', error);
    throw error;
  }
};

// 2. Add a new entertainer
export const addEntertainer = async (
  newEntertainer: Entertainer
): Promise<Entertainer> => {
  try {
    const response = await fetch(`${API_Url}/AddEntertainer`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newEntertainer),
    });

    if (!response.ok) {
      throw new Error('An error occurred while adding the entertainer');
    }

    return await response.json();
  } catch (error) {
    console.error('An error occurred while adding the entertainer:', error);
    throw error;
  }
};

// 3. Update entertainer
export const updateEntertainer = async (
  entertainerID: number,
  updated: Entertainer
): Promise<Entertainer> => {
  try {
    const response = await fetch(
      `${API_Url}/UpdateEntertainer/${entertainerID}`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updated),
      }
    );

    return await response.json();
  } catch (error) {
    console.error('An error occurred while updating the entertainer:', error);
    throw error;
  }
};

// 4. Delete entertainer
export const deleteEntertainer = async (
  entertainerID: number
): Promise<void> => {
  try {
    const response = await fetch(
      `${API_Url}/DeleteEntertainer/${entertainerID}`,
      {
        method: 'DELETE',
      }
    );

    if (!response.ok) {
      throw new Error('An error occurred while deleting the entertainer');
    }
  } catch (error) {
    console.error('An error occurred while deleting the entertainer:', error);
    throw error;
  }
};

// 5. Get a single entertainer by ID
export const getEntertainer = async (id: number): Promise<Entertainer> => {
  try {
    const response = await fetch(`${API_Url}/${id}`);
    if (!response.ok) {
      throw new Error('Failed to fetch entertainer');
    }
    return await response.json();
  } catch (error) {
    console.error('An error occurred while fetching entertainer:', error);
    throw error;
  }
};
