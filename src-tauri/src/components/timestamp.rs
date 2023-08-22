use crate::error::BearToolError;
use chrono::prelude::*;
use chrono::{Duration};
use serde::{Deserialize, Serialize};

#[derive(Debug, PartialEq, Serialize, Deserialize)]
pub struct TimeFormat {
    utc: String,
    local: String,
    unix_time: i64,
    day_of_year: i64,
    week_of_year: i64,
    is_leap_year: bool,
    a_format: String,
    b_format: String,
    c_format: String,
}

pub fn format(input: i64) -> TimeFormat {
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

    TimeFormat {
        utc,
        local,
        unix_time,
        day_of_year,
        week_of_year,
        is_leap_year,
        a_format,
        b_format,
        c_format,
    }
}

pub fn parse(input: &str) -> Result<i64, BearToolError> {
    // 将 %Y-%m-%d %H:%M:%S 格式转换为时间戳
    let naive_time = NaiveDateTime::parse_from_str(input, "%Y-%m-%d %H:%M:%S")?;
    let local_time: DateTime<Local> = Local.from_local_datetime(&naive_time).unwrap();
    Ok(local_time.timestamp_millis())
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_timestamp_format_handler() {
        let format_date = format(1669192819000);
        println!("{:?}", format_date);
        assert_eq!(
            format_date,
            TimeFormat {
                utc: "2022-11-23T08:40:19Z".to_string(),
                local: "Wed, 23 Nov 2022 16:40:19 +0800".to_string(),
                unix_time: 1669192819,
                day_of_year: 326,
                week_of_year: 47,
                is_leap_year: false,
                a_format: "2022-11-23 16:40:19".to_string(),
                b_format: "2022/11/23 16:40:19".to_string(),
                c_format: "2022年11月23日 16时40分19秒".to_string(),
            }
        );
    }

    #[test]
    fn test_parse_should_work() {
        let i = parse("2022-11-23 16:40:19");
        println!("{:?}", i);
        assert_eq!(i, 1669192819000);
    }
}
