import myApp from './MyApp';

export default async function handler(req, res) {
  try {
    let result = await myApp();
    res.status(200).json({ result });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}