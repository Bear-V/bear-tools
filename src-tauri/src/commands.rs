use crate::components::base64_conversion;
use crate::components::number_conversion;
use crate::components::cidr;
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

#[command]
pub fn image_to_base64(image_path: String) -> CommandResult<String> {
    let res = base64_conversion::image_to_base64(image_path)?;
    Ok(res)
}

#[command]
pub fn check_cidr(input: String) -> CommandResult<String> {
    let res = cidr::check_cidr(input)?;
    Ok(res)
}

#[command]
pub fn base_n_to_n(number: &str, start: u8, end: u8) -> CommandResult<String> {
    let res = number_conversion::n_to_n(number, start, end);
    Ok(res)
}
