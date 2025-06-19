// pages/api/comment.js
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { content } = req.body;

    if (!content || content.trim() === '') {
      return res.status(400).json({ error: 'Commentaire vide' });
    }

    const { error } = await supabase.from('comments').insert([{ content }]);

    if (error) return res.status(500).json({ error: error.message });

    return res.status(200).json({ message: 'Commentaire enregistré' });
  }

  if (req.method === 'GET') {
    const { data, error } = await supabase
      .from('comments')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) return res.status(500).json({ error: error.message });

    return res.status(200).json(data);
  }

  res.status(405).json({ error: 'Méthode non autorisée' });
}