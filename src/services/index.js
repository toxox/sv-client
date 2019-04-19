import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;
const TOKEN_KEY = 'token';
const YT_API_URL = `https://www.googleapis.com/youtube/v3/liveBroadcasts?part=snippet&key=${
  process.env.REACT_APP_YT_KEY
}`;

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
      const { data } = await axios.get(`${YT_API_URL}`);
      console.log(data);
      return { user: data };
    } catch (error) {
      console.log(error);
      return error;
    }
  },
};
