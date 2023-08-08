use crate::commands::base64_hex;
use crate::error::BearToolError;
use tauri::command;

pub type CommandResult<T> = Result<T, BearToolError>;

#[command]
pub fn base64_to_hex(base64_string: String) -> CommandResult<String> {
    let res = base64_hex::base64_to_hex(base64_string)?;
    Ok(res)
}

#[command]
pub fn hex_to_base64(hex_string: String) -> CommandResult<String> {
    let res = base64_hex::hex_to_base64(hex_string)?;
    Ok(res)
}
