import { invoke } from '@tauri-apps/api/tauri';
import toast from 'react-hot-toast';

// tauri invoke command
export const StringToBase64 = 'string_to_base64';
export const Base64ToString = 'base64_to_string';
export const HexToBase64 = 'hex_to_base64';
export const Base64ToHex = 'base64_to_hex';
export const ImageToBase64 = 'image_to_base64';
export const Base64ToImage = 'base64_to_image';
export const CheckCidr = 'check_cidr';
export const GetCopy = 'get_copy';
export const SetCopy = 'set_copy';
export const BaseNToN = 'base_n_to_n';
export const PasswordCheck = 'password_check';
export const RandomString = 'random_string';
export const TimestampFormat = 'timestamp_format';
export const TimestampParse = 'timestamp_parse';
export const UrlParse = 'url_parse';

// tauri new window
export const OpenAbout = 'open_about';

export async function run(cmd, args) {
  const isTauri = handleIsTauri();
  console.log(isTauri);
  if (isTauri) {
    try {
      return await invoke(cmd, args);
    } catch (err) {
      let message = err;
      if (err.category && err.message) {
        message = `[${err.category}]${err.message}`;
      }
      toast.error(message);
    }
  } else {
    toast.error('功能开发中');
  }
}

const handleIsTauri = () => {
  return Boolean(
    typeof window !== 'undefined' && window !== undefined && window.__TAURI_IPC__ !== undefined
  );
};
