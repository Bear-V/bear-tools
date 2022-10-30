mod copy_board;
mod timestamp;

pub use timestamp::timestamp_format;

#[tauri::command]
pub fn board_fn(input: String, action: u8) -> String {
    match action {
        1 => copy_board::get_copy(),
        2 => copy_board::set_copy(input),
        _ => String::from("Invalid parameter"),
    }
}
