import { useState } from 'react';
import Button from '@/component/button.jsx';
import { dialog } from '@tauri-apps/api';
import { listen } from '@tauri-apps/api/event';
import { run, ImageToBase64 } from '@/commands/invake.js';

function About() {
  const [url, setUrl] = useState('');

  listen('tauri://file-drop', async event => {
    console.log(event);
  });

  async function openDialog(e) {
    e.preventDefault();
    let filepath = await dialog.open({
      directory: false,
      multiple: false,
      title: 'Select a project'
      // defaultPath: await appDataDir()
    });
    console.log(filepath);
    if (filepath) {
      let res = await run(ImageToBase64, { imagePath: filepath });
      console.log(res);
    }
  }

  return (
    <div>
      <input type="text" value={url} onInput={e => setUrl(e.target.value)} />
      <Button click={openDialog} name="submit" />

      <div className="h-32 w-4/5 bg-amber-200">
        <p>拖拽或点击上传</p>
      </div>
    </div>
  );
}

export default About;
