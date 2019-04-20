import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;
const TOKEN_KEY = 'token';
const YT_API_URL = `https://www.googleapis.com/youtube/v3/search?key=${
  process.env.REACT_APP_YT_KEY
}&part=snippet&eventType=live&topicId=/m/0bzvm2&type=video&order=viewCount`;

export const auth = {
  me: async () => {
    const token = localStorage.getItem(TOKEN_KEY);
    try {
      const { data } = await axios.get(`${API_URL}/auth/me/`, {
        headers: {
          Authorization: token,
          'Content-Type': 'application/json',
        },
      });
      return { user: data };
    } catch (error) {
      return error;
    }
  },

  login: async googleResponse => {
    try {
      const { data } = await axios.post(`${API_URL}/auth/google`, {
        token: googleResponse.tokenId,
      });
      localStorage.setItem('token', `Bearer ${data.token}`);

      return data;
    } catch (error) {
      return error;
    }
  },

  logout: () => {
    localStorage.removeItem(TOKEN_KEY);
  },
};

export const videos = {
  list: async () => {
    try {
      const { data } = await axios.get(`${YT_API_URL}&maxResults=30`);
      return { videosList: data.items };
    } catch (error) {
      console.log(error);
      return error;
    }
  },
};
