import { invoke } from '@tauri-apps/api/tauri';
import toast from 'react-hot-toast';

export const hexToBase64 = 'hex_to_base64';
export const base64ToHex = 'base64_to_hex';

export async function run(cmd, args) {
  try {
    return await invoke(cmd, args);
  } catch (err) {
    const message = `[${err.category}]${err.message}`;
    toast.error(message);
  }
}
