  import fs from 'fs';
  import path from 'path';

  export default function handler(req, res) {
    const basePath = path.join(process.cwd(), 'playlists');
    const playlists = {};

    const folders = fs.readdirSync(basePath);

    folders.forEach(folder => {
      const folderPath = path.join(basePath, folder);
      if (fs.statSync(folderPath).isDirectory()) {
        const files = fs.readdirSync(folderPath);
        playlists[folder] = files
          .filter(file => file.endsWith('.mp3'))
          .map(file => ({
            title: file.replace('.mp3', ''),
            file: `/playlists/${folder}/${file}`,
            duration: '--:--'
          }));
      }
    });

    res.status(200).json(playlists);
  }