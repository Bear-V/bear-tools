import { useState } from 'react';
import Button from '@/component/button.jsx';
import { dialog } from '@tauri-apps/api';

import { invoke } from '@tauri-apps/api/tauri';

function About() {
  const [url, setUrl] = useState('');

  async function handleSubmit() {}

  function getFileURL(file) {
    let getUrl = null;
    if (window.createObjectURL !== undefined) {
      // basic
      getUrl = window.createObjectURL(file);
    } else if (window.URL !== undefined) {
      // mozilla(firefox)
      getUrl = window.URL.createObjectURL(file);
    } else if (window.webkitURL !== undefined) {
      // webkit or chrome
      getUrl = window.webkitURL.createObjectURL(file);
    }
    return getUrl;
  }

  async function handleFile(event) {
    const files = [...event.target.files];
    if (files.length === 0) return;
    console.log(files);
    for (let i = 0; i < files.length; i++) {
      console.log(files[i]);
      console.log(getFileURL(files[i]));
    }
    const selected = await dialog.open({
      multiple: true,
      filters: [
        {
          name: 'Image',
          extensions: ['png', 'jpeg']
        }
      ]
    });
    console.log(selected);
    if (Array.isArray(selected)) {
      // user selected multiple files
    } else if (selected === null) {
      // user cancelled the selection
    } else {
      // user selected a single file
    }
  }

  async function openDialog(e) {
    e.preventDefault();
    let filepath = await dialog.open();
    console.log(filepath);
  }

  return (
    <div>
      <input type="text" value={url} onInput={e => setUrl(e.target.value)} />
      <Button click={handleSubmit} name="submit" />

      <input type="file" className="App-input-file" onChange={openDialog}></input>
    </div>
  );
}

export default About;
