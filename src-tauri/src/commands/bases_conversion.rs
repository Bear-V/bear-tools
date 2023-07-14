const ALL_CHARS: &'static str = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ-_";

// 10进制转 2 - 64进制转换
pub fn base_10_to_n(num: u128, radix: u32) -> String {
    if num == 0 {
        return String::from("0");
    }

    let base = base_10_to_n(num / (radix as u128), radix);
    // strip_prefix 切除选定前缀，如果后缀无值则 None 如有值则返回
    let start = base.strip_prefix("0").unwrap_or(base.as_str());
    let end = match ALL_CHARS.chars().nth((num % (radix as u128)) as usize) {
        Some(data) => String::from(data),
        _ => String::from(""),
    };
    format!("{}{}", start, end)
}

fn base_n_to_10(num_str: &str, radix: u32) -> u128 {
    let mut result: u128 = 0;
    for i in 0..num_str.len() {
        result *= radix as u128;
        let target_char = num_str.chars().nth(i).unwrap_or('0');
        let data = ALL_CHARS.chars().position(|i| i == target_char).unwrap_or(0);
        result += data as u128;
    }
    result
}

#[tauri::command]
pub fn base_n_to_n(num_str: &str, start_radix: u32, end_radix: u32) -> String {
    let start_num = base_n_to_10(num_str, start_radix);
    base_10_to_n(start_num, end_radix)
}


#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn bases_conversion_handle_should_work() {
        let res = base_10_to_n(340282366920938463463374607431768211455, 2);
        println!("{}", res);

        let res = base_n_to_10(&res, 2);
        println!("{}", res);

        let res = base_n_to_n("10", 2, 2);
        println!("{}", res);
    }
}
