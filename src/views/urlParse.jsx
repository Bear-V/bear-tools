import { useState } from 'react';
import Button from '@/component/button.jsx';
import { invoke } from '@tauri-apps/api/tauri';

function About() {
  const [url, setUrl] = useState('');

  async function handleSubmit() {
    const res = await invoke('url_parse', {
      input: url
    });
  }

  return (
    <div>
      <input type="text" value={url} onInput={e => setUrl(e.target.value)} />
      <Button click={handleSubmit} name="submit" />
    </div>
  );
}

export default About;
