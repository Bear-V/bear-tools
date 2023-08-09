use data_encoding::{DecodeError, BASE64, HEXLOWER};
use std::fs::File;

/// string to base64
pub fn string_to_base64(string: String) -> String {
    BASE64.encode(string.as_bytes())
}

/// base64 to string
pub fn base64_to_string(base64_string: String) -> Result<String, DecodeError> {
    let base_vec = BASE64.decode(base64_string.as_bytes())?;
    let res = String::from_utf8_lossy(base_vec.as_slice()).into_owned();
    Ok(res)
}

/// hex to base64
pub fn hex_to_base64(hex_string: String) -> Result<String, DecodeError> {
    let base_vec = HEXLOWER.decode(hex_string.as_bytes())?;
    let res = BASE64.encode(base_vec.as_slice());
    Ok(res)
}

/// base64 to hex
pub fn base64_to_hex(base64_string: String) -> Result<String, DecodeError> {
    let base_vec = BASE64.decode(base64_string.as_bytes())?;
    let res = HEXLOWER.encode(base_vec.as_slice());
    Ok(res)
}

#[tauri::command]
pub fn read_file(file: String) -> String {
    // let file = File::open(file).unwrap();
    println!("file: {:?}", file);
    return "file".to_string();
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn string_to_base64_should_work() {
        let s_to_b64 = string_to_base64("今天星期三".to_string());
        assert_eq!(s_to_b64, "5LuK5aSp5pif5pyf5LiJ".to_string())
    }

    #[test]
    fn base64_to_string_should_work() {
        let b64_tos = base64_to_string("5LuK5aSp5pif5pyf5LiJ".to_string()).unwrap();
        assert_eq!(b64_tos, "今天星期三".to_string())
    }

    #[test]
    fn hex_to_base64_should_work() {
        let hex = "2397dbee69114e2203bb424b4e84e9af2d7ee39b";
        let bh = hex_to_base64(hex.to_string()).unwrap();
        assert_eq!(bh, "I5fb7mkRTiIDu0JLToTpry1+45s=".to_string())
    }

    #[test]
    fn base64_to_hex_should_work() {
        let base = "I5fb7mkRTiIDu0JLToTpry1+45s=";
        let hb = base64_to_hex(base.to_string()).unwrap();
        assert_eq!(hb, "2397dbee69114e2203bb424b4e84e9af2d7ee39b".to_string())
    }
}
