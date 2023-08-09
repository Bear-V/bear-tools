#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]

extern crate core;

mod command;
mod commands;
mod error;
mod window;

use window::about::open_about;

use commands::{
    base64_conversion::read_file,
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
            read_file,
            open_about,
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
