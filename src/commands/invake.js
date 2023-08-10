import { invoke } from '@tauri-apps/api/tauri';
import toast from 'react-hot-toast';

// tauri invoke command
export const hexToBase64 = 'hex_to_base64';
export const base64ToHex = 'base64_to_hex';
export const imageToBase64 = 'image_to_base64';

// tauri new window
export const aboutWindow = 'about_window';

export async function run(cmd, args) {
  try {
    return await invoke(cmd, args);
  } catch (err) {
    const message = `[${err.category}]${err.message}`;
    toast.error(message);
  }
}
