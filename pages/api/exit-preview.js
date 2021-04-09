// para sair do preview -> /api/exit-preview
export default function handler(req, res) {
  res.clearPreviewData();

  res.writeHead(307, { location: '/' });

  return res.end();
}
