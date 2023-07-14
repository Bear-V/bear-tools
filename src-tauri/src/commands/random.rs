use rand::{distributions::Slice, thread_rng, Rng};

#[tauri::command]
pub fn random_string(
    len: usize,
    has_low: bool,
    has_upper: bool,
    has_number: bool,
    has_other: String,
    count: usize,
) -> Vec<String> {
    let mut result = vec![];

    for _ in 0..count {
        let random_string =
            random_string_handle(len, has_low, has_upper, has_number, has_other.clone());
        result.push(random_string);
    }

    result
}

fn random_string_handle(
    len: usize,
    has_low: bool,
    has_upper: bool,
    has_number: bool,
    has_other: String,
) -> String {
    // 字典
    let mut dictionary = vec![];

    if has_low {
        // 获取26个小写字母的数组
        let mut lowercase = ('a'..'z').map(|c| c).collect::<Vec<_>>();
        dictionary.append(&mut lowercase);
    }

    if has_upper {
        // 获取26个大写字母的数组
        let mut uppercase = ('A'..'Z').map(|c| c).collect::<Vec<_>>();
        dictionary.append(&mut uppercase);
    }

    if has_number {
        // 获取10个数字的char数组
        let mut number = ('0'..'9').map(|c| c).collect::<Vec<_>>();
        dictionary.append(&mut number);
    }

    if has_other != "" {
        has_other.chars().for_each(|c| dictionary.push(c));
    }

    let vowels_dist = Slice::new(&dictionary).unwrap();

    let rng = thread_rng();

    let vowel_string: String = rng.sample_iter(&vowels_dist).take(len).collect();

    vowel_string
}

#[test]
fn random_handle_test() {
    let result = random_string(10, false, false, false, String::from("!@#$%^&*"), 10);
    println!("{:?}", result);
}
