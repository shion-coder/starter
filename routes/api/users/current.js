const current = (req, res) => {
  const { id, name, email } = req.user;

  res.json({ id, name, email });
};

module.exports = current;
