use tauri::{AppHandle, command, WindowBuilder, WindowUrl, Wry};

#[command]
pub async fn open_about(handle: AppHandle<Wry>) {
    WindowBuilder::new(&handle, "about", WindowUrl::App("/about".into()))
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
