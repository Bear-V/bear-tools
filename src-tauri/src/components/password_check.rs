use serde::{Deserialize, Serialize};
use zxcvbn::{zxcvbn, ZxcvbnError};

#[derive(Debug, Serialize, Deserialize)]
pub struct CheckResult {
    score: u8,
    crack_times: String,
    warning: String,
    suggestions: Vec<String>,
}

pub fn check(password: String) -> CheckResult {
    let password_res = zxcvbn(&password, &[]);
    match password_res {
        Ok(res) => {
            let score = res.score();
            let crack_times = res
                .crack_times()
                .online_no_throttling_10_per_second()
                .to_string();
            let feedback = res.feedback().clone();
            match feedback {
                None => CheckResult {
                    score,
                    crack_times,
                    warning: "".to_string(),
                    suggestions: vec![],
                },
                Some(feedback) => {
                    let warning = match feedback.warning() {
                        None => "".to_string(),
                        Some(warning) => warning.to_string(),
                    };
                    let suggestions = feedback
                        .suggestions()
                        .iter()
                        .map(|s| s.to_string())
                        .collect();

                    CheckResult {
                        score,
                        crack_times,
                        warning,
                        suggestions,
                    }
                }
            }
        }
        Err(err) => match err {
            ZxcvbnError::BlankPassword => CheckResult {
                score: 5,
                crack_times: "".to_string(),
                warning: "Blank password".to_string(),
                suggestions: vec!["Enter a password".to_string()],
            },
            ZxcvbnError::DurationOutOfRange => CheckResult {
                score: 6,
                crack_times: "".to_string(),
                warning: "Duration out of range".to_string(),
                suggestions: vec!["Enter a password".to_string()],
            },
        },
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn password_invalid_should_return_5() {
        let res = check("".to_string());
        println!("{:?}", res);
        assert_eq!(res.score, 5);
    }

    #[test]
    fn password_too_short_should_return_0() {
        let res = check("password".to_string());
        println!("{:?}", res);
        assert_eq!(res.score, 0);
    }
}
