#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]

mod tool;

use tool::{board_fn,timestamp_format};

// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}

fn main() {
    let context = tauri::generate_context!();
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![greet,board_fn,timestamp_format])
        .menu(tauri::Menu::os_default(&context.package_info().name))
        .run(context)
        .expect("error while running tauri application");
}
