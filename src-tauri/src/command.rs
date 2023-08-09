use crate::commands::base64_conversion;
use crate::error::BearToolError;
use tauri::command;

pub type CommandResult<T> = Result<T, BearToolError>;

#[command]
pub fn string_to_base64(string: String) -> CommandResult<String> {
    let res = base64_conversion::string_to_base64(string);
    Ok(res)
}

#[command]
pub fn base64_to_string(base64_string: String) -> CommandResult<String> {
    let res = base64_conversion::base64_to_string(base64_string)?;
    Ok(res)
}

#[command]
pub fn base64_to_hex(base64_string: String) -> CommandResult<String> {
    let res = base64_conversion::base64_to_hex(base64_string)?;
    Ok(res)
}

#[command]
pub fn hex_to_base64(hex_string: String) -> CommandResult<String> {
    let res = base64_conversion::hex_to_base64(hex_string)?;
    Ok(res)
}
