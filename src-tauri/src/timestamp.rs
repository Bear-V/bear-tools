use chrono::Duration;
use chrono::prelude::*;
use serde::{Deserialize, Serialize};
use serde_json;

#[derive(Debug, Serialize, Deserialize)]
struct TimeFormat {
    utc: String,
    local: String,
    unix_time: i64,
    day_of_year: u16,
    week_of_year: u8,
    is_leap_year: bool,
}


#[tauri::command]
pub fn timestamp_format(input: i64) -> String {
    let utc_dt = Utc.timestamp_millis_opt(input).unwrap();
    println!("{:?}", utc_dt);
    let local_dt = Local.timestamp_millis_opt(input).unwrap();
    println!("{:?}", local_dt);
    let local = local_dt.to_rfc2822();
    println!("local: {:?}", local);
    let utc = utc_dt.to_rfc3339_opts(SecondsFormat::Secs, true);
    println!("utc: {:?}", utc);
    let unix_time = utc_dt.timestamp();
    println!("unix_time: {:?}", unix_time);

    let year = local_dt.year();
    let d = NaiveDate::from_ymd_opt(year, 1, 1).unwrap();
    let t = NaiveTime::from_hms_milli_opt(0, 0, 0, 000).unwrap();

    let year_zero = NaiveDateTime::new(d, t);
    let step_s = unix_time - year_zero.timestamp();
    let d_dt = Duration::seconds(step_s);
    let day_of_year = d_dt.num_days();
    println!("day_of_year: {:?}", day_of_year);

    let week_of_year = (day_of_year as f32 / 7_f32).ceil() as i64;
    println!("week_of_year: {:?}", week_of_year);

    let mut is_leap_year = false;
    if year % 400 == 0 || (year % 4 == 0 && year % 100 != 0) {
        is_leap_year = true;
    }

    "".to_string()
}

#[test]
fn one() {
    let format_date = timestamp_format(1669192819000);
}
