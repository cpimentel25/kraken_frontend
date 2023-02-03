const API = 'http://localhost:8080';

export async function FetchRoster() {
  const token = localStorage.getItem('token');

  const payload = {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(),
  };

  try {
    const response = await fetch(`${API}/api/roster`, payload);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
}

export async function FetchData(id) {
  const token = localStorage.getItem('token');

  const payload = {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(),
  };

  try {
    const response = await fetch(`${API}/api/roster/values/${id}`, payload);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};

export async function FetchTotal(id) {
  const token = localStorage.getItem('token');

  const payload = {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(),
  };

  try {
    const response = await fetch(`${API}/api/roster/values/total/${id}`, payload);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
}

export async function FetchCategorie() {
  const token = localStorage.getItem('token');

  const payload = {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(),
  };

  try {
    const response = await fetch(`${API}/api/categorie`, payload);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};

export async function createCategorie(form) {
  const token = localStorage.getItem('token');

  const payload = {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(form),
  };

  try {
    const response = await fetch(`${API}/api/categorie`, payload);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};

export async function createRoster(form) {
  const token = localStorage.getItem('token');

  const payload = {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(form),
  };
  try {
    const response = await fetch(`${API}/api/roster`, payload);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};

export async function createNewValue(newvalue) {
  const token = localStorage.getItem('token');

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
    const id = user?.profile?.id;
    localStorage.setItem('token', user.token);
    localStorage.setItem('id', id)
    return (user);
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

export async function updateUser(update) {
  const token = localStorage.getItem('token');
  const id = localStorage.getItem('id');

  const payload = {
    method: 'PATCH',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-type': 'application/json',
    },
    body: JSON.stringify(update)
  };

  try {
    const response = await fetch(`${API}/api/users/${id}`, payload);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};

export async function lastValueRoster(id) {
  const token = localStorage.getItem('token');

  const payload = {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(),
  };

  try {
    const response = await fetch(`${API}/api/roster/lastvalue/${id}`, payload);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};

export async function lastFiveValueRoster(id) {
  const token = localStorage.getItem('token');

  const payload = {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(),
  };

  try {
    const response = await fetch(`${API}/api/roster/lastfive/${id}`, payload);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};
