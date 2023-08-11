#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]

extern crate core;

mod commands;
mod components;
mod error;
mod window;

// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
fn main() {
    let context = tauri::generate_context!();
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![
            commands::string_to_base64,
            commands::base64_to_string,
            commands::hex_to_base64,
            commands::base64_to_hex,
            commands::image_to_base64,
            commands::check_cidr,
            commands::get_copy,
            commands::set_copy,
            commands::base_n_to_n,
            commands::password_check,
            commands::random_string,
            commands::timestamp_format,
            commands::url_parse,
            window::about::open_about
        ])
        .menu(tauri::Menu::os_default(&context.package_info().name))
        .run(context)
        .expect("error while running tauri application");
}
