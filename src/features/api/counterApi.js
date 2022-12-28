const API = process.env.REACT_APP_BACKEND;
const token = localStorage.getItem('token');


export async function FetchData(data) {
  const payload = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  };

  try {
    const response = await fetch(`${API}/api/values`, payload);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};


export async function createNewValue(newvalue) {
  const payload = {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newvalue)
  };

  try {
    const response = await fetch(`${API}/api/values`, payload);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};

export async function deleteValue(id) {
  const payload = {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  };

  try {
    const response = await fetch(`${API}/api/values/${id}`, payload);
    const data = await response.json();
    console.log("🚀 -> Delete success value by id", id)
    return data;
  } catch (error) {
    console.error(error);
  }
};

export async function loginUser(user) {
  const payload = {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify(user),
  };

  try {
    const response = await fetch(`${API}/auth/local/login`, payload);
    const user = await response.json();

    return user;
  } catch (error) {
    console.error(error);
  }
};

export async function createNewUser(newUser) {
  const payload = {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify(newUser)
  };

  try {
    const response = await fetch(`${API}/api/users`, payload);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};
