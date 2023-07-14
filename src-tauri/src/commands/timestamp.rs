use chrono::Duration;
use chrono::prelude::*;
use serde::{Deserialize, Serialize};
use serde_json;

#[derive(Debug, Serialize, Deserialize)]
struct TimeFormat {
    utc: String,
    local: String,
    // #[serde(rename = "unixTime")]
    unix_time: i64,
    day_of_year: i64,
    week_of_year: i64,
    is_leap_year: bool,
    a_format: String,
    b_format: String,
    c_format: String,
}


#[tauri::command]
pub fn timestamp_format(input: i64) -> String {
    let utc_dt = Utc.timestamp_millis_opt(input).unwrap();
    let local_dt = Local.timestamp_millis_opt(input).unwrap();
    let local = local_dt.to_rfc2822();
    let utc = utc_dt.to_rfc3339_opts(SecondsFormat::Secs, true);
    let unix_time = utc_dt.timestamp();

    let year = local_dt.year();
    let d = NaiveDate::from_ymd_opt(year, 1, 1).unwrap();
    let t = NaiveTime::from_hms_milli_opt(0, 0, 0, 000).unwrap();

    let year_zero = NaiveDateTime::new(d, t);
    let step_s = unix_time - year_zero.timestamp();
    let d_dt = Duration::seconds(step_s);
    let day_of_year = d_dt.num_days();

    let week_of_year = (day_of_year as f32 / 7_f32).ceil() as i64;

    let mut is_leap_year = false;
    if year % 400 == 0 || (year % 4 == 0 && year % 100 != 0) {
        is_leap_year = true;
    }

    let a_format = local_dt.format("%Y-%m-%d %H:%M:%S").to_string();
    let b_format = local_dt.format("%Y/%m/%d %H:%M:%S").to_string();
    let c_format = local_dt.format("%Y年%m月%d日 %H时%M分%S秒").to_string();

    let time_format = TimeFormat {
        utc,
        local,
        unix_time,
        day_of_year,
        week_of_year,
        is_leap_year,
        a_format,
        b_format,
        c_format,
    };

    serde_json::to_string(&time_format).unwrap()
}

#[test]
fn one() {
    let format_date = timestamp_format(1669192819000);
    println!("{:?}", format_date);
}
