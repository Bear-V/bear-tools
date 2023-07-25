use data_encoding::*;

#[tauri::command]
pub fn base64_to_hex(base64_string: String) -> String {
    match BASE64.decode(base64_string.as_bytes()) {
        Ok(base_vec) => HEXLOWER.encode(base_vec.as_slice()),
        Err(_) => "输入值不是有效的base数据".to_string(),
    }
}

#[tauri::command]
pub fn hex_to_base64(hex_string: String) -> String {
    match HEXLOWER.decode(hex_string.as_bytes()) {
        Ok(hex_vec) => BASE64.encode(hex_vec.as_slice()),
        Err(_) => "输入值不是有效的hex数据".to_string(),
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn hex_base64_handles_should_work() {
        let hex = "2397dbee69114e2203bb424b4e84e9af2d7ee39b";
        let bh = hex_to_base64(hex.to_string());
        println!("{}", bh);

        let base = "I5fb7mkRTiIDu0JLToTpry1+45s=";
        let hb = base64_to_hex(base.to_string());
        println!("{}", hb);

        assert_eq!(hb, hex.to_string());
        assert_eq!(bh, base.to_string())
    }
}
