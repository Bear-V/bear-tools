#![cfg_attr(
all(not(debug_assertions), target_os = "windows"),
windows_subsystem = "windows"
)]

mod base_conversion;
mod copy_board;
mod timestamp;
mod base_hex;
mod cidr;

use base_conversion::base_n_to_n;
use copy_board::{set_copy, get_copy};
use timestamp::timestamp_format;
use base_hex::{base64_to_hex, hex_to_base64};
use cidr::check_cidr;


// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}

fn main() {
    let context = tauri::generate_context!();
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![
            greet,set_copy,get_copy,timestamp_format,base_n_to_n,base64_to_hex,hex_to_base64
        ])
        .menu(tauri::Menu::os_default(&context.package_info().name))
        .run(context)
        .expect("error while running tauri application");
}
