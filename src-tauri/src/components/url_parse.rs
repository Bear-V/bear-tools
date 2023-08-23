use crate::error::BearToolError;
use url::Url;

pub fn parse(input: String) -> Result<Url, BearToolError> {
    let result = Url::parse(input.as_str())?;
    Ok(result)
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn url_parse_should_work() {
        let res = parse("https://www.baidu.com:3000/app?c=1&b=2".to_string()).unwrap();
        println!("{:?}", res);
    }

    #[test]
    fn example_url_parse_should_work() {
        let res = parse("https://www.baidu.com".to_string());
        println!("{:?}", res);
    }

    #[test]
    fn simple_url_parse_should_work() {
        let res = parse("www.baidu.com".to_string());
        println!("{:?}", res);
    }
}
