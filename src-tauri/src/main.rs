#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]

mod commands;
mod window;

use window::about::open_about;

use commands::{
    base64_hex::{base64_to_hex, hex_to_base64},
    base64_string::{base64_to_string, string_to_base64},
    bases_conversion::base_n_to_n,
    cidr::check_cidr,
    copy_board::{get_copy, set_copy},
    password_check::password_check,
    random::random_string,
    timestamp::timestamp_format,
    url_parse::url_parse,
};

// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
fn main() {
    let context = tauri::generate_context!();
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![
            open_about,
            base64_to_hex,
            hex_to_base64,
            string_to_base64,
            base64_to_string,
            base_n_to_n,
            set_copy,
            get_copy,
            check_cidr,
            timestamp_format,
            random_string,
            url_parse,
            password_check
        ])
        .menu(tauri::Menu::os_default(&context.package_info().name))
        .run(context)
        .expect("error while running tauri application");
}
