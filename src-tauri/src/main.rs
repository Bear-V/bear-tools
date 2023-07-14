#![cfg_attr(
all(not(debug_assertions), target_os = "windows"),
windows_subsystem = "windows"
)]

mod window;
mod commands;

use window::about::open_about;

use commands::{base64_hex::{base64_to_hex, hex_to_base64},
               base64_string::{string_to_base64, base64_to_string},
               bases_conversion::base_n_to_n,
               cidr::check_cidr,
               copy_board::{set_copy, get_copy},
               timestamp::timestamp_format, random::random_string};


// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
fn main() {
    let context = tauri::generate_context!();
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![
            open_about,
            base64_to_hex, hex_to_base64,string_to_base64,
            base64_to_string,base_n_to_n, set_copy,
            get_copy,check_cidr, timestamp_format,random_string
        ])
        .menu(tauri::Menu::os_default(&context.package_info().name))
        .run(context)
        .expect("error while running tauri application");
}
