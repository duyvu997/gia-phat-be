const getMe = (req, res, next) => {
  return res.status(200).json({ name: 'david' });
};

const getAll = (req, res, next) => {
  const data = [
    {
      id: 1,
      name: 'MINH',
      phone: '0337282282',
      role: 'none',
      avatar: 'http://localhost:3000/avatar.jpg',
      join_date: '20/07/2022',
    },
    {
      id: 2,
      name: 'PHONG',
      phone: '0337282282',
      role: 'none',
      avatar: 'http://localhost:3000/avatar',
      join_date: '20/07/2022',
    },
    {
      id: 3,
      name: 'DUY',
      phone: '0337282282',
      role: 'none',
      avatar: 'http://localhost:3000/avatar',
      join_date: '20/07/2022',
    },
    {
      id: 4,
      name: 'DU',
      phone: '0337282282',
      role: 'none',
      avatar: 'http://localhost:3000/avatar',
      join_date: '20/07/2022',
    },
  ];
  return res.status(200).json({ data });
};

const login = (req, res, next) => {
  return res.status(200).json({
    data: {
      accessToken:
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c',
      name: '123',
    },
  });
};

module.exports = { getMe, getAll, login };
