#![cfg_attr(
all(not(debug_assertions), target_os = "windows"),
windows_subsystem = "windows"
)]

mod base64_hex;
mod base64_string;
mod bases_conversion;
mod copy_board;
mod cidr;
mod timestamp;

use tauri::{AppHandle, WindowBuilder, WindowUrl, Wry};
use base64_hex::{base64_to_hex, hex_to_base64};
use base64_string::{string_to_base64, base64_to_string};
use bases_conversion::base_n_to_n;
use copy_board::{set_copy, get_copy};
use cidr::check_cidr;
use timestamp::timestamp_format;


// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}

#[tauri::command]
async fn open_about(handle: AppHandle<Wry>) {
    WindowBuilder::new(
        &handle,
        "about",
        WindowUrl::App("/about".into()),
    )
        .inner_size(400.0, 300.0)
        .fullscreen(false)
        .resizable(false)
        .title("About")
        .focused(true)
        .always_on_top(true)
        .decorations(true)
        .center()
        .build()
        .expect("打开About失败");
}

fn main() {
    let context = tauri::generate_context!();
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![
            open_about,
            base64_to_hex, hex_to_base64,string_to_base64,
            base64_to_string,base_n_to_n, set_copy,
            get_copy,check_cidr, timestamp_format
        ])
        .menu(tauri::Menu::os_default(&context.package_info().name))
        .run(context)
        .expect("error while running tauri application");
}
