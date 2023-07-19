use data_encoding::*;

#[tauri::command]
pub fn base64_to_string(input: String) -> String {
    match BASE64.decode(input.as_bytes()) {
        Ok(base_vec) => String::from_utf8_lossy(base_vec.as_slice()).into_owned(),
        Err(_) => "输入值不是有效的base数据".to_string(),
    }
}

#[tauri::command]
pub fn string_to_base64(input: String) -> String {
    BASE64.encode(input.as_bytes())
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn base64_string_handle_should_work() {
        let s_to_b64 = string_to_base64("今天星期三".to_string());
        println!("{}", s_to_b64);
        let b64_tos = base64_to_string(s_to_b64);
        println!("{}", b64_tos);
    }
}
