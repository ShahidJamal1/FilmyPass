import apiClient from './axios';

export const profileApi = {
  // POST /profiles
  registerProfile: async (userData) => {
    try {
      const response = await apiClient.post('/profiles', userData);
      if (response.data) return response.data;
    } catch (err) {
      // Fallback
    }

    return {
      id: `prof_${Date.now()}`,
      name: userData.name || 'User Name',
      email: userData.email,
      phone: userData.phone || '+91 98765 43210',
      createdAt: new Date().toISOString()
    };
  },

  // GET /profiles/login?identifier={identifier}
  loginProfile: async (identifier) => {
    try {
      const response = await apiClient.get('/profiles/login', { params: { identifier } });
      if (response.data) return response.data;
    } catch (err) {
      // Fallback
    }

    return {
      id: 'prof_demo123',
      name: identifier.split('@')[0] || 'Demo MovieBuff',
      email: identifier.includes('@') ? identifier : `${identifier}@example.com`,
      phone: '+91 98765 43210',
      avatarUrl: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200&auto=format&fit=crop'
    };
  }
};
