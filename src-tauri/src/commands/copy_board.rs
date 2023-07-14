use clipboard::{ClipboardContext, ClipboardProvider};

#[tauri::command]
pub fn get_copy() -> String {
    let mut ctx: ClipboardContext = ClipboardProvider::new().unwrap();
    ctx.get_contents().unwrap_or(String::from("获取剪切板数据错误"))
}

#[tauri::command]
pub fn set_copy(input: String) -> String {
    let mut ctx: ClipboardContext = ClipboardProvider::new().unwrap();
    ctx.set_contents(input.to_owned()).unwrap();
    format!("success")
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn get_copy_should_work() {
        set_copy("今天去吃鸡".to_string());
        let s = get_copy();
        println!("{s}");
        assert_eq!(s, "今天去吃鸡");
    }
}