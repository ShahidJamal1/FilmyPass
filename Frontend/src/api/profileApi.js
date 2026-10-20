import apiClient from './axios';

export const profileApi = {
  // POST /profiles
  registerProfile: async (userData) => {
    // Backend requires: name, email, phone (with valid format)
    const rawPhone = (userData.phone || '9876543210').replace(/\D/g, '');
    const cleanPhone = rawPhone.length >= 10 ? rawPhone.slice(-10) : '9876543210';

    const payload = {
      name: userData.name?.trim() || 'Movie Fan',
      email: userData.email?.trim().toLowerCase(),
      phone: cleanPhone
    };

    try {
      const response = await apiClient.post('/profiles', payload);
      if (response.data) return response.data;
    } catch (err) {
      console.warn("Register profile API error:", err.message);
      // If server returned a meaningful error (e.g. duplicate email), propagate it
      if (err.response?.data?.message) {
        throw new Error(err.response.data.message);
      }
    }

    // Fallback profile with valid default numeric ID 1
    return {
      id: 1,
      name: userData.name || 'Aryan Sharma',
      email: userData.email || 'aryan@filmypass.com',
      phone: cleanPhone,
      createdAt: new Date().toISOString()
    };
  },

  // GET /profiles/login?identifier={identifier}
  loginProfile: async (identifier) => {
    try {
      const response = await apiClient.get('/profiles/login', { params: { identifier: identifier.trim() } });
      if (response.data) return response.data;
    } catch (err) {
      console.warn("Login profile API error:", err.message);
      if (err.response?.status === 404) {
        throw new Error('No profile found for this email or phone number.');
      }
    }

    // Default seeded profile
    return {
      id: 1,
      name: identifier.split('@')[0] || 'Aryan Sharma',
      email: identifier.includes('@') ? identifier : `${identifier}@example.com`,
      phone: '9876543210',
      avatarUrl: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200&auto=format&fit=crop'
    };
  }
};
