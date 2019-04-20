import axios from 'axios';
import ActionCable from 'actioncable';

const API_URL = process.env.REACT_APP_API_URL;
const TOKEN_KEY = 'token';

const buildYoutubeAPIUrl = ({ service = 'search', params = {} }) => {
  let url = `https://www.googleapis.com/youtube/v3/${service}?`;

  Object.entries(params).forEach(([key, value]) => {
    url += `&${key}=${value}`;
  });
  url += `&key=${process.env.REACT_APP_YT_KEY}`;

  return url;
};

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
    const url = buildYoutubeAPIUrl({
      service: 'search',
      params: {
        part: 'snippet',
        eventType: 'live',
        topicId: '/m/0bzvm2', // gaming category apparently
        type: 'video',
        order: 'viewCount',
        maxResults: 30,
      },
    });

    try {
      const { data } = await axios.get(url);
      return { videosList: data.items };
    } catch (error) {
      return error;
    }
  },

  show: async videoId => {
    const url = buildYoutubeAPIUrl({
      service: 'videos',
      params: {
        part: 'snippet',
        id: videoId,
      },
    });
    try {
      const { data } = await axios.get(url);
      return data.items[0];
    } catch (error) {
      return null;
    }
  },
};

export const room = {
  show: async videoId => {
    const token = localStorage.getItem(TOKEN_KEY);
    try {
      const { data } = await axios.get(`${API_URL}/room/${videoId}`, {
        headers: {
          Authorization: token,
          'Content-Type': 'application/json',
        },
      });
      return data;
    } catch (error) {
      return error;
    }
  },

  post: async ({ videoId, body }) => {
    const token = localStorage.getItem(TOKEN_KEY);
    await axios.post(
      `${API_URL}/room/${videoId}`,
      { body },
      {
        headers: {
          Authorization: token,
          'Content-Type': 'application/json',
        },
      }
    );
  },

  createSocketConnection: ({ videoId, onMessageReceived }) => {
    const token = localStorage.getItem(TOKEN_KEY);
    const cable = ActionCable.createConsumer(
      process.env.REACT_APP_API_SOCKET_URL
    );
    cable.subscriptions.create(
      { channel: 'RoomChannel', room: videoId, token },
      {
        received: data => {
          onMessageReceived(JSON.parse(data));
        },
      }
    );
  },
};
