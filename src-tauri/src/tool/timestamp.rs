use chrono::{ TimeZone, Utc};

#[tauri::command]
pub fn timestamp_format(input: i64) -> String {
    Utc.timestamp_nanos(input * 1000000).format("%Y-%m-%d %H:%M:%S").to_string()
}

#[test]
fn one() {
    let format_date = timestamp_format(1667141879643);
    println!("{format_date}");
}