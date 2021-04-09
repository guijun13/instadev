// para acessar o preview -> /api/preview
export default function handler(req, res) {
  res.setPreviewData({});

  // so é possivel acessar o preview passando /api/preview?key=BIRDMAN
  const key = 'BIRDMAN';
  if (req.query.key !== key) {
    return res.status(401).json({ message: 'Invalid Key to enable preview' });
  }

  res.writeHead(307, { location: '/' });

  return res.end();
}
