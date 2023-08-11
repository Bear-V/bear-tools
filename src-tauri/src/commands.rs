use crate::{
    components::{
        base64_conversion, cidr, cidr::CidrRes, copy_board, number_conversion, password_check,
        password_check::CheckResult, random, timestamp, timestamp::TimeFormat, url, url::UrlParse,
    },
    error::BearToolError,
};
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
pub fn check_cidr(input: String) -> CommandResult<CidrRes> {
    let res = cidr::check_cidr(input)?;
    Ok(res)
}

#[command]
pub fn get_copy() -> String {
    copy_board::get_copy()
}

#[command]
pub fn set_copy(input: String) -> String {
    copy_board::set_copy(input)
}

#[command]
pub fn base_n_to_n(number: &str, start: u8, end: u8) -> CommandResult<String> {
    let res = number_conversion::n_to_n(number, start, end);
    Ok(res)
}

#[command]
pub fn password_check(password: String) -> CheckResult {
    password_check::check(password)
}

#[command]
pub fn random_string(
    len: usize,
    has_low: bool,
    has_upper: bool,
    has_number: bool,
    other_str: String,
    count: usize,
) -> Vec<String> {
    random::random_string(len, has_low, has_upper, has_number, other_str, count)
}

#[command]
pub fn timestamp_format(input: i64) -> TimeFormat {
    timestamp::format(input)
}

#[command]
pub fn url_parse(input: String) -> UrlParse {
    url::parse(input)
}
